'use strict';

const { it, expect } = require('@jest/globals');
const input1 = require('../../sample/assets/Really Bad.postman_collection.json');
const input2 = require('../../sample/assets/Really Good BasicAuth.postman_collection.json');
const  { authTpl, urlHostNameStr, urlHostPathStr, urlQueryParamsTpl, urlTpl, requestTpl, headerTpl, responseTpl, routesTpl, everythingTpl, doPostMark } = require('../index');

describe('Postmark Routes', () => {
  it('authTemplate', () => {
    let badOutput = '';
    let goodOutput = 
`#### **Authorization Type**: basic

>- Key: password  
>- Value: [Hidden]  
>- Type: string

>- Key: username  
>- Value: [Hidden]  
>- Type: string`;
    expect(authTpl(input1.item[0].request.auth)).toEqual(badOutput);
    expect(authTpl(input2.item[0].request.auth)).toEqual(goodOutput);
    
  });
  it('urlTpl', () => {
    //badOutput would never hit urlTpl - handled
    let goodOutput = 
`>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/5/  

#### **Query Parameter(s)**

##### Parameter (Response language)

>- key: lang  
>- value: en  `;
    //input1 does not contain a valid input1.item[0].request.url - will not be tested
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

#### **Method**: GET

>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/5/  

#### **Query Parameter(s)**

##### Parameter (Response language)

>- key: lang  
>- value: en  

#### **Authorization Type**: basic

>- Key: password  
>- Value: [Hidden]  
>- Type: string

>- Key: username  
>- Value: [Hidden]  
>- Type: string

`;
    expect(requestTpl(input1.item[0].request)).toEqual(badOutput);
    expect(requestTpl(input2.item[0].request)).toEqual(goodOutput);
  });

  it('headerTpl', () => {
    let headerInput;
    let goodOutput =
`#### **Header(s)**

>- Key: Content-Type  
>- Value: text/plain; charset=utf-8  `;

    if(!input1.item[0].response) {
      headerInput = [];
    }
    
    expect(headerTpl(headerInput)).toEqual('');
    expect(headerTpl(input2.item[0].response[0].header)).toEqual(goodOutput);
  });

  it('responseTpl', () => {
    //badResponseTpl would never hit responseTpl - handled
    let goodResponseTpl = 
`### Response(s)

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

#### **Header(s)**

>- Key: Content-Type  
>- Value: text/plain; charset=utf-8  

#### **Body**

\`\`\`plain
Not Found
\`\`\`

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

#### **Header(s)**

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
\`\`\`

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

#### **Header(s)**

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

    //input1 does not contain a valid input1.item[0].request - will not be tested
    expect(responseTpl(input2.item[0].response)).toEqual(goodResponseTpl);
  });
  it('routesTpl', () => {
    let badRoute = 
`## Route(s)

---

**Description**:

**Test URL**: []()

### Request

#### **Method**: GET

`;
    let goodRoute = 
`## Route(s)

---

**Description**: This call will get one Pokemon encounter method (Surf).

**Test URL**: [https://pokeapi.co/api/v2/encounter-method/5/?lang=en](https://pokeapi.co/api/v2/encounter-method/5/?lang=en)

### Request

#### **Method**: GET

>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/5/  

#### **Query Parameter(s)**

##### Parameter (Response language)

>- key: lang  
>- value: en  

#### **Authorization Type**: basic

>- Key: password  
>- Value: [Hidden]  
>- Type: string

>- Key: username  
>- Value: [Hidden]  
>- Type: string

### Response(s)

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

#### **Header(s)**

>- Key: Content-Type  
>- Value: text/plain; charset=utf-8  

#### **Body**

\`\`\`plain
Not Found
\`\`\`

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

#### **Header(s)**

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
\`\`\`

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

#### **Header(s)**

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
    expect(routesTpl(input1.item)).toEqual(badRoute);
    expect(routesTpl(input2.item)).toEqual(goodRoute);
  });
  it('everythingTpl', () => {
    let badEverything = 
`## Really Bad

[Postman Collection JSON](<./assets/Really Bad.postman_collection.json>)

## Route(s)

---

**Description**:

**Test URL**: []()

### Request

#### **Method**: GET

`;

let goodEverything = 
`## Pokemon Test

**Description**: This is a sample collection.

[Postman Collection JSON](<./assets/Really Good BasicAuth.postman_collection.json>)

## Route(s)

---

**Description**: This call will get one Pokemon encounter method (Surf).

**Test URL**: [https://pokeapi.co/api/v2/encounter-method/5/?lang=en](https://pokeapi.co/api/v2/encounter-method/5/?lang=en)

### Request

#### **Method**: GET

>- Host: https://pokeapi.co  
>- Path: /api/v2/encounter-method/5/  

#### **Query Parameter(s)**

##### Parameter (Response language)

>- key: lang  
>- value: en  

#### **Authorization Type**: basic

>- Key: password  
>- Value: [Hidden]  
>- Type: string

>- Key: username  
>- Value: [Hidden]  
>- Type: string

### Response(s)

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

#### **Header(s)**

>- Key: Content-Type  
>- Value: text/plain; charset=utf-8  

#### **Body**

\`\`\`plain
Not Found
\`\`\`

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

#### **Header(s)**

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
\`\`\`

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

#### **Header(s)**

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
    let input1Filepath = './assets/Really Bad.postman_collection.json';
    let input2Filepath = './assets/Really Good BasicAuth.postman_collection.json';
    expect(doPostMark(input1Filepath)).toEqual(badEverything);
    expect(doPostMark(input2Filepath)).toEqual(goodEverything);

  });
});
