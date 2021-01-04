'use strict';

const fs = require('fs');
const prompt = require('prompt');

function getFilepathFromUser() {
	prompt.start();
	
	const filepathSettings =   {
		name: 'filepath',
		description: 'Enter the path to your Postman Collection',     // Prompt displayed to the user. If not supplied name will be used.
		type: 'string',                 // Specify the type of input to expect.
		default: './assets',             // Default value to use if no value is entered.
		required: true,                        // If true, value entered must be non-empty.
	}

	prompt.get([filepathSettings], function (err, result) {
		if (err) { return onErr(err); }
		console.log('Command-line input received:');
		console.log('  File Path: ' + result.filepath);

		const print = async (filepath) => {
			const dir = await fs.promises.opendir(filepath);
			for await (const dirent of dir) {
				console.log(dirent.name);
			}
		}
		print(result.filepath).catch(console.error);
	});
	
	function onErr(err) {
			console.log(err);
			return 1;
	}
}

getFilepathFromUser();