exports.handler = async (event) => {
    // TODO implement
    let mes = event.messages[0]['unstructured']['text'];
    
    let mes_pool = ['Hello my friend', 'I currently do not have NLP ability', 'I have received your message: ' + mes, 'Thanks for Chatting with me', 'Have a nice day', 'My author is WEI WANG', 'Front End of this Demo is based on Vue.js'];
    
    let res_mes = mes_pool[Math.floor(Math.random()*mes_pool.length)];
    const response_msg = {
        messages: [
            {
                type: "string",
                unstructured: {
                id: 'chatbot'+parseInt(+new Date()),
                text: res_mes,
                timestamp: +new Date()
                }
            }
        ]
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(response_msg)
    };
    return response;
};