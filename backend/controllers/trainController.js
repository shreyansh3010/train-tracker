const axios = require('axios');
const jsonFormatterService = require('../services/jsonFormatterService');

getTrainDetails = (train_no) => {
    return new Promise((resolve, reject) => {
        var day_after_tommorow = new Date(new Date().getTime() + 2 * 86400000)
        var url = `https://enquiry.indianrail.gov.in/ntes/NTES?action=getTrainForDate&trainNo=${train_no}&trainStartDate=${day_after_tommorow.getDate()}/${day_after_tommorow.getMonth() + 1}/${day_after_tommorow.getFullYear()}`
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