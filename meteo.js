
var x = document.getElementById("demo");

function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
     x.innerHTML = "Geolocation is not supported by this browser.";
  }
} 
var a;
var b;
function altlon(position){

}
function showPosition(position) {
    document.getElementById("alt").innerHTML =position.coords.latitude;
    
       
        document.getElementById("lon").innerHTML=position.coords.longitude;
        a = toString( Math.trunc(position.coords.latitude));
        b = toString(Math.trunc(position.coords.longitude));
       
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                var response = JSON.parse(this.responseText);
                var temperature = response.main.temp;
                var v = response.name;
                var icon = response.weather[0].icon;
                var src = "http://openweathermap.org/img/w/" + icon + ".png";
        document.getElementById("meteo").innerHTML = temperature;
        document.getElementById("icon").src = src;
        document.getElementById("v").innerHTML = v;
            };
        };
           alert(get_url());
    xhr.open("GET", get_url(), true);
    xhr.send();
  }
  alert(a);

var xhr = new XMLHttpRequest();
a =document.getElementById("alt").value;
b =document.getElementById("lon").value;alert(a);
// Forme générale du lien :
// http://api.openweathermap.org/data/2.5/weather?q=Metz&3c084bd74c2f77f02d6d6c30c2018bf0

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "";
var units = "metric";
var appid = "3c084bd74c2f77f02d6d6c30c2018bf0";
var lat =a;
var lon =b;
function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "lat=" + lat + "&"
        + "lon=" + lon+ "&"
        + "appid=" + appid; 
};

function init_page() {
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();

            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;

            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("icon").src = src;
        };
    };
    
    xhr.open("GET", get_url(), true);
    xhr.send();
};

function get_temperature() {
    city = document.getElementById("ville").value;

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();

            if(document.getElementById("url_visibility").checked) {
                document.getElementById("url").style.display = "block";
            }
            else {
                document.getElementById("url").style.display = "none";
            };

            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;
            var v = response.name;
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
        
            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("icon").src = src;
            document.getElementById("v").innerHTML = v;


        };
    };
    
    xhr.open("GET", get_url(), true);
    xhr.send();
};
