exports.handler = async (event) => {
    
    const inputBody = JSON.parse(event.body);
    const descriptionString = (desc) => {
        let descTpl;
        if(desc){
            descTpl = `**Description**: ${desc}`;
        } else {
            return "";
        }
        return descTpl;
    }
    const outputTemplate = 
    `## ${inputBody.info.name}
${descriptionString(inputBody.info.description)}
`;

    // TODO implement
    const response = {
        statusCode: 200,
        body: outputTemplate,
    };
    return response;
};
