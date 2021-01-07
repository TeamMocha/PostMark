'use strict';

const { it, expect } = require('@jest/globals');
const input1 = require('../sample/assets/Really Bad.postman_collection.json');
const input2 = require('../sample/assets/Really Good BasicAuth.postman_collection.json');


/////////////////////////////////////////////////////
// Authentication Main Template (Request Template) //
/////////////////////////////////////////////////////
// Expecting (Request): input.item[i].request.auth
const authTpl = (requestAuthObj) => {
  let authTemplate = '';
  if(!requestAuthObj){
    return authTemplate;
  }
  
  
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
  if(!urlObj.raw){
    return '';
  }
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
  
  if (!headerArr) {
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


describe('Postmark Routes', () => {
  it('authTemplate', () => {
    let badOutput = '';
    let goodOutput = `#### **Authorization Type**: basic
>- Key: password
>- Value: [Hidden]
>- Type: string
>- Key: username
>- Value: [Hidden]
>- Type: string
`;
    expect(authTpl(input1.item[0].request.auth)).toEqual(badOutput);
    expect(authTpl(input2.item[0].request.auth)).toEqual(goodOutput);
    
  });
  it('urlTpl', () => {
    let badOutput = '';
    let goodOutput = 
`>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/5/  
#### **Query Parameter(s)**
##### Parameter (Response language)
>- key: lang  
>- value: en  

`;
    expect(urlTpl(input1.item[0].request.url)).toEqual(badOutput);
    expect(urlTpl(input2.item[0].request.url)).toEqual(goodOutput);
  });

  it('requestTpl', () => {
    let badOutput =
`**Description**: 

**Test URL**: []()

### Request



#### **Method**: GET


`;
    let goodOutput = 
`**Description**: This call will get one Pokemon encounter method (Surf).

**Test URL**: [https://pokeapi.co/api/v2/encounter-method/5/?lang=en](https://pokeapi.co/api/v2/encounter-method/5/?lang=en)

### Request

#### **Authorization Type**: basic
>- Key: password
>- Value: [Hidden]
>- Type: string
>- Key: username
>- Value: [Hidden]
>- Type: string


#### **Method**: GET

>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/5/  
#### **Query Parameter(s)**
##### Parameter (Response language)
>- key: lang  
>- value: en  


`;
    expect(requestTpl(input1.item[0].request)).toEqual(badOutput);
    expect(requestTpl(input2.item[0].request)).toEqual(goodOutput);
  });

  it('headerTpl', () => {
    let headerInput;
    if(!input1.item[0].response) {
      headerInput = [];
    }
    console.log(headerInput); 
    
    expect(headerTpl(headerInput)).toEqual("");
  });

  it('responseTpl', () => {
    let goodResponse = `---
### **Status Code**: 404 (Not Found)
#### GET /v2/encounter-method/685/?lang=en
**Test URL**: [https://pokeapi.co/api/v2/encounter-method/685/?lang=en](https://pokeapi.co/api/v2/encounter-method/685/?lang=en)
#### **Method**: GET
  
>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/685/  
#### **Query Parameter(s)**
##### Parameter (Response language)
>- key: lang  
>- value: en  


>- Key: Content-Type
>- Value: text/plain; charset=utf-8

#### **Body**
\`\`\`plain
Not Found
\`\`\`### Response

\`\`\`
---
### **Status Code**: 200 (OK)
#### GET /v2/encounter-method/5/?lang=en
**Test URL**: [https://pokeapi.co/api/v2/encounter-method/5/?lang=en](https://pokeapi.co/api/v2/encounter-method/5/?lang=en)
#### **Method**: GET


  
>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/5/  

#### **Query Parameter(s)**
##### Parameter (Response language)
>- key: lang  
>- value: en  


>- Key: Content-Type
>- Value: application/json; charset=utf-8

#### **Body**
\`\`\`json
{
    "id": 5,
    "name": "surf",
    "names": [
        {
            "language": {
                "name": "de",
                "url": "https://pokeapi.co/api/v2/language/6/"
            },
            "name": "Surfen"
        },
        {
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "name": "Surfing"
        }
    ],
    "order": 14
}
\`\`\`### Response
\`\`\`
---
### **Status Code**: 400 (Bad Request)
#### GET /v2/encounter-method/(%)/?lang=en
**Test URL**: [https://pokeapi.co/api/v2/encounter-method/(%)/?lang=en](https://pokeapi.co/api/v2/encounter-method/(%)/?lang=en)
#### **Method**: GET


  
>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/(%)/  

#### **Query Parameter(s)**
##### Parameter (Response language)
>- key: lang  
>- value: en  


>- Key: Content-Type
>- Value: text/html

#### **Body**
\`\`\`html
<html>
    <head>
        <title>400 Bad Request</title>
    </head>
    <body>
        <center>
            <h1>400 Bad Request</h1>
        </center>
        <hr>
        <center>cloudflare</center>
    </body>
</html>
\`\`\`
`;
      expect(responseTpl(input1.item[0].response)).toEqual('');
      expect(responseTpl(input2.item[0].response)).toEqual(goodResponse);
  });
});
