const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(path.join(__dirname,'../public')))
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)
app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Divyan Poddar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about me',
        name: 'Divyan Poddar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        number: '8017356602',
        name: 'Divyan Poddar'
    })
})
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'you must enter the address'
        })}
    
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(location,(error,forecastData) =>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
        })
    })
            
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })

    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404 help',
        name: 'Divyan',
        errormessage: 'Help Article Not Found'
    })
})
app.get('*',(req,res) =>{
res.render('404',{
    title: '404',
    name: 'Divyan',
    errormessage: 'Page not found'
})})

app.listen(port,() =>{
    console.log('server is up on port 3000')
})