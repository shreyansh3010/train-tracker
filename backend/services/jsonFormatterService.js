const axios = require('axios');


convertToJson = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('https://jsonformatter.curiousconcept.com/process', {
                jsondata: data.trim(),
                jsontemplate: 1,
                jsonspec: 4,
                jsonfix: 'on'
            })
            .then(function (response) {
                resolve(JSON.parse(response.data.result.jsoncopy));
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

module.exports = {
    convertToJson: convertToJson
}