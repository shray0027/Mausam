
console.log("hello js");
const weatherForm = document.querySelector('form');
const search=document.querySelector('input');
const temp=document.querySelector('#temp');
const content =document.querySelector(".content");
const loc=document.querySelector('#loc');
const errorMsg=document.querySelector('.error');
const errorImg=document.querySelector('.index');
const msg=document.querySelector('.msg');
const lat1=document.querySelector('#lat');
const long1=document.querySelector('#long');
const desc=document.querySelector('#desc');
const map_ =document.getElementById("map");
const img1 =document.querySelector(".img-1");

var lat11=0;
var lat22=0;
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    temp.textContent='loading...';
    loc.textContent='';
    desc.textContent='';
    lat1.textContent = '';
    long1.textContent = '';
    msg.textContent='';
    img1.src='';

    fetch('https://weather-blitz.herokuapp.com/weather?address='+search.value).then((res,error)=>{
    res.json().then((data)=> {
            if(data.error){
            errorImg.src='/img/address404.jpg';
            msg.textContent=data.error;
            errorMsg.style.display="flex";
            content.style.display="none";
            map_.style.display="none";
            } else {
                 errorMsg.style.display="none";
                 content.style.display="flex";
                 temp.textContent= "Temperature : "+data.temperature;
                 loc.textContent="Place : "+data.location;
                 desc.textContent=data.description;
                 lat1.textContent = "Lat - "+ data.latitude+" ,";
                 long1.textContent ="Long - " +data.longitude;
                 img1.src = data.weatherIcon;
                 latt11=data.latitude;
                 latt22=data.longitude;
                 map_.style.display="block";      
                 mapboxgl.accessToken = 'pk.eyJ1Ijoic2hyYXkwMDI3IiwiYSI6ImNrZ3FtOHl5dTJ3YTQyc3RlZzhuNHI4enQifQ.TRewRSW2O-UFK02JXQNPrQ';
                 var map = new mapboxgl.Map({
                   container: 'map',
                   style: 'mapbox://styles/mapbox/streets-v11',
                   center: [latt22,latt11],
                   zoom:11,
                 }
                 );
                  var marker =new mapboxgl.Marker()
                  .setLngLat([latt22,latt11])
                  .addTo(map);
            }
        });
    });
});

