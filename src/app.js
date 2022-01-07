const path = require('path')
const express = require('express'); 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000

// Define path for Express config
const puclicDirPath = path.join(__dirname,'../Public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handelbars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(puclicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather app",
        name : 'Mohmmad Alhaddad'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Mohmmad Alhaddad'
    })
})

app.get('/help',(rew,res)=>{
    res.render('help',{
        helpedText : 'this is some helpful text',
        title: 'help',
        name: 'Mohmmad Alhaddad'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    
    if(!address){
        return res.send({
            error : 'you must provide an address'
        })
    }
    geocode(address,(error,{lon,lat,location} = {} )=>{ //{} is default value if no value added to the destructure property (like if there is an error) so you Cannot destructure property as it is undefined

        if(error){
            return res.send({
                error : error
            })
        }
    
        forecast(lat, lon, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
    
            
            res.send({
                forecast : forecastData,
                location, // short of:  location : location 
                address // same up 
            });
          })
    
        })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        product : [1,2,3,4]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Mohmmad Alhaddad',
        errorMessage : 'help artical not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{errorMessage : 'page not found', name:'Mohmmad Alhaddad'})
})



app.listen(port,()=>{
    console.log('Server is up on port' + port);
})