const bcrypt= require("bcryptjs")
const User=require("../models/user")
const jwt=require("../utils/jwt")

function register(req, res){
    const {firstName, lastName, email, password}= req.body

    if(!email) res.status(400).send({msg:"El email es obligatorio"})
    if (!password) res.tattus(400).send({msg:"La contraseña es obligatoria"})

    const user=new User ({
     firstName, 
     lastName,
     email:email.toLowerCase(),
     role:"user",
     active:false,     
    })

    const salt=bcrypt.genSaltSync(10)
    const hashPassword=bcrypt.hashSync(password, salt)
    user.password=hashPassword

    user.save((error,userStorage)=>{
        if (error){
            res.status(400).send({msg:"Error al crear el usuario"})
        }else{
            res.status(200).send(userStorage)
        }
    })
    
}  

function login(req, res){
    const {email, password}= req.body

    if (!email) res.status(400).send({msg:"El email es obligatorio"})
    if (!password) res.status(400).send({msg:"La contraseña es obligatoria"})

    const emailLowaerCase= email.toLowerCase()

    User.findOne ({email:emailLowaerCase},(error, userStored) => {
        if (error){
            res.status(500).send({msg:"Error del servidor"})
        }else{
            bcrypt.compare(password, userStored.password, (bcryptError, check)=>{
                if (bcryptError){
                    res.status(500).send({msg:"Error del servidor"})
                }else if (!check){
                    res.status(400).send({msg:"Contraseña incorrecta"})
                }else{
                    res.status(200).send({
                        access:jwt.createAccessToken(userStored),
                        refresh: jwt.createRefreshToken(userStored)
                    })
                }
            })
        }
    })
}

function refreshAccessToken(req,res){
    const {token} = req.body

    if (!token) res.status(400).send({msg:"Token requerido"})

    const {user_id}= jwt.decoded(token)
    User.findOne({_id:user_id},(error,userStorage)=>{
        if (error){
            res.status(500).send({msg:"Error del servidor"})
        }else{
            res.status(200).send({
                accessToken:jwt.createAccessToken(userStorage)
            })
        }
    })
}

module.exports={
    register,
    login,
    refreshAccessToken
}