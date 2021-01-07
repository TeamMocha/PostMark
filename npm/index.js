'use strict';

let input;
let filepath;
const doPostMark = (filepathInput) => {
  if(!filepathInput){
    filepath = './assets/Just Okay.postman_collection.json';
    input = require(filepath);
  } else {
    filepath = filepathInput;
    input = require(filepath);
  }
  return everythingTpl(input);
};

// Setting variables for adding different kinds of line spacing in Markdown
// These are set here to avoid odd indenting later.
let emptyLine = `

`;
let newLine = `
`;

/////////////////////////////////////////////////////
// Authentication Main Template (Request Template) //
/////////////////////////////////////////////////////
// Expecting (Request): input.item[i].request.auth
const authTpl = (requestAuthObj) => {
  // Start our blank authTemplate
  let authTemplate = '';
  // If bad data was passed in, return an empty string
  if(!requestAuthObj){
    return authTemplate;
  }
  // Store the type of authorization in a variable for later use
  let authTypeStr = requestAuthObj.type;
  // Add the authorization type to the template
  authTemplate += `#### **Authorization Type**: ${authTypeStr}`;
  // Use the authorization type to access the array with a name matching the authorization type
  let authTypeArr = requestAuthObj[authTypeStr];
  // Iterate over that array and add each key/value/type object to the auth template
  for (let i = 0; i < authTypeArr.length; i++) {
    const authKeyStr = `>- Key: ${authTypeArr[i].key}`;
    const authValueStr = `>- Value: [Hidden]`; // We strip this information out to protect our users
    const authTypeTypeStr = `>- Type: ${authTypeArr[i].type}`;
    // (Add a space between lines)
    authTemplate += emptyLine;
    // Add the auth 'key' string to the template (the two spaces at the end are necessary)
    authTemplate += `${authKeyStr}  `;
    // (Add a new line between key/value/type sets)
    authTemplate += newLine;
    // Add the auth 'value' string to the template (the two spaces at the end are necessary)
    authTemplate += `${authValueStr}  `;
    // (Add a new line between key/value/type sets)
    authTemplate += newLine;
    // Add the auth 'value' string to the template (since this is the last one there aren't two spaces)
    authTemplate += `${authTypeTypeStr}`;
  }
  // Return the authTemplate to the caller
  return authTemplate;
};

///////////////////////////////////////////
// URL Host Name Template (Url Template) //
///////////////////////////////////////////
// Expecting (Url): input.item[i].request.url.host OR input.item[i].response[i].originalRequest.url.host
const urlHostNameStr = (urlHostArray) => {
  // Start our blank hostName string
  let hostName = '';
  // Iterate over the urlHostArray and reconstruct the host name
  for (let i = 0; i < urlHostArray.length; i++) {
    if (i === urlHostArray.length - 1) {
      hostName += `${urlHostArray[i]}`; // Don't add a '.' on the last one
    } else {
      hostName += `${urlHostArray[i]}.`;
    }
  }
  // Return the hostName to the caller
  return hostName;
};

///////////////////////////////////////////
// URL Host Path Template (Url Template) //
///////////////////////////////////////////
// Expecting (Url): input.item[i].request.url.path OR input.item[i].response[i].originalRequest.url.path
const urlHostPathStr = (urlPathArray) => {
  // Start our blank hostPath string
  let hostPath = '';
  // Iterate over the urlPathArray and reconstruct the URL path
  for (let i = 0; i < urlPathArray.length; i++) {
    hostPath += `/${urlPathArray[i]}`; // The final item in this array might be '', creating a trailing '/' 
  }
  // Return the hostPath to the caller
  return hostPath; // Just a string representing the url path
};

///////////////////////////////////////////////////
// URL Query Parameters Template (Url Template)  //
///////////////////////////////////////////////////
// Expecting (Url): input.item[i].request.url.query OR input.item[i].response[i].originalRequest.url.query
const urlQueryParamsTpl = (urlQueryArray) => {
  // Start our blank queryParamsTemplate
  let queryParamsTemplate = '';
  // Iterate over the urlQueryArray and reconstruct each query key/value pair
  for (let i = 0; i < urlQueryArray.length; i++) {
    // Add the parameter header with the type of parameter to the query parameters template
    queryParamsTemplate += `##### Parameter (${urlQueryArray[i].description})`;
    // (Add a space between lines)
    queryParamsTemplate += emptyLine;
    // Add the param 'key' string to the template (the two spaces at the end are necessary)
    queryParamsTemplate += `>- key: ${urlQueryArray[i].key}  `;
    // (Add a new line between key/value pairs)
    queryParamsTemplate += newLine;
    // Add the param 'value' string to the template (the two spaces at the end are necessary)
    queryParamsTemplate += `>- value: ${urlQueryArray[i].value}  `;
  }
  // Return the hostParams to the caller
  return queryParamsTemplate; // A template for all query parameters 
};

