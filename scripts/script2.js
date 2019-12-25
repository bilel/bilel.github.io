var x_timer;
$('#search').bind("keyup blur", function (event){

var exclud = [13,27,37,38,39,40];
clearTimeout(x_timer);

//if (event.keyCode != '13' && event.keyCode != '40' && event.keyCode != '39' && event.keyCode != '38' && event.keyCode != '37') {
	x_timer = setTimeout(function(){
	if (exclud.indexOf(event.which) === -1) {
    $.ajax({
      url: "https://api.soundcloud.com/tracks.json?" + $('#search').serialize(),
      dataType: 'json',
      beforeSend:
        function(data){
          $('#sounds').empty();
        },
      success:
        function(data){
          $('#sounds').html('')
          var items = [];
		  var i=0;
          $.each(data, function(key, val){
            items.push("<div id='tracks_list'><li class='row-fluid'>"+check(val.artwork_url)+"<a class='go col-md-9' data-index='"+i+"' data-artist='"+val.user.username+"' data-title='"+val.title+ "' data-url=" + val.stream_url + " href='javascript:void();'><h2>"+val.title+"</h2>\
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

var clientid = 'client_id=2010872379d388118fe90f01ace38d03';

function msToTime(duration) {
          var milliseconds = parseInt((duration%1000)/100)
              , seconds = parseInt((duration/1000)%60)
              , minutes = parseInt((duration/(1000*60))%60)
              , hours = parseInt((duration/(1000*60*60))%24);

          hours = (hours < 10) ? "0" + hours : hours;
          minutes = (minutes < 10) ? "0" + minutes : minutes;
          seconds = (seconds < 10) ? "0" + seconds : seconds;
          if(hours == "00")
            return minutes + ":" + seconds;
          else
            return hours + ":" + minutes + ":" + seconds;
        }

function trackClick(){
  $('.go').click(function(){
    var url= $(this).data('url') +"?"+ clientid;
    var title= $(this).data('title');
    var artist = $(this).data('artist');
    $(this).addClass('playedSong');
    $('#navbar h2').html(title);
	var next = ($(this).data('index'))+1;
    var audioPlayer = document.getElementById('player');
  audioPlayer.src = url;
  audioPlayer.load();
  document.getElementById('player').play();
	$("#player").bind("ended", function(){
	playnext(next);
	});
  document.title="Playing " + title;
  $(this).before(function() {
  $(".download").remove();
  $(this).prev('img').remove();
  return "<a class='download' href='"+url+"' target='_blank' download><i style="color:#fff;" class="fa fa-arrow-down"></i></a>";
});
    return false;
  });
}
function playnext(id){
var next = id+1;
var url = $('a[data-index="'+id+'"]').data('url') +"?"+ clientid;
var title= $('a[data-index="'+id+'"]').data('title');
$('a[data-index="'+id+'"]').addClass('playedSong');
$('#navbar h2').html(title);
var audioPlayer = document.getElementById('player');
  audioPlayer.src = url;
  audioPlayer.load();
$("#player").bind("ended", function(){
	playnext(next);
	});
  document.title="Playing " + title;	
  document.getElementById('player').play();
}
function check(kima){
if (kima === undefined || kima === null) {
return '';
} else {
return '<img class="pull-right" src="'+kima+'"/>';
}
}
/*$( "#pause" ).click(function() {
 $("#player").trigger('pause');
});*/
$('#pause').click(function() {
var audioPlayer = document.getElementById('player');
  if (audioPlayer.paused == false) {
      audioPlayer.pause();
	  $( ".icon" ).remove;
      $( ".icon" ).html('<i class="fa fa-play"></i>');
  } else {
      audioPlayer.play();
	  $( ".icon" ).remove;
      $( ".icon" ).html('<i class="fa fa-pause"></i>');
  }
});
/*$("#volume").slider({
    value : 75,
    step  : 1,
    range : 'min',
    min   : 0,
    max   : 100,
    slide : function(){
        var value = $("#volume").slider("value");
        document.getElementById("#player").volume = (value / 100);
    }
});*/
