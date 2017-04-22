if (sUnit == false) {
  var sUnit = "s";
} else {
  var sUnit = "m";
}
if (kph == false) {
  var kph = "no";
} else {
  var kph = "yes";
}

setInterval(function() {
  GetXmlFeed(sCityCodes);
}, refreshrate);

function reload_js(src) {
  $('script[src="' + src + '"]').remove();
  $('<script>').attr('src', src).appendTo('head');
}

function GetXmlFeed(code) {
  console.log("updating weather");
  var code = sCityCodes;
  var sc = document.createElement("script");
  var mainsc = 'http://wxdata.weather.com/wxdata/mobile/mobagg/' + code + '.js?key=2227ef4c-dfa4-11e0-80d5-0022198344f4&units=' + sUnit + '&locale=' + language + '&cb=XmlFeedCB';
  sc.src = mainsc;
  reload_js(mainsc);
}

function XmlFeedCB(js) {
  console.log("show data");
  json = js[0]; //json is XML
  Showdata();
}


function Showdata() {
  var imagelocation = "weather/icon/";
  if (wwidget == true) {
    var imagelocation = "weather/iconb/";
  }
  var imageextention = ".png"
  var dailyinfo = json.DailyForecasts; // daily forecast
  var hourlyinfo = json.HourlyForecasts; // hourly forecast
  var narrativeinfo = json.NarrativeForecasts; // Narrative forecast
  var raininfo = json.WhenWillItRain;
  var sunriseset = json.SunRiseSet;
  var hirad = json.HiradObservation;

  sunrise = JSON.stringify(sunriseset[0].rise);
  sunset = JSON.stringify(sunriseset[0].set);
  sunrise = sunrise.replace(/"/g, "");
  sunset = sunset.replace(/"/g, "");
  // convert sunrise from UNIX time
  var timestamp1 = sunrise;
  UX2 = new Date(timestamp1 * 1000),
    hours = (UX2.getHours() < 10 ? '0' + UX2.getHours() : UX2.getHours()),
    minutes = (UX2.getMinutes() < 10 ? '0' + UX2.getMinutes() : UX2.getMinutes()),
    seconds = (UX2.getSeconds() < 10 ? '0' + UX2.getSeconds() : UX2.getSeconds()),
    sunrise = hours + ':' + minutes;

  if (TwentyFourHourClock == "true") {
    hours = hours % 12;
    if (hours == 0) {
      hours += 12;
    }
    sunrise = hours + ':' + minutes;
  }
  // convert sunset from UNIX time
  var timestamp = sunset;
  UX1 = new Date(timestamp * 1000),
    hours = (UX1.getHours() < 10 ? '0' + UX1.getHours() : UX1.getHours()),
    minutes = (UX1.getMinutes() < 10 ? '0' + UX1.getMinutes() : UX1.getMinutes()),
    seconds = (UX1.getSeconds() < 10 ? '0' + UX1.getSeconds() : UX1.getSeconds()),
    sunset = hours + ':' + minutes;

  if (TwentyFourHourClock == "true") {
    hours = hours % 12;
    if (hours == 0) {
      hours += 12;
    }
    sunset = hours + ':' + minutes;
  }



  daily = JSON.stringify(dailyinfo[0]);
  hourly = JSON.stringify(hourlyinfo[0]);
  narrative = JSON.stringify(narrativeinfo[0]);

  if (daily.day == undefined) {
    var tod = dailyinfo[0].night;
  } else {
    var tod = dailyinfo[0].day;
  }

  var numofdays = 4;
  var daysize = "30"; //set forecast image size
  var iconlocation = "weather/icon/"; //what folder to pull from
  if (wwidget == true) {
    var iconlocation = "weather/iconb/";
  }
  var iconextention = ".png"; //image extentions
  var degrees = "&deg;";

  //begin forecast

  for (i = 0; i < numofdays; i++) {
    var count = i + 1;
    var dn = dailyinfo[count].day ? dailyinfo[count].day : dailyinfo[count].night;
    var da = new Date(dailyinfo[count].validDate * 1000);
    var ht = dailyinfo[count].maxTemp;
    var lt = dailyinfo[count].minTemp;
    document.getElementById("Day" + count).innerHTML = '<img width=' + daysize + ' src=' + iconlocation + dn.icon + iconextention + '>';
    document.getElementById("ForecastDay" + count).innerHTML = '<span>' + (sday[da.getDay()]) + '</span>'
    document.getElementById("Day" + count + "High").innerHTML = '<span>' + (ht + degrees + "/" + '<span class="lowtemp">' + lt + degrees) + '</span>' + '</span>'
    document.getElementById("Precip" + count).innerHTML = '<span>' + dn.pop + " %" + '</span>';
  }

  if (json.StandardObservation.wxIcon.value == undefined) {
    var icon = json.HiradObservation.wxIcon;
    var currentIcon = json.HiradObservation.wxIcon;
  } else {
    var icon = json.StandardObservation.wxIcon;
    var currentIcon = json.StandardObservation.wxIcon;
  }

  if (json.StandardObservation.wxIcon == "") {
    json.StandardObservation.wxIcon = "na"
  };
  if (icon.length == 0) {
    icon = "dunno";
  }
  var HourlyIcon = imagelocation + icon + imageextention;

  document.getElementById("HourlyIcon").innerHTML = '<img width="60" src=' + HourlyIcon + '>'

  var hiToday = JSON.stringify(+dailyinfo[0].maxTemp + degrees); //Today hi
  hiToday = hiToday.replace(/"/g, "");
  if (hiToday == "NaN" + degrees) {
    hiToday = json.StandardObservation.temp + degrees;
  }
  document.getElementById("HighToday").innerHTML = '<span>' + "" + (hiToday) + "/" + '</span>'

  var loToday = JSON.stringify("" + dailyinfo[0].minTemp + degrees); //Today lo
  loToday = loToday.replace(/"/g, "");
  document.getElementById("LowToday").innerHTML = '<span>' + "" + (loToday) + '</span>'


  var ds = dailyinfo[0].day ? dailyinfo[0].day : dailyinfo[0].night;
  document.getElementById("DescToday").innerHTML = '<span>' + (textstringlater + ds.phrase) + '</span>'

  document.getElementById("TempNow").innerHTML = '<span>' + ('' + json.StandardObservation.temp) + '</span>'

  var realFeel = JSON.stringify(hourlyinfo[0].feelsLike + degrees); //Current Temp
  realFeel = realFeel.replace(/"/g, "");
  document.getElementById("RealFeel").innerHTML = '<span>' + (feeltxt + hirad.feelsLike) + '</span>'

  var Humidity = JSON.stringify(humidtxt + hourlyinfo[0].humid); //Humidity
  Humidity = Humidity.replace(/"/g, "");
  document.getElementById("Humidity").innerHTML = '<span>' + ('' + Humidity) + '</span>'

  var WindSpeed = JSON.stringify("" + hourlyinfo[0].wSpeed); //Wind Speed
  WindSpeed = WindSpeed.replace(/"/g, "");

  if (kph == "yes") {
    conversion = 1.609344
    kphv = WindSpeed * conversion;
    kphv = Math.round(kphv * 100) / 100;
    kphv = Math.round(kphv);
    document.getElementById("WindSpeed").innerHTML = '<span>' + (windtxt + kphv + " Kph") + '</span>'
  } else {
    document.getElementById("WindSpeed").innerHTML = '<span>' + (windtxt + WindSpeed + " Mph") + '</span>'
  }

  var WindDirection = JSON.stringify(hourlyinfo[0].wDirText); //Wind Direction
  WindDirection = WindDirection.replace(/"/g, "");
  if (WindDirection.length < 1) {
    WindDirection = "No Wind"
  }
  document.getElementById("WindDirection").innerHTML = '<span>' + ('' + WindDirection) + '</span>'

  var UV = JSON.stringify("UV:" + hourlyinfo[0].uv); //UV
  UV = UV.replace(/"/g, "");
  document.getElementById("UV").innerHTML = '<span>' + ('' + UV) + '</span>'

  var dew = JSON.stringify("" + hourlyinfo[0].dew + "&#176"); //dew

  dew = dew.replace(/"/g, "");
  document.getElementById("dew").innerHTML = '<span>' + ('Dew: ' + dew) + '</span>'

  var City = JSON.stringify(json.Location.city); //City
  City = City.replace(/"/g, "");
  document.getElementById("City").innerHTML = '<span>' + ('' + City) + '</span>'


  try {
    var dsc = json.HiradObservation.text;
    if (dsc == " ") {
      document.getElementById("HourlyDesc").innerHTML = "<span>" + json.StandardObservation.text + "</span>";
    } else {
      document.getElementById("HourlyDesc").innerHTML = "<span>" + json.HiradObservation.text + "</span>";
    }
  } catch (C) {
    document.getElementById("HourlyDesc").innerHTML = "<span>" + json.StandardObservation.text + "</span>"
  }

  document.getElementById("RainInfo").innerHTML = '<span>' + (raininfo.standardPhrase) + '</span>'

  var Sunrise = sunrise;
  document.getElementById("Sunrise").innerHTML = '<span>' + (sunrisetxt + Sunrise) + "am" + '</span>'

  var Sunset = sunset;
  document.getElementById("Sunset").innerHTML = '<span>' + (sunsettxt + Sunset) + "pm" + '</span>'

  var Rude = ["Oh shit a tornado", "Damn tropical storm", "Run its a hurricane", "Fucking thunderstorm", "Fuck its a thunderstorm", "Fuck its snowing", "Fucking sleet", "Fucking sleet", "Fuck it's drizzling", "Fuck it's drizzling", "Fucking freezing rain", "Fuck it's raining", "Fuck it's raining", "Fucking flurries", "Fucking light snow", "Fuck it's snowing", "Fuck it's snowing", "Fucking hailing", "Fuck it's sleeting", "Fucking dusty out here", "Fucking foggy", "Fucking hazy", "Fucking smoky", "WTF it's blustery", "Windy as fuck", "Cold as fuck", "It's fucking cloudy", "It's fucking mostly cloudy", "It's fucking mostly cloudy", "It's fucking partly cloudy", "It's fucking partly cloudy", "It's fucking clear", "It's fucking sunny outside", "It's Fucking fair", "It's Fucking fair", "It's Fucking sleeting", "Fuck it's hot", "Isolated fucking thunderstorms", "Scattered fucking thunderstorms", "Scattered fucking thunderstorms", "Scattered fucking showers", "Heavy fucking snow", "Light fucking snow", "Heavy fucking snow", "It's Partly fucking cloudy", "It's Fucking thunderstorm", "It's fucking snowing", "It's a fucking thunderstorm", "blank"];

  document.getElementById('Rude').innerHTML = '<span>' + Rude[icon] + '</span>'

};

GetXmlFeed(true);