//////////////////////////////////////////////////////
// URL Main Template (Request & Response Templates) //
//////////////////////////////////////////////////////
// Expecting (Request): input.item[i].request.url
// Expecting (Response): input.item[i].response[i].orginalRequest.url
const urlTpl = (urlObj) => {
  // Start our blank urlTemplate
  let urlTemplate = '';
  // If bad data was passed in, return an empty string
  if (!urlObj) {
    return urlTemplate;
  }
  // Add the protocol and host to the URL template
  urlTemplate += `>- Host: ${urlObj.protocol}://${urlHostNameStr(urlObj.host)}  `;
  // (Add a new line between key/value/type sets)
  urlTemplate += newLine;
  // Add the path to the URL template
  urlTemplate += `>- Path: ${urlHostPathStr(urlObj.path)}  `;
  // If the URL has query parameters...
  if (urlObj.query) {
    // (Add a space between the Host/Path and Query Parameters)
    urlTemplate += emptyLine;
    // ...add a header to the query parameters...
    urlTemplate += `#### **Query Parameter(s)**`;
    // (Add a space between lines)
    urlTemplate += emptyLine;
    // ...and add the finalized result of the query parameters template
    urlTemplate += urlQueryParamsTpl(urlObj.query);
  }
  // Return the urlTemplate to the caller
  return urlTemplate;
};

////////////////////////////////////////////
// Request Main Template (Route Template) //
////////////////////////////////////////////
// Expecting (Route): input.item[i].request or input.item[i].response[i].originalRequest
const requestTpl = (requestObj) => {
  // Start our blank requestTemplate
  let requestTemplate = '';
  // If the user didn't include a description, we will leave a place for them to enter one
  let requestDescStr = '';
  if(requestObj.description){
    requestDescStr = ` ${requestObj.description}`;
  }
  // Add the description to the request template
  requestTemplate += `**Description**:${requestDescStr}`;
  // (Add a space between lines)
  requestTemplate += emptyLine;
  // Add the test URL to the request template
  requestTemplate += `**Test URL**: [${requestObj.url.raw}](${requestObj.url.raw})`;
  // (Add a space between lines)
  requestTemplate += emptyLine;
  // Add the request header to the request template
  requestTemplate += `### Request`;
  // (Add a space between lines)
  requestTemplate += emptyLine;
  // Add the request method to the request template
  requestTemplate += `#### **Method**: ${requestObj.method}`;
  // (Add a space between lines)
  requestTemplate += emptyLine;
  if (requestObj.url.raw) { 
    requestTemplate += `${urlTpl(requestObj.url)}`; 
    // (Add a space between lines)
    requestTemplate += emptyLine;
  }
  // If the request used authorizarion methods add the finalized Auth template to the request template
  if (requestObj.auth) { 
    requestTemplate += `${authTpl(requestObj.auth)}`; 
    // (Add a space between lines)
    requestTemplate += emptyLine;
  }
  // Return the requestTemplate to the caller
  return requestTemplate;
};

//////////////////////////////////////////////
// Header Main Template (Response Template) //
//////////////////////////////////////////////
// Expecting (Response): input.item[i].response[i].header
const headerTpl = (headerArr) => {
  // Start our blank headerTemplate
  let headerTemplate = '';
  // If bad data was passed in, return an empty string
  if (!headerArr) {
    return headerTemplate;
  }
  // Iterate over the headerArray and reconstruct each header key/value pair...
  for(let i = 0; i < headerArr.length; i++){
    if(headerArr[i].key === 'Content-Type') { // ...but only if it is the 'content-type' header
      const headerKeyStr = `>- Key: ${headerArr[i].key}`;
      const headerValueStr = `>- Value: ${headerArr[i].value}`;
      // Add the parameter header with the type of parameter to the query parameters template
      headerTemplate += `#### **Header(s)**`;
      // (Add a space between lines)
      headerTemplate += emptyLine;
      // Add the header 'key' string to the template (the two spaces at the end are necessary)
      headerTemplate += `${headerKeyStr}  `;
      // (Add a new line between key/value sets)
      headerTemplate += newLine;
      // Add the header 'value' string to the template (the two spaces at the end are necessary)
      headerTemplate += `${headerValueStr}  `;
    } 
  }
  // Return the headerTemplate to the caller
  return headerTemplate;
};

