import * as path from 'path';
import * as Mocha from 'mocha';
import { glob } from "glob";

export async function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: "tdd",
        color: true
    });

    const testsRoot = path.resolve(__dirname, "..");
    const files = await glob("**/*.test.js", { cwd: testsRoot, nodir: true });

    // Add files to the test suite
    files.forEach(file => mocha.addFile(path.resolve(testsRoot, file)));

    return new Promise((resolve, reject) => {
        mocha.run(failures => {
            if (failures > 0) {
                reject(new Error(`${failures} tests failed.`));
            } else {
                resolve();
            }
        });
    });
}
