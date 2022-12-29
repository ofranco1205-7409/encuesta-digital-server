const express= require("express")
const AuthControler= require ("../controllers/auth")

const api= express.Router()

api.post("/auth/register", AuthControler.register)
api.post("/auth/login", AuthControler.login)
api.post("/auth/refresh_access_token", AuthControler.refreshAccessToken)

module.exports=api