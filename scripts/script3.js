var x_timer;
var ip ='';
var geo ='';

$('#search').bind("keyup blur", function (event){

var exclud = [13,27,37,38,39,40];
clearTimeout(x_timer);


	x_timer = setTimeout(function(){
	if (exclud.indexOf(event.which) === -1) {
		
		
		url = 'https://crossorigin.me/http://sg.media-imdb.com/suggests/c/'+ $('#q').val()+'.json';
		var referrer = "http://www.imdb.com/";
		$.ajax({
		  url: url,
		  jsonp: 'imdb$'+ $('#q').val(),
		  dataType: "jsonp",
		  headers: {'X-Alt-Referer': referrer },
		  beforeSend:
			function(data){
			  $('#sounds').empty();
			},
		  success: function(data){
          $('#sounds').html('')
          var items = [];
		  var i=0;
          $.each(data, function(key, val){
            items.push("<div id='tracks_list'><li class='row-fluid'>"+check(val.artwork_url)+"<a class='go col-md-9' data-index='"+i+"' data-artist='"+val.l+"' data-title='"+val.title+ "' data-url=" + val.stream_url + " href='javascript:void();'><h2>"+val.l+"</h2>\
            <span class='plays'>" + val.user.username +   " -  <b>" + msToTime(val.duration)  +  "</b></span></a></li></div>");
          i++;
		  });
          $('#sounds').html(items.join(' '));
          trackClick();

        }
		});
		
		




}
}, 300);
});



window.onload = function() {
  document.getElementById("q").focus();
};
