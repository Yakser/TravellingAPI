const uuid = require('uuid')
const path = require('path');
const {Hotel, HotelInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class HotelController {
  async create(req, res, next) {
    try {
      const {name, price, cityId, info} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      
      const hotel = await Hotel.create({name, price, cityId, img: fileName})


      if (info) {
        info = JSON.parse(info)
        info.forEach(i => 
          HotelInfo.create({
            title: i.title,
            description: i.description,
            hotelId: hotel.id
          })
        )
      }

      return res.json(hotel)
    } catch(e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let {cityId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let hotels;
    if (!cityId) {
      hotels = await Hotel.findAndCountAll({limit, offset})
    } else {
      hotels = await Hotel.findAndCountAll({where:{cityId}, limit, offset})
    }
    return res.json(hotels)
  }

  async getOne(req, res) {
    const {id} = req.params
    const hotel = await Hotel.findOne(
      {
        where: {id},
        include: [{model: HotelInfo, as: 'info'}]
      },
    )
    return res.json(hotel)
  }
}

module.exports = new HotelController()