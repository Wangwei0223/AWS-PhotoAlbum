import axios from 'axios';
axios.defaults.headers.common['X-Api-Key'] = '6dQCB6EFfM4etPbft1cAB5j2AJoPc4Eq9UOM9KAI';


export function GetTestInfo(param) {
    return axios.get('https://jgooynjere.execute-api.us-west-2.amazonaws.com/Deploy/info', {
        params: param
    });
}

export function GetTestInfoPost(param) {
    return axios.post('https://txv6qdtkj4.execute-api.us-east-1.amazonaws.com/test/chatbot', param);
}