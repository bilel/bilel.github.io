var x_timer;

$('#search').bind("keyup blur", function (event){

var exclud = [13,27,37,38,39,40];
clearTimeout(x_timer);


	x_timer = setTimeout(function(){
	if (exclud.indexOf(event.which) === -1) {
	
		var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ $('#q').val()+'&units=metric&appid=2de143494c0b295cca9337e1e96b00e0';
		$('.var').empty();
	    $.get(url, function(data){
		  var temp = data.main.temp;
		  var winddir = degToCompass(data.wind.deg);
		  var icon = data.weather[0].icon;
		  
		$('.icon').attr("src","http://openweathermap.org/img/w/"+icon+".png");  
		$('.temp').html(temp);
		$('.wind').html(winddir);
		
		console.log(data);
		console.log(url);

      
    });

}
}, 300);
});

window.onload = function() {
  document.getElementById("q").focus();
};

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}
