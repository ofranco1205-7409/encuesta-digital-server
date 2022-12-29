const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../constants')
const moment = require('moment')

exports.createAccessToken = function (user) {
  const payload = {
    token_type:"access",
    user_id: user._id,
    iat: moment().unix(),
    exp: moment().add(3, 'hours').unix()
  }

  return jwt.sign(payload, JWT_SECRET_KEY)
}

exports.createRefreshToken = function (user) {
  const payload = {
    token_type:"refresh",
    user_id: user._id,
    iat: moment().unix(),
    exp: moment().add(1, 'month').unix()
  }

  return jwt.sign(payload, JWT_SECRET_KEY)
}

exports.decoded = function (token) {
  return jwt.decode(token, JWT_SECRET_KEY, true)
}