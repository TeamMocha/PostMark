'use strict';

let filepath = './assets/Another.postman_collection.json';

let inputJSON = require(filepath);

const authTpl = (requestAuthObj) => {

  if(!requestAuthObj){
    return;
  }
  
  let authTemplate = "";
  let authTypeStr = requestAuthObj.type;
  authTemplate += `#### **Authorization Type**: ${authTypeStr}
`;
  let authTypeArr = requestAuthObj[authTypeStr];
  for(let i = 0; i < authTypeArr.length; i++) {
    const authKeyStr = `>- Key: ${authTypeArr[i].key}`;
    const authValueStr = `>- Value: ${authTypeArr[i].value}`;   
    const authTypeTypeStr = `>- Type: ${authTypeArr[i].type}`;
    authTemplate += 
`${authKeyStr}
${authValueStr}
${authTypeTypeStr}
`;
  }
  return authTemplate;
};

const urlHostNameStr = (urlHostArray) => { // Expecting thisItem.request.url.host OR thisResponse.originalRequest.url.host
  let hostName = "";
  for (let i = 0; i < urlHostArray.length; i++) {
    if (i === urlHostArray.length - 1) {
      hostName += `${urlHostArray[i]}`
    } else {
      hostName += `${urlHostArray[i]}.`
    }
  }
  return hostName; // Just a string representing the url host
};

const urlHostPathStr = (urlPathArray) => { // Expecting thisItem.request.url.path OR thisResponse.originalRequest.url.path
  let hostPath = "";
  for (let i = 0; i < urlPathArray.length; i++) {
    hostPath += `/${urlPathArray[i]}`
  }
  return hostPath; // Just a string representing the url path
};

const urlQueryParamsTpl = (urlQueryArray) => { // Expecting thisItem.request.url.query OR thisResponse.originalRequest.url.query
  if(!urlQueryArray){
    return;
  }
  let hostParams = "";
  for (let i = 0; i < urlQueryArray.length; i++) {
    hostParams +=
`##### Parameter (${urlQueryArray[i].description})
>- key: ${urlQueryArray[i].key}  
>- value: ${urlQueryArray[i].value}  
`;
  }

  return hostParams; // A template for all query parameters 
};

const urlTpl = (urlObj) => { // Expecting thisItem.request.url OR thisResponse.originalRequest.url
  // console.log(urlObj)

  var queryString = '';
  if (urlObj.query) {
    queryString = urlQueryParamsTpl(urlObj.query);
  }

  let urlTemplate =
`>- Host: ${urlObj.protocol}://${urlHostNameStr(urlObj.host)}  
>- Path: ${urlHostPathStr(urlObj.path)}  
#### **Query Parameter(s)**
${queryString}
`;

  return urlTemplate;
};

const requestTpl = (requestObj) => { // Expecting thisItem.request OR thisResponse.originalRequest
  // console.log('++++++++++', requestObj);
  if(!requestObj.description){
    requestObj.description = "";
  }

  var authString = "";
  if (requestObj.auth) {
    authString = authTpl(requestObj.auth);
  }

  let requestTemplate =
`**Description**: ${requestObj.description}
**Test URL**: [${requestObj.url.raw}](${requestObj.url.raw})
## Request
${authString}
#### **Method**: ${requestObj.method}
${urlTpl(requestObj.url)}
`;

  return requestTemplate;
};

const headerTpl = (headerArr) => { //We are expecting input.item[0].response[0].header
  let headerTemplate = "";
  
  if (headerArr === null) {
    return headerTemplate;
  }
  
  for(let i = 0; i < headerArr.length; i++){
    if(headerArr[i].key === "Content-Type") {
      const headerKeyStr = `>- Key: ${headerArr[i].key}`;
      const headerValueStr = `>- Value: ${headerArr[i].value}`;
      headerTemplate += 
`${headerKeyStr}
${headerValueStr}
`;
    } 
  }
  return headerTemplate;
};

const responseTpl = (responseArr) => { // Expecting thisItem.response 
  let responseTemplate = "";
  for(let i = 0; i < responseArr.length; i++) {

    var statusString = '';
    if (responseArr[i].status) {
      statusString = responseArr[i].status;
    }

    // console.log("Response URL: " + responseArr[i].originalRequest.url)
    responseTemplate +=
`---
### **Status Code**: ${responseArr[i].code} (${statusString})
#### ${responseArr[i].name}
**Test URL**: [${responseArr[i].originalRequest.url.raw}](${responseArr[i].originalRequest.url.raw})
#### **Method**: ${responseArr[i].originalRequest.method}
  
${urlTpl(responseArr[i].originalRequest.url)}
${headerTpl(responseArr[i].header)}
#### **Body**
\`\`\`${responseArr[i]._postman_previewlanguage}
${responseArr[i].body}
\`\`\`
`;
  }

  return responseTemplate;
};

const routeTpl = (routeArr) => {
  let routeTemplate = "";
  // console.log(routeArr);
  routeTemplate += `## Route(s)
`;
  // console.log(routeArr);
  // We need to iterate over every route and find 
  for(let i = 0; i < routeArr.length; i++) {
    routeTemplate += `${requestTpl(routeArr[i].request)}
`;
    let responseArr = routeArr[i].response;
    if(responseArr) {
      routeTemplate +=
`${responseTpl(responseArr)}
`
    }
  }

  return routeTemplate;
};

var descriptionString = "";
if(inputJSON.info.description) {
  descriptionString = inputJSON.info.description;
}

// console.log("Item: " + input.item);
let output = 
`## ${inputJSON.info.name}
**Description**: ${descriptionString}
[Postman Collection JSON](<${filepath}>)
${routeTpl(inputJSON.item)}
`;

console.log("Output: " + output);
