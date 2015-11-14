// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'; 

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) { 

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tagged-comment" is now active!');

	vscode.commands.registerCommand('tagged-comment.reTag', () => {
		let lastTagged = context.globalState.get('lastTagged', '');
		console.log('lastTagged: ', lastTagged);
		insertTextInEditor(lastTagged);
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.commands.registerCommand('tagged-comment.tag', () => {
		// The code you place here will be executed every time your command is executed
		
		let lastEnteredText = context.globalState.get('lastEnteredText', '');

		// configure the InputBox				
		var ibo = <vscode.InputBoxOptions>{
			prompt: "Add a TAG",
			placeHolder: "the placeholder",
			value: lastEnteredText
		}

		// as the user
		vscode.window.showInputBox(ibo)
			.then(text => {
				console.log("You typed: " + text);
				if (typeof text == 'undefined') {
					return;
				}

				context.globalState.update('lastEnteredText', text);					

				// creates the tag
				var date = new Date();
				var day, month, year;

				if (date.getDate().toString().length == 1) {
					day = "0" + date.getDate()
				} else {
					day = date.getDate()
				}

				if ((date.getMonth() + 1).toString().length == 1) {
					month = "0" + (date.getMonth() + 1)
				} else {
					month = date.getMonth() + 1
				}

				year = date.getFullYear();
				
				//
				var tagString = vscode.workspace.getConfiguration('tagged').get('tagString', '// #day/#month/#year - TAG: #enteredText');

				console.log("tagstring: " + tagString);

				var str = tagString;
				str = str.replace("#day", day);
				str = str.replace("#month", month);
				str = str.replace("#year", year);
				str = str.replace("#enteredText", text);

				console.log("str: " + str);

				context.globalState.update('lastTagged', str);

				var selection = vscode.window.activeTextEditor.selection;
				var startLine = selection.start.line;
				var startCharacter = selection.start.character;

				var editor = vscode.window.activeTextEditor;
				editor.edit((editBuilder) => {
					var pos = new vscode.Position(startLine, startCharacter);
					editBuilder.insert(pos, str);
				}).then(() => {
					console.log('Edit applied!');
				}, (err) => {
					console.log('Edit rejected!');
					console.error(err);
				});
			});
	});

	function insertTextInEditor(text: any) {
		var selection = vscode.window.activeTextEditor.selection;
		var startLine = selection.start.line;
		var startCharacter = selection.start.character;

		var editor = vscode.window.activeTextEditor;
		editor.edit((editBuilder) => {
			var pos = new vscode.Position(startLine, startCharacter);
			editBuilder.insert(pos, text);
		}).then(() => {
			console.log('Edit applied!');
		}, (err) => {
			console.log('Edit rejected!');
			console.error(err);
		});
	}
}