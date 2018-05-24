'use strict'


// ############################################################################################
// ############################## importaciones, requires #####################################
// ############################################################################################

const express = require('express')
const bodyParser = require('body-parser')

// ############################################################################################
// ########################## inicializaciones, configuraciones ###############################
// ############################################################################################

const app = express()
const port = 2411

var Auth = ""
var code = "###"
var timer
var isTimer = false
var sago = true


app.use(bodyParser.urlencoded({extended:false})) //esto para que?
app.use(bodyParser.json())


// ############################################################################################
// ########################## ######### funciones ########### ###############################
// ############################################################################################

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  // ############################################################################################
// ########################## ######### Ejecuciones ########### ###############################
// ############################################################################################

app.listen(port,() => {
    console.log(`Ejecutando API de pruebas en puerto ${port}`)
    Auth = makeid(10)
    console.log('codigo de autenticacion de generador de codigos: ')
    console.log(Auth)
    })

app.get('/simulador/auth',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
    res.status(200).send({message: `Codigo de autorizacion: ${Auth} `}) 
    console.log('codigo de autenticacion de generador de codigos: ')
    console.log(Auth)
    
})

app.get('/simulador/sago',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
    res.status(200).send({message: `Mostrar simulador: ${sago} `,show : sago}) 
    console.log('codigo de autenticacion de generador de codigos: ')
    console.log(Auth)
    
})

app.post('/simulador/show',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    

    if (req.body.hasOwnProperty('config')) {
        console.log('seteando simulador SAGO: ')
        console.log(req.body.config)
        sago = req.body.config
        res.status(200).send({message: `Mostrar simulador: ${sago} `,show : sago}) 
        

    } else {

        console.log('error, no hay configuracion')
        res.status(400).send({message: `Mostrar simulador se mantiene en: ${sago} `}) 

        
    }
    
})

app.post('/simulador/code',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
    let userCode = req.body.code

    if (userCode == code && code !="###") {
        console.log('Usuario Autenticado: ')
        console.log(userCode)
        res.status(200).send({auth : true}) 
        

    } else {

        console.log('error de autenticacion')
        res.status(400).send({auth : false}) 

        
    }
    
})

app.post('/simulador/codeGen', (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    console.log('Se ha solicitado nuevo codigo con auth: ')
    console.log(req.body) //no esta funcionando con raw data
    //console.log(req)
    let authCode = req.body.code
    
    let time = req.body.time ? req.body.time : 120

    console.log('tiempo: ' + time + ' s')

    if (isTimer){
        clearTimeout(timer)
    }
    if (true) {
        code = makeid(6)
        console.log('codigo de autenticacion de usuario: ')
        console.log(code)
        isTimer=true
        timer = setTimeout(() => { 
            code = "###"; 
            isTimer=false
            console.log('codigo de autenticacion de usuario expirado ')
            console.log(code)
        }, time*1000);
        res.status(200).send({message: `codigo de autenticacion`, body: code}) 

    } else {

        console.log('error de autenticacion')
        res.status(400).send({message: `error de autenticacion`}) 

        
    }

    //res.status(200).send(req.body) 

    //res.status(200).send({message: `has probado el end point /prueba/p`, body: req}) 

})



