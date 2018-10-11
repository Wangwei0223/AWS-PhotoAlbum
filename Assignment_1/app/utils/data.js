import axios from 'axios';

export function GetTestInfo(param){
    return axios.get('https://jgooynjere.execute-api.us-west-2.amazonaws.com/Deploy/info', param);
}