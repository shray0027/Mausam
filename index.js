const express = require('express');
const app = express();
const ejs = require('ejs');
const geocode = require(__dirname + "/utils/geocode");
const forecast = require(__dirname + "/utils/forecast");

app.set('view engine','ejs');
app.use(express.static("public"));
app.get("",(req,res)=>{
    res.render("index",{
        title :"Weather app",
        image : "/img/weather.png"
    });
});
app.get("/weather",(req,res)=>{
        if(!req.query.address){
            return res.send({
                error : "you must provide an address"
            });;
        }
        const address = req.query.address;
        geocode(address,(error,{latitude,longitude,location}={ })=>{
            if(error){
                return res.send({error : error});
            }
        
            forecast(latitude,longitude,(error,response)=>{
                if(error){
                    return res.send({error : error});
                }
                res.send({
                    latitude : latitude,
                    longitude : longitude,
                    location : location,
                    description : response.description,
                    temperature : response.temperature,
                    weatherIcon : response.weatherIcon,
                });
            });
        });
});
app.get("/help",(req,res)=>{
    res.render("help",{
        title : "Help",
        image : "/img/help.png"
    })
});
app.get("/about",(req,res)=>{
    res.render("about",{
        title : "About",
        image : "/img/about.png"
    })
});
app.get("/help/*",(req,res) =>{
    res.render("404",{
        title : "404 help article not found"
    })
 } )
app.get("*",(req,res) =>{
   res.render("404",{
       title : "404 page not found"
   })
} )
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
  }
app.listen(port,()=>{
    console.log("port 3000 is deployed");
})