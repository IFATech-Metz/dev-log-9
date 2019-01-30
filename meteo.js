// Forme générale du lien :
// http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?
// date=1527811200&opacity=0.9&fill_bound=true&appid={api_key}

var baseURLMaintenant = "http://api.openweathermap.org/data/2.5/weather";
var baseURLDetails = "http://api.openweathermap.org/data/2.5/forecast";
var baseURLPrevisions = "http://api.openweathermap.org/data/2.5/forecast/daily";
var city;
var latitude;
var longitude;
var cnt;
var units = "metric";
var lang = "fr";
var maintenant;
var details;
var previsions;
var indexDetails;
var indexPrevisions;

var appid = "3c084bd74c2f77f02d6d6c30c2018bf0";
//var appid = "f5e810531af1756846022c6f387acf25";
//var appid = "348e43383864ecfba8b0827cc402f3ff";
//var appid = "2956ff49de9d7e9faa3cc83cc4805ee8";

function getURLMaintenant(parametreRecherche) {
    return baseURLMaintenant + "?"
        + parametreRecherche
        + "units=" + units + "&"
        + "lang=" + lang + "&"
        + "appid=" + appid;
}

function getURLDetails(parametreRecherche) {
    return baseURLDetails + "?"
        + parametreRecherche
        + "units=" + units + "&"
        + "lang=" + lang + "&"
        + "appid=" + appid;
}

function getURLPrevisions(parametreRecherche) {
    return baseURLPrevisions + "?"
        + parametreRecherche
        + "units=" + units + "&"
        + "cnt=" + cnt + "&"
        + "lang=" + lang + "&"
        + "appid=" + appid;
}

function getMeteo(typeRecherche) {
    cnt = document.getElementById("id_nombrejours").options[document.getElementById("id_nombrejours").selectedIndex].value;
    switch(typeRecherche) {
        case "ville" :
            getMeteoVille();
            break;
        case "geo" :
            getMeteoGeolocalisation();
            break;
    }
}

function getMeteoVille() {
    city = document.getElementById("id_nomville").value;
    getDetailsPrevisionsMeteo("q=" + city + "&");
}

function getMeteoGeolocalisation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordonnees, erreurLocalisation);
    } else {
        document.getElementById("id_erreurlocation").innerHTML = "La géolocalisation n'est pas supportée par votre navigateur.";
    }
}

function getCoordonnees(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getDetailsPrevisionsMeteo("lat=" + latitude + "&lon=" + longitude + "&");
}

function erreurLocalisation(erreur) {
    switch(erreur.code) {
        case erreur.PERMISSION_DENIED :
            document.getElementById("id_erreurlocation").innerHTML = "User denied the request for Geolocation."
            break;
        case erreur.POSITION_UNAVAILABLE :
            document.getElementById("id_erreurlocation").innerHTML = "Location information is unavailable."
            break;
        case erreur.TIMEOUT:
            document.getElementById("id_erreurlocation").innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("id_erreurlocation").innerHTML = "An unknown error occurred."
            break;
    }
}

/* Fonction prototype de récupération des données Jsonfunction protoRecupDetailsPrevision */
function getDetailsPrevisionsMeteo(parametreRecherche) {
    var xhrmaintenant =new XMLHttpRequest();
    var xhrDetails = new XMLHttpRequest();
    var xhrPrevisions = new XMLHttpRequest();
    xhrmaintenant.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            maintenant = JSON.parse(this.responseText);
            xhrDetails.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200) {
                    details = JSON.parse(this.responseText);
                    xhrPrevisions.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            previsions = JSON.parse(this.responseText);
                            console.log("maintenant :");
                            console.log(maintenant);
                            console.log("details :");
                            console.log(details);
                            console.log("previsions :");
                            console.log(previsions);
                            document.getElementById("id_meteo").innerHTML = Meteo();
                        }
                    };
                    xhrPrevisions.open("GET", getURLPrevisions(parametreRecherche), true);
                    xhrPrevisions.send();
                }
            };
            xhrDetails.open("GET", getURLDetails(parametreRecherche), true);
            xhrDetails.send();
        }
    };
    xhrmaintenant.open("GET", getURLMaintenant(parametreRecherche), true);
    xhrmaintenant.send();
}

function DateFormatee(expression) {
    var varDate = new Date(expression * 1000);
    var moisDate = String(varDate.getMonth() + 1);
    var jourDate = String(varDate.getDate());
    if (moisDate.length < 2) moisDate = "0" + moisDate;
    if (jourDate.length < 2) jourDate = "0" + jourDate;
    return(jourDate + "/" + moisDate);
}

function Heures(expression) {
    var varDate = new Date(expression * 1000);
    var heuresDate = String(varDate.getHours());
    var minutesDate = varDate.getMinutes();
    var heure = heuresDate + "h";
    if(minutesDate != 0) {
        if(minutesDate < 10) {
            heure += "0" + String(minutesDate);
        } else {
            heure += String(minutesDate);
        }
    }
    return(heure);
}

