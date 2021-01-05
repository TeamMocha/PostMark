'use strict';

// This proves that we can prompt the user for some kind of input and use that input variable.
// We can also prove that we can read something from the file system based on our user's input.

// Can we (code and test):
// - [X] Pass in the path to the postman_collection.json from Node? (process.argv[2])
// - [X] Find *.postman_collection.json and filter our results based on that? 
//   - [ ] If nothing is found with *.postman_collection.json,
//     can we allow the user to pick a file name (another/nested prompt)
//   - [ ] Is there some way we should handle an incorrect folder being passed?
// Can we merely get the title of the collection and display it to the user?
// Can we get the names of our routes and display all of them to the user at once?
//
// Can we merge these two ideas?

const fs = require('fs');
const prompt = require('prompt');
const input = require('./assets/Lambda RouterMore.postman_collection.json');
console.log('Input:', input.info.name);
console.log('Input name:', input.item[0].name);

const print = async (filepath) => {
	const dir = await fs.promises.opendir(filepath);
	var pattern = new RegExp("postman_collection.json");
	for await (const dirent of dir) {
		var filename = dirent.name;
		var result = pattern.test(filename);
		if (result) {
			console.log(`Filename of ${filename} DOES match!`);
		} else {
			//console.log(`Filename of ${filename} DOES NOT match!`);
		}
	}
}

// The user passed in a file as an argument from the CLI
if (process.argv[2]) {
  let filepath = process.argv[2];
	console.log('User chose file path:', filepath);
	print(filepath).catch(console.error);
} else {
	getFilepathFromUser();
}

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
		console.log('User chose file path:', result.filepath);

		print(result.filepath).catch(console.error);
	});
	
	function onErr(err) {
			console.log(err);
			return 1;
	}
};
