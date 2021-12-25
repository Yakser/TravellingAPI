const {City} = require('../models/models')
const ApiError = require('../error/ApiError');

class CityController {
  async create(req, res) {
    const {name} = req.body
    const city = await City.create({name})
    return res.json(city)
  }

  async getAll(req, res) {
    const cities = await City.findAll()
    return res.json(cities)
  }

}

module.exports = new CityController()