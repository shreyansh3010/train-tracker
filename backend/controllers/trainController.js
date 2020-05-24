const axios = require('axios');
const jsonFormatterService = require('../services/jsonFormatterService');
const stationService = require('../services/stationService');
const _ = require('lodash');

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
                        var fomattedJson = fomateJson(jsonData);
                        resolve(fomattedJson);
                    })
            })
            .catch(function (error) {
                // handle error
                reject(error);
            })
    })
}

fomateJson = (jsonData) => {
    var new_stations = [];
    var curr_station = _.get(_.find(jsonData[0].stations, {
        stnCode: jsonData[0].curStn
    }), 'distance');
    _.forEach(jsonData[0].stations, (station) => {
        var new_station = station;
        new_station.stationName = _.get(stationService.getStationName(station.stnCode), 'properties.name');
        if (curr_station > new_station.distance) {
            new_station.status = 'passed'
        }
        else if(curr_station == new_station.distance){
            new_station.status = 'current'
        }
        else{
            new_station.status = 'not_passed'
        }
        new_stations.push(new_station);
    })
    jsonData[0].stations = new_stations;
    return jsonData;
}



module.exports = {
    getTrainDetails: getTrainDetails,
    getTrainStatus: getTrainStatus
}