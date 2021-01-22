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
const btn =document.querySelector(".search");

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    temp.textContent='loding...';
    loc.textContent='';
    desc.textContent='';
    lat1.textContent = '';
    long1.textContent = '';
    msg.textContent='';
    fetch('http://localhost:3000/weather?address='+search.value).then((res,error)=>{
    res.json().then((data)=> {
        console.log(data);
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
                 map_.style.display="block";         
            }
        });
    });
});

function initMap() {
        const place = { lat:28.7041 , lng:77.1025};
        const map = new google.maps.Map(map_, {
        zoom: 4,
        center: place,
        });
        const marker = new google.maps.Marker({
        position: place,
        map: map,
        });
    }
