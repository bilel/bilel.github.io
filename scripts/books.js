var x_timer;
$('#search').bind("keyup blur", function (event){
var queryx = $('#q').val();
var exclud = [13,27,37,38,39,40];
clearTimeout(x_timer);

//if (event.keyCode != '13' && event.keyCode != '40' && event.keyCode != '39' && event.keyCode != '38' && event.keyCode != '37') {
	x_timer = setTimeout(function(){
	if (exclud.indexOf(event.which) === -1) {
    $.ajax({
	  url : "https://crossorigin.me/https://archive.org/advancedsearch.php?q=title:("+queryx+"^100)%20AND%20subject:(librivox)&fl%5B%5D=downloads&fl%5B%5D=format&fl%5B%5D=headerImage&fl%5B%5D=identifier&fl%5B%5D=subject&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=callback&save=yes#raw",
      //url: "https://api.soundcloud.com/tracks.json?" + $('#search').serialize(),
      dataType: 'json',
      beforeSend:
        function(data){
          $('#sounds').empty();
        },
      success:
        function(data){
          $('#sounds').html('')
          var items = [];
		  
          $.each(data, function(key, val){
				metame(val.identifier);
				console.log(data);
		  });
          $('#sounds').html(items.join(' '));


        }
    });
}
}, 300);
});
window.onload = function() {
  document.getElementById("q").focus();
};

function metame(book_id){
	
	var feedURL = 'https://archive.org/metadata/' + book_id + '&output=json&callback=?';
	
	$.getJSON(feedURL, function(data){
		

var extension = 'mp3';
var a = new RegExp('\\b' + myWord + '\\b','i');		
var dire = 	data.d1+'/'+data.dir+'/';
for(var i = 0; i < data.length; i++) {
    var obj = data[i];
	
	
	if(a.test(obj.format)){
		var down = dire+obj.original;
		items.push("<div id='tracks_list'><li class='row-fluid'><a class='go col-md-9' data-artist='"+obj.creator+"' data-title='"+obj.title+ "' data-url=" + down + " href='javascript:void();'><h2>"+obj.title+"</h2>\
            <span class='plays'>" + obj.album +   " -  <b>" + obj.length  +  "</b></span></a></li></div>");
		
	}
	

}
	});


}






