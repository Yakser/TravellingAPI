const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketHotel = sequelize.define('basket_hotel', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Hotel = sequelize.define('hotel', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: false},
})

const City = sequelize.define('city', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false},
})

const HotelInfo = sequelize.define('hotel_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketHotel)
BasketHotel.belongsTo(Basket)

City.hasMany(Hotel)
Hotel.belongsTo(City)

Hotel.hasMany(Rating)
Rating.belongsTo(Hotel)

Hotel.hasMany(BasketHotel)
BasketHotel.belongsTo(Hotel)

Hotel.hasMany(HotelInfo, {as: 'info'})
HotelInfo.belongsTo(Hotel)


module.exports = {
  User,
  Basket,
  BasketHotel,
  Hotel,
  City,
  Rating,
  HotelInfo
}