const express = require('express');
const router = express.Router();
const data = require('../utils/data');
const axios = require('axios');

/* GET home page. */
router.route('/')
    .get((request, response) => {
      let name = request.query.city;
      data.getByName(name, data.callback, response)
    });

router.route('/coordinates')
    .get((request, response) => {
      let coordinates = {
        lat: request.query.lat,
        lon: request.query.lon
      };
      data.getByCoordinates(coordinates, data.callback, response)
    });



module.exports = router;
