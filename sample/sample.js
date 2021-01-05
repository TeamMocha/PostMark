'use strict';

// This proves that we can prompt the user for some kind of input and use that input variable.
// We can also prove that we can read something from the file system based on our user's input.

// Can we (code and test):
// Pass in the path to the postman_collection.json from Node? (process.argv[2])
// Find *.postman_collection.json and filter our results based on that? 
//   If nothing is found with *.postman_collection.json, `node sample.js ./assets/this.json`
//     can we allow the user to pick a file name (another/nested prompt)
//   Is there some other way we should handle this?
// Can we merely get the title of the collection and display it to the user?
// Can we get the names of our routes and display all of them to the user at once?

const fs = require('fs');
const prompt = require('prompt');

function getFilepathFromUser() {
	prompt.start();
	
	const filepathSettings =   {
		name: 'filepath',
		description: 'Enter the path to your Postman Collection',   // Prompt displayed to the user. If not supplied name will be used.
		type: 'string',                 														// Specify the type of input to expect.
		default: './assets',             														// Default value to use if no value is entered.
		required: true,                        											// If true, value entered must be non-empty.
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