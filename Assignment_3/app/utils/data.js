import axios from 'axios';


export function GetTestInfo(param) {
    return axios.get('https://jgooynjere.execute-api.us-west-2.amazonaws.com/Deploy/info', {
        params: param
    });
}

export function GetTestInfoPost(param) {
    return axios.post('https://txv6qdtkj4.execute-api.us-east-1.amazonaws.com/test/chatbot', param, { timeout: 5000 });
}

export function TestAuthoriztion() {
    return axios.get('https://opmjcz5zk3.execute-api.us-west-2.amazonaws.com/test');
}

export function SendMessage(message) {
    return axios.get('https://z59y6gx158.execute-api.us-east-1.amazonaws.com/prod/search', {
        params: { q: message }
    });
}

export function GetImage(param) { 
    let url = 'https://pqrqlu9q36.execute-api.us-east-1.amazonaws.com/test/weiphoto/Aimer.png';
    return axios.get(url);
}

export function PutImage(image){
    // let url = 'https://pqrqlu9q36.execute-api.us-east-1.amazonaws.com/test/photoccc/new.png';
    let filename = image['name']
    let url = 'https://z59y6gx158.execute-api.us-east-1.amazonaws.com/prod/upload/jingyao-photo/' + filename;
    let filetype = image['name'].split('.').reverse()[0];
    if(filetype === 'jpg') filetype = 'jpeg';
    let content_type = 'image/' + filetype;
    var params = image;
    return axios.put(url,params, {
        headers: {
            'Content-Type': content_type,
        }
    });
}

export function ss(param) { 
    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        folder: 'weiphoto',
        item: 'weiphoto.png',
        "Content-Type": "image/png",
    };

    var body = {
        //This is where you define the body of the request
    };
    var selectedFile = document.getElementById('input').files[0];
    var fileReader = new FileReader();
    var additionalParams = {
        headers: {
            "Content-Type": "image/png",
        }
    };
    fileReader.onload = function (event) {
        body = event.target.result;
        apigClient.photosFolderItemPut(params, body, additionalParams)
            .then(function (result) {
                //This is where you would put a success callback
            }).catch(function (result) {
                //This is where you would put an error callback
                console.log(result);
            });
    }
    fileReader.readAsBinaryString(selectedFile);
 }