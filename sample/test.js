'use strict';

let filepath = './assets/Pokemon Test_basic.postman_collection.json';
let input = require(filepath);
let thisItem = input.item;
for (let routeIndex = 0; routeIndex < thisItem.length; routeIndex++) {
  const routeName = `### ${thisItem[routeIndex].name}`;
  const routeDescription = `**Description**: ${thisItem[routeIndex].description}`;
  // ${routeUrl}
  // const routeUrl = `**Test URL**: ${thisItem[routeIndex].url.raw}`; 

  const routeTemplate = `
  ${routeName}
  ${routeDescription}

  `
}

let output = `
## ${input.info.name} 
**Description**: ${info.description}
[Postman Collection JSON](<${filepath}>)
##Route(s)
`;

console.log(output);


