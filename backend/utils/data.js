const axios = require('axios');

exports.getByName = (name, callback, result) => {
    axios.get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: name,
            lang: "ru",
            units: "metric",
            appid: "3494b8f1c8f596aee028c113d9cf5e78"
        },
        timeout: 2000

    })
        .then(res => {
            callback(res.data, result);
        })
        .catch(error => {
            callback(error.response, result);
        })
};

exports.getByCoordinates = (coordinates, callback, result) => {
    axios.get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            lang: "ru",
            units: "metric",
            appid: "3494b8f1c8f596aee028c113d9cf5e78"
        },
        timeout: 2000
    })
        .then(res => {
            callback(res.data, result);
        })
        .catch(error => {
            callback(error.response, result);
        })
};

exports.callback = (response, result) => {
    if (response) {
        if (response.status) {
            if (response.status === 404) {
                result.status(404);
                result.send();
            } else {
                result.status(response.status);
                result.send();
            }
        }
        else {
            result.send(response)
        }
    } else {
        result.status(504);
        result.send();
    }
};