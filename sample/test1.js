'use strict';

let filepath = './assets/Another.postman_collection.json';

let input = require(filepath);

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
  let urlTemplate =
`>- Host: ${urlObj.protocol}://${urlHostNameStr(urlObj.host)}  
>- Path: ${urlHostPathStr(urlObj.path)}  
#### **Query Parameter(s)**
${urlQueryParamsTpl(urlObj.query)}
`;

  return urlTemplate;
};

const requestTpl = (requestObj) => { // Expecting thisItem.request OR thisResponse.originalRequest
  // console.log('++++++++++', requestObj);
  if(!requestObj.description){
    requestObj.description = "";
  }
  let requestTemplate =
`**Description**: ${requestObj.description}

**Test URL**: [${requestObj.url.raw}](${requestObj.url.raw})

## Request

${authTpl(requestObj.auth)}
#### **Method**: ${requestObj.method}

${urlTpl(requestObj.url)}
`;

  return requestTemplate;
};

const headerTpl = (headerArr) => { //We are expecting input.item[0].response[0].header
  let headerTemplate = "";
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
    console.log(responseArr[i].url)
    responseTemplate +=
`---

### **Status Code**: ${responseArr[i].code} (${responseArr[i].status})

#### ${responseArr[i].name}

**Test URL**: [${responseArr[i].originalRequest.url.raw}](${responseArr[i].originalRequest.url.raw})

#### **Method**: ${responseArr[i].originalRequest.method}
  
${urlTpl(responseArr[i].url)}

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
console.log(input.item);
let output = 
`## ${input.info.name}

**Description**: ${input.info.description}

[Postman Collection JSON](<${filepath}>)

${routeTpl(input.item)}
`;

console.log(output);