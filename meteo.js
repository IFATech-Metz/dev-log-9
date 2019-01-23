
var xhr = new XMLHttpRequest();

//var x = document.getElementById("demo");




/*var h =document.querySelector("find_btn");
  button.addEventListener("click", () => {
    console.log("Button clicked.");
  });;*/
// Forme générale du lien :
// http://api.openweathermap.org/data/2.5/weather?q=Metz&3c084bd74c2f77f02d6d6c30c2018bf0
var base_url = "http://api.openweathermap.org/data/2.5/weather?";
var city = "";
var units = "metric";
var appid = "3c084bd74c2f77f02d6d6c30c2018bf0";
var lat =a;
var lon =b;
function get_url() {
    return base_url 
        + "q=" + city + ",Fr&" 
         + "units=" + units + "&"
        + "appid="+ appid; 
       
};
function get_url2() {
    return ul 
        + "q=" + city + ",Fr&" 
         + "units=" + units + "&"
        + "appid="+ appid; 
       
};

function init_page() {
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();

            var response = JSON.parse(this.responseText);
            var i; 
            var temperature = response.main.temp;

            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("icon").src = src;
        };
    };
    
    xhr.open("get", get_url(), true);
    xhr.send();
};

function get_temperature() {
    city = document.getElementById("ville").value;

   
            document.getElementById("url").innerHTML = get_url2();

            if(document.getElementById("url_visibility").checked) {
                document.getElementById("url").style.display = "block";
            }
            else {
                document.getElementById("url").style.display = "none";
            };

            var ul = "https://api.openweathermap.org/data/2.5/forecast?"
  
            $.ajax({
                url: ul, //API Call
                dataType: "json",
                type: "GET",
                data: {
                  q: city,
                  appid: appid,
                  units: "metric",
                  cnt: "10"
                },
                success: function(data) {
                  console.log('Received data:', data) // For testing
                  var wf = "<tr>";
                   // City (displays once)
                 
                  $.each(data.list, function(index, val) {
                    wf += "<td>" + data.city.name + "</td>";
                    wf += "<td> " +  val.dt_txt+"</td>" // Day
                    wf += "<td>"+val.main.temp + "&degC </td>" // Temperatur
                    wf += "<td> " +  val.wind.speed+"</td>" 
                    wf += "<td> " +  val.wind.deg+"</td>" 
                    wf += "<td> " +  val.main.humidity+"</td>" 
                    wf += "<span> | " + val.weather[0].description + "</span>"; // Description
                    wf += "<td><img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'></td>" // Icon
                    wf += "</tr>" // Closing paragraph tag
                  });
                  $("#showWeatherForcast").html(wf);
                }
              });
};
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
        
            a =  position.coords.latitude;
            b = position.coords.longitude;
            var ul = "https://api.openweathermap.org/data/2.5/forecast?&lat="+a+"&lon="+b+"&units="+units;
      
            $.ajax({
              url: ul, //API Call
              dataType: "json",
              type: "GET",
              data: {
                q: city,
                appid: appid,
                units: "metric",
                cnt: "10"
              },
              success: function(data) {
                console.log('Received data:', data) // For testing
                var wf = "<tr>";
                 // City (displays once)
               
                $.each(data.list, function(index, val) {
      //            wf += "<td>" + data.city.name + "</td>";
                  wf += "<td> " +  val.dt_txt+"</td>" // Day
                  wf += "<td>"+val.main.temp + "&degC </td>" // Temperatur
                  wf += "<td> " +  val.wind.speed+"</td>" 
                  wf += "<td> " +  val.wind.deg+"</td>" 
                  wf += "<td> " +  val.main.humidity+"</td>" 
                  wf += "<span> | " + val.weather[0].description + "</span>"; // Description
                  wf += "<td><img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'></td>" // Icon
                  wf += "</tr>" // Closing paragraph tag
                });
                $("#showWeatherForcast").html(wf);
              }
            });
        
          
      }
      //https://samples.openweathermap.org/data/2.5/forecast/daily?
      //var key = "YOUR KEY";
      //var city = "YOUR CITY"; // My test case was "London"
      var ul = "https://api.openweathermap.org/data/2.5/forecast";
      
      $.ajax({
        url: ul, //API Call
        dataType: "json",
        type: "GET",
        data: {
          q: city,
          appid: appid,
          units: "metric",
          cnt: "10"
        },
        success: function(data) {
          console.log('Received data:', data) // For testing
          var wf = "<tr>";
           // City (displays once)
         
          $.each(data.list, function(index, val) {
         wf += "<td>" + data.city.name + "</td>";
            wf += "<td> " +  val.dt_txt+"</td>" // Day
            wf += "<td>"+val.main.temp + "&degC </td>" // Temperatur
            wf += "<td> " +  val.wind.speed+"</td>" 
            wf += "<td> " +  val.wind.deg+"</td>" 
            wf += "<td> " +  val.main.humidity+"</td>" 
            wf += "<span> | " + val.weather[0].description + "</span>"; // Description
            wf += "<td><img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'></td>" // Icon
            wf += "</tr>" // Closing paragraph tag
          });
          $("#showWeatherForcast").html(wf);
        }
      });