`## ${input.info.name}`

`**Description**: ${info.description}`

`[Postman Collection JSON](<${filepath}>)`

`## Route(s)`
  // We iterate over the input.item array
  //thisItem = input.item[i];

  `### ${thisItem.name}`

  `**Description**: ${thisItem.description}`

  `**Test URL**: [${thisItem.url.raw}](${thisItem.url.raw})`

  `## Request`

    // authType = thisItem.request.auth.type -> 'basic'
    `#### **Authorization Type**: ${authType}`
      // We iterate over the thisItem.request.auth.type[authType] array
      `>- Key: ${thisItem.request.auth.type[authType].key}  `
      `>- Value: ${thisItem.request.auth.type[authType].value}  `
      `>- Type: ${thisItem.request.auth.type[authType].type}  ` 
      // End iterate (Authorization)

    `#### **Method**: ${thisItem.request.method}`

    // Maybe this is an external function?
    // let hostName;
    // for (let i = 0; i < thisItem.request.url.host.length; i++) {
    //   if (i = thisItem.request.url.host.length - 1) {
    //     hostName += `${thisItem.request.url.host[i]}`
    //   } else {
    //     hostName += `${thisItem.request.url.host[i]}.`
    //   }
    // }
    `>- Host: ${thisItem.request.url.protocol}//${hostName}  `

    // Maybe this is an external function?
    // let hostPath;
    // for (let i = 0; i < thisItem.request.url.path.length; i++) {
    //   hostPath += `/${thisItem.request.url.path[i]}`
    // }
    `>- Path: ${hostPath}  `

    `#### **Query Parameter(s)**`
      // Iterate over the thisItem.request.url.query
      // pathQueries = thisItem.request.url.query;

      `##### Parameter (${pathQueries[i].description})`

      `>- key: ${pathQueries[i].key}  `
      `>- value: ${pathQueries[i].value}  `
      // End iterate (Query Parameters)
    // End iterate (Request)

  `## Response(s)`
    // iterate over thisItem.response
    // thisResponse = thisItem.response[i]

    `---`

    `### **Status Code**: ${thisResponse.code} (${thisResponse.status})`

    `#### ${thisResponse.name}`

    `**Description**:`

    `**Test URL**: [${thisResponse.originalRequest.url.raw}](${thisResponse.originalRequest.url.raw})`

    `#### **Method**: ${thisResponse.originalRequest.method}`

    // Maybe this is an external function?
    // let hostName;
    // for (let i = 0; i < thisResponse.originalRequest.url.host.length; i++) {
    //   if (i = thisResponse.originalRequest.url.host.length - 1) {
    //     hostName += `${thisResponse.originalRequest.url.host[i]}`
    //   } else {
    //     hostName += `${thisResponse.originalRequest.url.host[i]}.`
    //   }
    // }
    `>- Host: ${thisResponse.originalRequest.url.protocol}//${hostName}  `

    // Maybe this is an external function?
    // let hostPath;
    // for (let i = 0; i < thisResponse.originalRequest.url.path.length; i++) {
    //   hostPath += `/${thisResponse.originalRequest.url.path.length[i]}`
    // }
    `>- Path: ${hostPath}`

    `#### **Query Parameter(s)**`
      // Iterate over the thisResponse.originalRequest.url.query
      // pathQueries = thisResponse.originalRequest.url.query;

      `##### Parameter (${pathQueries[i].description})`

      `>- key: ${pathQueries[i].key}  `
      `>- value: ${pathQueries[i].value}  `
      // End iterate (Query Parameters)

    `#### **Header(s)**`
      // Iterate over the headers, but we only care about one of them, the "content-type"...
      // let responseHeaders = thisResponse.header
      // let contentHeader;
      // for (let i = 0; i < responseHeaders.length; i++) {
      //   if (responseHeaders[i].key = "Content-Type") {
      //     contentHeader = {
      //       key: responseHeaders[i].key,
      //       value: responseHeaders[i].value
      //     }
      //   }
      // }
      `>- key: ${contentHeader.key},  `
      `>- value: ${contentHeader.value}  `
    // End iterate (Headers)

    `#### **Body**`
    // At some point we could try to parse the body to something a little more sane...
    // ...but that's a pretty huge stretch goal, I think.

    `\`\`\`${thisResponse._postman_previewlanguage}`
    `${thisResponse.body}`
    `\`\`\``

  // End iterate (Response)
// End iterate (Routes)