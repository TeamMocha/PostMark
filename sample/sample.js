'use strict';

// This proves that we can prompt the user for some kind of input and use that input variable.
// We can also prove that we can read something from the file system based on our user's input.

// Can we (code and test):
// - [X] Pass in the path to the postman_collection.json from Node? (process.argv[2])
// - [X] Find *.postman_collection.json and filter our results based on that? 
//   - [X] If nothing is found with *.postman_collection.json,
//     can we allow the user to pick a file name (another/nested prompt)
//   - [X] Is there some way we should handle an incorrect folder being passed? We are displaying an error message.
// [X] Can we merely get the title of the collection and display it to the user?
// [X] Can we get the names of our routes and display all of them to the user at once?
//
// [X] Can we merge these two ideas? Both approaches, file name via CLI argument and file name via user prompt, will result in the file being parsed for JSON and printed.

const fs = require('fs');
const prompt = require('prompt');

const printFileNameAndJSON = async (filepath) => {
  const dir = await fs.promises.opendir(filepath);
  var pattern = new RegExp('postman_collection.json'); // Search the folder the user specifies
  var hasFoundFile = false;

  for await (const dirent of dir) {
    var filename = dirent.name;
    var result = pattern.test(filename);
    if (result) {
      hasFoundFile = true;
      console.log(`Filename of ${filename} DOES match!`);
      printJSONData(filepath + '/' + filename);
    } else {
      // console.log(`Filename of ${filename} DOES NOT match!`);
    }
  }

  if(!hasFoundFile) { // If there are no Postman collections in the stated folder...
    console.log('No Postman collection was found.');
    getActualFileNameFromUserAndPrint();
  }
};

// The user passed in a file as an argument from the CLI
if (process.argv[2]) {
  let filepath = process.argv[2];
  console.log('User chose file path:', filepath);
  printFileNameAndJSON(filepath).catch(console.error);
} else {
  getFilepathFromUserAndPrint();
}
    
function getFilepathFromUserAndPrint() {
  prompt.start();
	
  const filepathSettings =   {
    name: 'filepath',
    description: 'Enter the path to your Postman Collection',   // Prompt displayed to the user. If not supplied name will be used.
    type: 'string',                 														// Specify the type of input to expect.
    default: './assets',             														// Default value to use if no value is entered.
    required: true,                        											// If true, value entered must be non-empty.
  };

  prompt.get([filepathSettings], function (err, result) {
    if (err) { return onErr(err); }
    console.log('User chose file path:', result.filepath);

    printFileNameAndJSON(result.filepath).catch(console.error);
  });
	
  function onErr(err) {
    console.log(err);
    return 1;
  }
}


function getActualFileNameFromUserAndPrint() {
  prompt.start();
	
  const fileNameSettings = {
    name: 'filename',
    description: 'Enter the file name (including path) to your Postman Collection',   // Prompt displayed to the user. If not supplied name will be used.
    type: 'string',                 														// Specify the type of input to expect.
    required: true,                        											// If true, value entered must be non-empty.
  };

  prompt.get([fileNameSettings], function (err, result) {
    if (err) { return onErr(err); }
    console.log('User chose file name:', result.filename);

    printJSONData(result.filename).catch(console.error);
  });
	
  function onErr(err) {
    console.log(err);
    return 1;
  }
}

function printJSONData(filepath) { // Templating function
  let input = JSON.parse(fs.readFileSync(filepath));

  console.log('Title:', input.info.name);

  for(let i = 0; i < input.item.length; i++) {
    console.log('Route Name: ' + input.item[i].name);
  }
}