/////////////////////////////////////////////
// Response Main Template (Route Template) //
/////////////////////////////////////////////
// Expecting (Route): input.item[i].response
const responseTpl = (responseArr) => {
  // Start our blank routeTemplate
  let responseTemplate = '';
  // Add a header to the response template
  responseTemplate += `### Response(s)`;
  // (Add a space between lines)
  responseTemplate += emptyLine;
  // Iterate over all of the responses and add their contents to the routeTemplate
  for(let i = 0; i < responseArr.length; i++) {
    // Create an empty string and store the response status (if it exists)
    let responseStatusStr = '';
    if (responseArr[i].status) {
      responseStatusStr = ` (${responseArr[i].status})`;
    }
    // Add the status code and status type (Like "404 Not Found" or "200 Ok") to the response template
    responseTemplate += `### **Status Code**: ${responseArr[i].code}${responseStatusStr}`;
    // (Add a space between lines)
    responseTemplate += emptyLine;
    // Add the name given to the response in the response template
    responseTemplate += `#### ${responseArr[i].name}`;
    // (Add a space between lines)
    responseTemplate += emptyLine;
    // Add the test URL to the response template
    responseTemplate += `**Test URL**: [${responseArr[i].originalRequest.url.raw}](${responseArr[i].originalRequest.url.raw})`;
    // (Add a space between lines)
    responseTemplate += emptyLine;
    // Add the method header to the response template
    responseTemplate += `#### **Method**: ${responseArr[i].originalRequest.method}`;
    // (Add a space between lines)
    responseTemplate += emptyLine;
    // Add the finalized url template to the response template
    responseTemplate += `${urlTpl(responseArr[i].originalRequest.url)}`;
    // (Add a space between lines)
    responseTemplate += emptyLine;
    // Add the finalized header template to the response template
    responseTemplate += `${headerTpl(responseArr[i].header)}`;
    // (Add a space between lines)
    responseTemplate += emptyLine;
    // Add the body header to the response template
    responseTemplate += `#### **Body**`;
    // (Add a space between lines)
    responseTemplate += emptyLine;
    // Add our code block representing the body (and formatting language) of the response to the response template
    // This uses backticks that need to escaped so they'll be included in the output
    responseTemplate += `\`\`\`${responseArr[i]._postman_previewlanguage}`;
    // (Add a new line after the start of the code block)
    responseTemplate += newLine;
    responseTemplate += `${responseArr[i].body}`;
    // (Add a new line after the start of the code block)
    responseTemplate += newLine;
    responseTemplate += `\`\`\``;
    // (Finally add a space between responses)
    responseTemplate += emptyLine;
  }
  // Return the responseTemplate to the caller
  return responseTemplate;
};

///////////////////////////////////////////////
// Route Main Template (Everything Template) //
///////////////////////////////////////////////
// Expecting (routes): input.item
const routesTpl = (routeArr) => {
  // Start our blank routeTemplate
  let routesTemplate = '';
  // Add the header to the route template
  routesTemplate += `## Route(s)`;
  // (Add a space between lines)
  routesTemplate += emptyLine;
  // We need to iterate over every route and find the Request and Response(s)
  for (let i = 0; i < routeArr.length; i++) {
    // Add a horizontal line to the response template
    routesTemplate += `---`;
    // (Add a space between lines)
    routesTemplate += emptyLine;
    // Add the finalized request template to the route template
    routesTemplate += `${requestTpl(routeArr[i].request)}`;
    // Set a variable so we can use shorthand to represent the route's response(s)
    let responseArr = routeArr[i].response;
    // If there is a response add the finalized response template to the routes template 
    if (responseArr && responseArr.length > 0) { routesTemplate += `${responseTpl(responseArr)}`; }
  }
  // Return the routesTemplate to the caller
  return routesTemplate;
};

/////////////////////////
// Everything Template //
/////////////////////////
// Expecting (collection): input
const everythingTpl = (input) => {
  // Start our blank everythingTemplate
  let everythingTemplate = '';
  // Add the collection name to the everything template
  everythingTemplate += `## ${input.info.name}`;
  // (Add a space between lines)
  everythingTemplate += emptyLine;
  // Add the collection description (if one was given) to the everything template
  if (input.info.description) { 
    everythingTemplate += `**Description**: ${input.info.description}`; 
    // (Add a space between lines)
    everythingTemplate += emptyLine;
  }
  // Add a link to download the collection to the everything template
  everythingTemplate += `[Postman Collection JSON](<${filepath}>)`;
  // (Add a space between lines)
  everythingTemplate += emptyLine;
  // Add the collection routes to the everything template
  everythingTemplate += `${routesTpl(input.item)}`;
  // Return the everythingTemplate to the caller
  return everythingTemplate;
};

module.exports =  { authTpl, urlHostNameStr, urlHostPathStr, urlQueryParamsTpl, urlTpl, requestTpl, headerTpl, responseTpl, routesTpl, everythingTpl, doPostMark };