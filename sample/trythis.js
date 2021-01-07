'use strict';

/////////////////////////////////////////////////////
// Authentication Main Template (Request Template) //
/////////////////////////////////////////////////////
// Expecting (Request): input.item[i].request.auth
const authTpl = (requestAuthObj) => {
  if(!requestAuthObj){
    return '';
  }
  
  let authTemplate = '';
  let authTypeStr = requestAuthObj.type;
  authTemplate += `#### **Authorization Type**: ${authTypeStr}
`;
  let authTypeArr = requestAuthObj[authTypeStr];
  for(let i = 0; i < authTypeArr.length; i++) {
    const authKeyStr = `>- Key: ${authTypeArr[i].key}`;
    const authValueStr = `>- Value: [Hidden]`;   
    const authTypeTypeStr = `>- Type: ${authTypeArr[i].type}`;
    authTemplate += 
`${authKeyStr}
${authValueStr}
${authTypeTypeStr}
`;
  }
  return authTemplate;
};

///////////////////////////////////////////
// URL Host Name Template (Url Template) //
///////////////////////////////////////////
// Expecting (Url): input.item[i].request.url.host OR input.item[i].response[i].originalRequest.url.host
const urlHostNameStr = (urlHostArray) => {
  let hostName = '';
  for (let i = 0; i < urlHostArray.length; i++) {
    if (i === urlHostArray.length - 1) {
      hostName += `${urlHostArray[i]}`;
    } else {
      hostName += `${urlHostArray[i]}.`;
    }
  }
  return hostName; // Just a string representing the url host
};

///////////////////////////////////////////
// URL Host Path Template (Url Template) //
///////////////////////////////////////////
// Expecting (Url): input.item[i].request.url.path OR input.item[i].response[i].originalRequest.url.path
const urlHostPathStr = (urlPathArray) => {
  let hostPath = '';
  for (let i = 0; i < urlPathArray.length; i++) {
    hostPath += `/${urlPathArray[i]}`;
  }
  return hostPath; // Just a string representing the url path
};

///////////////////////////////////////////////////
// URL Query Parameters Template (Url Template)  //
///////////////////////////////////////////////////
// Expecting (Url): input.item[i].request.url.query OR input.item[i].response[i].originalRequest.url.query
const urlQueryParamsTpl = (urlQueryArray) => {
  if(!urlQueryArray){
    return '';
  }
  let hostParams = '';
  for (let i = 0; i < urlQueryArray.length; i++) {
    hostParams +=
`##### Parameter (${urlQueryArray[i].description})
>- key: ${urlQueryArray[i].key}  
>- value: ${urlQueryArray[i].value}  
`;
  }
  return hostParams; // A template for all query parameters 
};

//////////////////////////////////////////////////////
// URL Main Template (Request & Response Templates) //
//////////////////////////////////////////////////////
// Expecting (Request): input.item[i].request.url
// Expecting (Response): input.item[i].response[i].orginalRequest.url
const urlTpl = (urlObj) => {
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

////////////////////////////////////////////
// Request Main Template (Route Template) //
////////////////////////////////////////////
// Expecting (Route): input.item[i].request or input.item[i].response[i].originalRequest
const requestTpl = (requestObj) => {
  // console.log('++++++++++', requestObj);
  if(!requestObj.description){
    requestObj.description = '';
  }

  var authString = '';
  if (requestObj.auth) {
    authString = authTpl(requestObj.auth);
  }

  let requestTemplate =
`**Description**: ${requestObj.description}

**Test URL**: [${requestObj.url.raw}](${requestObj.url.raw})

### Request

${authString}

#### **Method**: ${requestObj.method}

${urlTpl(requestObj.url)}
`;

  return requestTemplate;
};

//////////////////////////////////////////////
// Header Main Template (Response Template) //
//////////////////////////////////////////////
// Expecting (Response): input.item[i].response[i].header
const headerTpl = (headerArr) => {
  let headerTemplate = '';
  
  if (headerArr === null) {
    return headerTemplate;
  }
  
  for(let i = 0; i < headerArr.length; i++){
    if(headerArr[i].key === 'Content-Type') {
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

/////////////////////////////////////////////
// Response Main Template (Route Template) //
/////////////////////////////////////////////
// Expecting (Route): input.item[i].response
const responseTpl = (responseArr) => {
  let responseTemplate = '';
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

///////////////////////////////////////////////
// Route Main Template (Everything Template) //
///////////////////////////////////////////////
// Expecting (routes): input.item
const routeTpl = (routeArr) => {
  let routeTemplate = '';
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
`### Response(s)

${responseTpl(responseArr)}
`;
    }
  }

  return routeTemplate;
};

/////////////////////////
// Everything Template //
/////////////////////////
// Expecting (): input
const everythingTpl = (input) => {
  // Start our blank everythingTemplate
  let everythingTemplate = '';
  // Add the collection name
  everythingTemplate += `## ${input.info.name}`;
  // (Add a space between lines)
  everythingTemplate += `
  `;
  // Add the collection description (if one was given)
  if (input.info.description) { everythingTemplate += `**Description**: ${input.info.description}`; }
  // (Add a space between lines)
  everythingTemplate += `
  `;
  // Add a link to download the collection
  everythingTemplate += `[Postman Collection JSON](<${filepath}>)`;
  // (Add a space between lines)
  everythingTemplate += `
  `;
  // Add the collection routes
  everythingTemplate += `${routeTpl(input.item)}`;
  return everythingTemplate;
};

// Bringing in the Postman Collection (Move this to TOF before committing!)
// Eventually we will merge this code with our working 'fs' and 'prompt' code
let filepath = './assets/Really Bad.postman_collection.json';
let input = require(filepath); // JSON.parse(event.body); // filename

// Let out output variable kick off all of the templating functions.
let output = everythingTpl(input);

// Finally, return everything!
console.log(output);

