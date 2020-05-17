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

getCorrectData = (data) => {
    return new Promise((resolve, reject) => {
        data = data.trim();
        var trainSchedule = []
        convertToJson(data.substr(data.indexOf("trainSchedule") + 27, data.substr(data.indexOf("trainSchedule") + 27).indexOf("]") + 1 )).then((jsonData) => {
            trainSchedule = jsonData
            var new_data = {
                trainNo: data.substr(53, 5),
                trainName: data.substr(71, data.substr(71).indexOf("\"") - 1),
                trainSchedule: trainSchedule
            }
            resolve(new_data)
        })
    })
}

module.exports = {
    convertToJson: convertToJson,
    getCorrectData: getCorrectData
}