import * as fs from 'fs/promises';
import * as path from 'path';
import * as Mocha from 'mocha';

async function findTestFiles(directory: string): Promise<string[]> {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.map(async entry => {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            return findTestFiles(fullPath);
        }

        return entry.isFile() && entry.name.endsWith(".test.js") ? [fullPath] : [];
    }));

    return files.flat();
}

export async function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');
	const files = await findTestFiles(testsRoot);

	return new Promise((c, e) => {
		// Add files to the test suite
		files.forEach(f => mocha.addFile(f));

		try {
			// Run the mocha test
			mocha.run(failures => {
				if (failures > 0) {
					e(new Error(`${failures} tests failed.`));
				} else {
					c();
				}
			});
		} catch (err) {
			console.error(err);
			e(err);
		}
	});
}
