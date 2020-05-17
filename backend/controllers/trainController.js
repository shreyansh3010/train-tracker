const axios = require('axios');
const jsonFormatterService = require('../services/jsonFormatterService');

getTrainDetails = (train_no) => {
    return new Promise((resolve, reject) => {
        var url = `https://enquiry.indianrail.gov.in/ntes/NTES?action=getTrainData&trainNo=${train_no}`
        axios.get(url)
            .then(function (response) {
                jsonFormatterService.getCorrectData(response.data.slice(25))
                    .then((jsonData) => {
                        resolve(jsonData);
                    })
            })
            .catch(function (error) {
                // handle error
                reject(error);
            })
    })
}

getTrainStatus = (train_no, startDate) => {
    return new Promise((resolve, reject) => {
        var url = `https://enquiry.indianrail.gov.in/ntes/NTES?action=getTrainForDate&trainNo=${train_no}&trainStartDate=${startDate}&t=${new Date().getTime()}`
        axios.get(url)
            .then(function (response) {
                jsonFormatterService.convertToJson(response.data.split('=')[1])
                    .then((jsonData) => {
                        resolve(jsonData);
                    })
            })
            .catch(function (error) {
                // handle error
                reject(error);
            })
    })
}



module.exports = {
    getTrainDetails: getTrainDetails,
    getTrainStatus: getTrainStatus
}