function DatePourTest(expression) {
    var varDate = new Date(expression * 1000);
    var datePourTest = (varDate.getFullYear() * 10000) + ((varDate.getMonth() + 1) * 100) + varDate.getDate();
    return(datePourTest);
}

function HeuresPourTest(expression) {
    var varDate = new Date(expression * 1000);
    return(varDate.getHours());
}

function AfficherDetails(idBalise) {
    document.getElementById(idBalise).style.display = "flex";
}

function FermerDetails(idBalise) {
    document.getElementById(idBalise).style.display = "none";
}

// CREER LES FONCTIONS DE CONSTRUCTION HTML

function Meteo() {
    indexDetails = 0;
    indexPrevisions = 0;
    var dateMaintenantPourTest = DatePourTest(maintenant.dt);
    var dateDetailsPourTest = DatePourTest(details.list[indexDetails].dt);
    var datePrevisionsPourTest = DatePourTest(previsions.list[indexPrevisions].dt);
    console.log("dateMaintenantPourTest : " + dateMaintenantPourTest);
    console.log("dateDetailsPourTest : " + dateDetailsPourTest);
    console.log("datePrevisionsPourTest : " + datePrevisionsPourTest);
    var trouve = false;
    while((dateDetailsPourTest <= dateMaintenantPourTest) && !trouve) {
        if(dateDetailsPourTest == dateMaintenantPourTest) {
            var heureDetails = HeuresPourTest(details.list[indexDetails].dt);
            var heureMaintenant = HeuresPourTest(maintenant.dt);
            if(heureMaintenant >= heureDetails) {
                indexDetails++;
                dateDetailsPourTest = DatePourTest(details.list[indexDetails].dt);
            } else {
                trouve = true;
            }
        } else {
            indexDetails++;
            dateDetailsPourTest = DatePourTest(details.list[indexDetails].dt);
        }
    }
    while(datePrevisionsPourTest <= dateMaintenantPourTest) {
        indexPrevisions++;
        datePrevisionsPourTest = DatePourTest(previsions.list[indexPrevisions].dt);
    }
    var htmlCode = "";
    htmlCode += "<div class=\"titremeteoville\">";
    htmlCode += "<h2>Météo sur " + details.city.name + "</h2>";
    htmlCode += "</div>";
    htmlCode += "<div class=\"meteojour\">";
    htmlCode += "<div class=\"maintenant\">";
    htmlCode += "<span class=\"datemaintenant\">" + DateFormatee(maintenant.dt) + "</span>";
    htmlCode += "<span class=\"heuremaintenant\">" + Heures(maintenant.dt) + "</span>";
    htmlCode += "<span class=\"descriptionmaintenant\">" + maintenant.weather[0].description + "</span>";
    htmlCode += "<img class=\"iconmaintenant\" src=\"http://openweathermap.org/img/w/" + maintenant.weather[0].icon + ".png\">";
    htmlCode += "<span class=\"temperaturemaintenant\">" + maintenant.main.temp.toFixed(1) + "°C</span>";
    htmlCode += "<span class=\"pressionmaintenant\">Pression : " + maintenant.main.pressure.toFixed() + " hPa</span>";
    htmlCode += "<span class=\"humiditemaintenant\">Humudité : " + maintenant.main.humidity + "%</span>";
    htmlCode += "<span class=\"ventmaintenant\">Vent : " + (maintenant.wind.speed * 3.6).toFixed() + " km/h</span>";
    if(dateDetailsPourTest == dateMaintenantPourTest) {
        htmlCode += "<button class=\"boutonafficherdetails\" type=\"button\" onclick=\"AfficherDetails('id_details0')\">+</button>";
    }
    htmlCode += "</div>";
    if(dateDetailsPourTest == dateMaintenantPourTest) {
        htmlCode += "<div id=\"id_details0\" class=\"details\">";
        while((indexDetails < details.cnt) && (dateDetailsPourTest == dateMaintenantPourTest)) {
            htmlCode += "<div class=\"detailsjour\">";
            htmlCode += "<span class=\"datedj\">" + DateFormatee(details.list[indexDetails].dt) + "</span>";
            htmlCode += "<span class=\"heuredj\">" + Heures(details.list[indexDetails].dt) + "</span>";
            htmlCode += "<span class=\"descriptiondj\">" + details.list[indexDetails].weather[0].description + "</span>";
            htmlCode += "<img class=\"icondj\" src=\"http://openweathermap.org/img/w/" + details.list[indexDetails].weather[0].icon + ".png\">";
            htmlCode += "<span class=\"temperaturedj\">" + details.list[indexDetails].main.temp.toFixed(1) + "°C</span>";
            htmlCode += "<span class=\"pressiondj\">Pression : " + details.list[indexDetails].main.pressure.toFixed() + " hPa</span>";
            htmlCode += "<span class=\"humiditedj\">Humudité : " + details.list[indexDetails].main.humidity + "%</span>";
            htmlCode += "<span class=\"ventdj\">Vent : " + (details.list[indexDetails].wind.speed * 3.6).toFixed() + " km/h</span>";
            htmlCode += "</div>";
            indexDetails++;
            dateDetailsPourTest = DatePourTest(details.list[indexDetails].dt);
        }
        htmlCode += "<div class=\"fermerdetails\"><button class=\"boutonfermerdetails\" type=\"button\" onclick=\"FermerDetails('id_details0')\">Fermer</button></div>";
        htmlCode += "</div>";
    }
    htmlCode += "</div>";
    htmlCode += "<div class=\"titreprevisions\">";
    htmlCode += "<h3>Prévisions à " + document.getElementById("id_nombrejours").options[document.getElementById("id_nombrejours").selectedIndex].text + " jours.</h3>";
    htmlCode += "</div>";
    htmlCode += "<div class=\"previsions\">";
    while(indexPrevisions < previsions.cnt) {
        htmlCode += "<div class=\"previsionsjour\">";
        htmlCode += "<div class=\"jour\">";
        htmlCode += "<span class=\"datejour\">" + DateFormatee(previsions.list[indexPrevisions].dt) + "</span>";
        htmlCode += "<span class=\"heurejour\">" + Heures(previsions.list[indexPrevisions].dt) + "</span>";
        htmlCode += "<span class=\"descriptionjour\">" + previsions.list[indexPrevisions].weather[0].description + "</span>";
        htmlCode += "<img class=\"iconjour\" src=\"http://openweathermap.org/img/w/" + previsions.list[indexPrevisions].weather[0].icon + ".png\">";
        htmlCode += "<span class=\"temperaturejour\">" + previsions.list[indexPrevisions].temp.day.toFixed(1) + "°C</span>";
        htmlCode += "<span class=\"pressionjour\">Pression : " + previsions.list[indexPrevisions].pressure.toFixed() + " hPa</span>";
        htmlCode += "<span class=\"humiditejour\">Humudité : " + previsions.list[indexPrevisions].humidity + "%</span>";
        htmlCode += "<span class=\"ventjour\">Vent : " + (previsions.list[indexPrevisions].speed * 3.6).toFixed() + " km/h</span>";
        if(indexDetails < details.cnt) {
            datePrevisionsPourTest = DatePourTest(previsions.list[indexPrevisions].dt);
            dateDetailsPourTest = DatePourTest(details.list[indexDetails].dt);
            if(dateDetailsPourTest == datePrevisionsPourTest) {
                htmlCode += "<button class=\"boutonafficherdetails\" type=\"button\" onclick=\"AfficherDetails('id_details" + indexPrevisions + "')\">+</button>";
            }
        }
        htmlCode += "</div>";
        if(indexDetails < details.cnt) {
            if(dateDetailsPourTest == datePrevisionsPourTest) {
                htmlCode += "<div id=\"id_details" + indexPrevisions + "\" class=\"details\">";
                while((indexDetails < details.cnt) && (dateDetailsPourTest == datePrevisionsPourTest)) {
                    htmlCode += "<div class=\"detailsjour\">";
                    htmlCode += "<span class=\"datedj\">" + DateFormatee(details.list[indexDetails].dt) + "</span>";
                    htmlCode += "<span class=\"heuredj\">" + Heures(details.list[indexDetails].dt) + "</span>";
                    htmlCode += "<span class=\"descriptiondj\">" + details.list[indexDetails].weather[0].description + "</span>";
                    htmlCode += "<img class=\"icondj\" src=\"http://openweathermap.org/img/w/" + details.list[indexDetails].weather[0].icon + ".png\">";
                    htmlCode += "<span class=\"temperaturedj\">" + details.list[indexDetails].main.temp.toFixed(1) + "°C</span>";
                    htmlCode += "<span class=\"pressiondj\">Pression : " + details.list[indexDetails].main.pressure.toFixed() + " hPa</span>";
                    htmlCode += "<span class=\"humiditedj\">Humudité : " + details.list[indexDetails].main.humidity + "%</span>";
                    htmlCode += "<span class=\"ventdj\">Vent : " + (details.list[indexDetails].wind.speed * 3.6).toFixed() + " km/h</span>";
                    htmlCode += "</div>";
                    indexDetails++;
                    if(indexDetails < details.cnt){
                        dateDetailsPourTest = DatePourTest(details.list[indexDetails].dt);
                    }
                }
                htmlCode += "<div class=\"fermerdetails\"><button class=\"boutonfermerdetails\" type=\"button\" onclick=\"FermerDetails('id_details" + indexPrevisions + "')\">Fermer</button></div>";
                htmlCode += "</div>";
            }
        }
        htmlCode += "</div>";
        indexPrevisions++;
    }
    htmlCode += "</div>";
    return(htmlCode);
}
