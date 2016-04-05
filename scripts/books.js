var x_timer;
$('#search').bind("keyup blur", function (event){
var queryx = $('#q').val();
var exclud = [13,27,37,38,39,40];
clearTimeout(x_timer);

//if (event.keyCode != '13' && event.keyCode != '40' && event.keyCode != '39' && event.keyCode != '38' && event.keyCode != '37') {
	x_timer = setTimeout(function(){
	if (exclud.indexOf(event.which) === -1) {
    $.ajax({
		
	  url : "https://archive.org/advancedsearch.php",
      jsonp: "callback",
      dataType: 'jsonp',
	  type:"GET",
	  data: {
		 /*q:"title:("+queryx+")",
		 subject:"(librivox)",*/
		 	"q" : "title:("+queryx+ ") AND subject:(librivox ) mediatype:(audio) AND format:(MP3)",
			qin : "title:("+queryx+") AND subject:(librivox) mediatype:(audio) AND format:(MP3)",
			fl : "format,identifier,title",
			//wt : "json",
			rows : "50",
        //q: "select title,abstract,url from search.news where query=\"cat\"",
        output: "json"
    },
      beforeSend:
        function(data){
          $('#sounds').empty();
        },
      success:
        function(data){
          $('#sounds').html('');
          //var items = [];

//var a = new RegExp('\\b' + extension + '\\b','i');	
		  
          $.each(data.response.docs, function(key, val){
			  
			  
				metame(val.identifier);
				
			  
				//console.log(val.identifier);
				
		  });

          //$('#sounds').html(items.join(' '));

	//console.log(data);
        }
    });
}
}, 800);
});
window.onload = function() {
  document.getElementById("q").focus();
};

function metame(book_id){
	
	var feedURL = 'https://archive.org/metadata/' + book_id + '&output=json&callback=?';
	
	$.getJSON(feedURL, function(data){
		

	
var dire = 	data.d1+'/'+data.dir+'/';
//console.log(dire);
for(var i = 0; i < data.files.length; i++) {
    var obj = data.files[i];
	
			  var extension = 'MP3';
	if(obj.format=='128Kbps MP3'){
		var down = 'http://'+dire+obj.name;
		$('#sounds').append("<div id='tracks_list'><li class='row-fluid'><a class='go col-md-9' data-artist='"+obj.creator+"' data-title='"+obj.title+ "' data-url='" + down + "' href='javascript:void(0);'><h2>"+obj.title+"</h2>\
            <span class='plays'>" + obj.album +   " -  <b>" + obj.length  +  "</b></span></a></li></div>");
		
	}
	

}
		  trackClick();
	});


}


function trackClick(){
  $('.go').click(function(){
    var url= $(this).data('url') ;
    var title= $(this).data('title');
//    var artist = $(this).data('artist');
    $(this).addClass('playedSong');
    $('#navbar h2').html(title);
	var next = ($(this).data('index'))+1;
    var audioPlayer = document.getElementById('player');
  audioPlayer.src = url;
  audioPlayer.load();
  document.getElementById('player').play();
  document.title="Playing " + title;
  $(this).before(function() {
  $(".download").remove();
  $(this).prev('img').remove();
  return "<a class='download' href='"+url+"' target='_blank' download><img class='pull-right' src='http://www.alartec.com/media/arrow-icon_orange.png' width='100'></a>";
});
    return false;
  });
}

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





