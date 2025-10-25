/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode";

const DEFAULT_TEMPLATE = "// #day/#month/#year - TAG: #enteredText";

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const applyUserDefinedTokens = (
    template: string,
    userDefined: Record<string, unknown>
): string => {
    if (!userDefined || typeof userDefined !== "object") {
        return template;
    }

    return Object.entries(userDefined).reduce((result, [key, rawValue]) => {
        if (!key) {
            return result;
        }

        const value = rawValue === undefined || rawValue === null ? "" : String(rawValue);
        const pattern = new RegExp(`%${escapeRegExp(key)}%`, "g");

        return result.replace(pattern, value);
    }, template);
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // register commands
    vscode.commands.registerCommand("tagged-comment.tag", () => tag(false));
    vscode.commands.registerCommand("tagged-comment.reTag", () => reTag(false));
    vscode.commands.registerCommand("tagged-comment.tagAbove", () => tag(true));
    vscode.commands.registerCommand("tagged-comment.reTagAbove", () => reTag(true));

    function reTag(lineAbove: boolean) {
        const lastTagged = context.globalState.get("lastTagged", "");
        insertTextInEditor(lastTagged, lineAbove);
    }

    function tag(lineAbove: boolean) {
        const lastEnteredText = context.globalState.get("lastEnteredText", "");

        // configure the InputBox				
        const ibo = <vscode.InputBoxOptions> {
            prompt: vscode.l10n.t("Add a TAG"),
            placeHolder: vscode.l10n.t("Type a TAG to be added"),
            value: lastEnteredText
        };

        // as the user
        vscode.window.showInputBox(ibo)
            .then(text => {
                // console.log("You typed: " + text);
                if (typeof text === "undefined") {
                    return;
                }

                context.globalState.update("lastEnteredText", text);

                // creates the tag
                const date = new Date();
                let day: string;
                let month: string;

                if (date.getDate().toString().length === 1) {
                    day = "0" + date.getDate();
                } else {
                    day = date.getDate().toString();
                }

                if ((date.getMonth() + 1).toString().length === 1) {
                    month = "0" + (date.getMonth() + 1);
                } else {
                    month = (date.getMonth() + 1).toString();
                }

                const year = date.getFullYear().toString();

                //
                const configuration = vscode.workspace.getConfiguration("tagged");
                const tagString = configuration.get("tagString", DEFAULT_TEMPLATE) as string;

                // console.log("tagstring: " + tagString);

                let str = tagString;
                str = str.replace("#day", day);
                str = str.replace("#month", month);
                str = str.replace("#year", year);
                str = str.replace("#enteredText", text);

                const userDefined = configuration.get<Record<string, unknown>>("userDefined", {});
                str = applyUserDefinedTokens(str, userDefined);

                // console.log("str: " + str);

                context.globalState.update("lastTagged", str);

                insertTextInEditor(str, lineAbove);
            });
    }

    function getIndentText(line: string): string {
        const pos: number = line.search(/\S/);
        return line.substring(0, pos);
    }

    function insertTextInEditor(text: string, lineAbove: boolean) {
        if (!vscode.window.activeTextEditor) { 
            return;
        }
        
        let startCharacter: number;

        const selection = vscode.window.activeTextEditor.selection;
        const startLine = selection.start.line;

        if (!lineAbove) {
            startCharacter = selection.start.character;
        } else {
            const lineText: string = vscode.window.activeTextEditor.document.lineAt(selection.start.line).text;
            text = getIndentText(lineText).concat(text).concat("\r");
            startCharacter = 0;
        }

        const editor = vscode.window.activeTextEditor;
        editor.edit((editBuilder) => {
            const pos = new vscode.Position(startLine, startCharacter);
            editBuilder.insert(pos, text);
        }).then(() => {
            // console.log('Edit applied!');
        }, () => {
            // console.log('Edit rejected!');
            // console.error(err);
        });
    }
}
