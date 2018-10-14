import axios from 'axios';

export function GetTestInfo(param) {
    return axios.get('https://jgooynjere.execute-api.us-west-2.amazonaws.com/Deploy/info', {
        params: param
    });
}

export function GetTestInfoPost(param) {
    return axios.post('https://txv6qdtkj4.execute-api.us-east-1.amazonaws.com/test/chatbot', {
        params: param
    });
}