// 'use strict';

// let filepath = './assets/Pokemon Test.postman_collection.json';

// let input = require(filepath);

// let thisItem = input.item;
// let allRoutes = "";
// for (let routeIdx = 0; routeIdx < thisItem.length; routeIdx++) {
//     const routeName = `### ${thisItem[routeIdx].name}`;
//     const routeDesc = `**Description**: ${thisItem[routeIdx].request.description}`;
   
//     const routeTemplate = `
//     ${routeName}
//     ${routeDesc}
    
//     `;

//     allRoutes += routeTemplate;
// }


// console.log(thisItem.request.auth.type);
// let allAuths = "";
// let authType = thisItem[0].request.auth.type;

// for(let authIndx = 0; authIndx < thisItem.request.auth.type[authType].length; authIndx++) {
//     const authKey = `>- Key: ${thisItem.request.auth.type[authType].key}`;
//     const authValue = `>- Value: ${thisItem.request.auth.type[authType].value}`;   
//     const authorizationType = `>- Type: ${thisItem.request.auth.type[authType].type}`;
    
//     const authTemplate = `
//     ${authKey}
//     ${authValue}
//     ${authorizationType}
//     `;

//     allAuths += authTemplate;
// }


thisResponse = thisItem.response;
let responseHeaders = thisResponse.header;
let contentHeader = "";
for(let headerIndx = 0; headerIndx < responseHeaders.length; headerIndx++) {
    if(responseHeaders[headerIndx].key === "Content-Type") {
        const headerKey = `>- Key: ${responseHeaders[headerIndx].key}`;
        const headerValue = `>- Value: ${responseHeaders[headerIndx].value}`;
    }

    const headerTemplate = `
    ${headerKey}
    ${headerValue}
    `;

    contentHeader += headerTemplate;
}
    






let output = `
## ${input.info.name}
**Description**: ${input.info.description}
[Postman Collection JSON](<${filepath}>)
## Route(s)
${allRoutes}
${allAuths}
${contentHeader}
console.log(output);
`;