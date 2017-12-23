// using my own API key

const flickerAPI2 =
  "https://api.flickr.com/services/rest?" +
  "api_key=1bf2605a5de1ae211ed5985b71dd9aa1" +
  "&format=json&callback=?";

const flickerPhotoSearch = flickerAPI2 + "&method=flickr.photos.search&extras=views,owner_name";

$(document).ready(function() {

  // jquery action #1
  $("h1").click(function() {
    $("#dev").fadeToggle();
  });

  // jquery action #2 : main feature of the app
  // TODO: check why submit only and not on change
  $("#searchTerm").change($.debounce(250, function() {
    var searchTerm = $("#searchTerm").val();
    var url = flickerPhotoSearch + "&text=" + searchTerm ;

    $.getJSON(url)
    //this will also call jsonFlickrAPI()
      .fail(function(jqxhr, textStatus, error) {
        console.error(textStatus, error);
      });
  }));

  $("#btn").on('click', function() {
    var pageCount = 2;
    var searchTerm = $("#searchTerm").val();

    var url = flickerPhotoSearch + "&text=" + searchTerm + "&page=" + pageCount ;

    $.getJSON(url)
      .fail(function(jqxhr, textStatus, error) {
      console.error(textStatus, error);
    });

  });

  // to prevent the form from refreshing the page turns it blank which is the default behavior of the browser
  $('#search').submit(function(e){
    e.preventDefault();
  });
});

// helper methods
function jsonFlickrApi(data) {

  var photos = data.photos.photo; // taking all at once
  $('#results').html('');

  for (var i=0; i < photos.length; i++) {
    var photo = photos[i];
    console.log(photo);
    var url = photoURL(photo); // returns the url of each photo

    var photoEl = $(`<div style="background-image:url(${url})"><div>${photo.views}<br/>${photo.ownername}</div></div>`)

    $('#results').append(photoEl); // on every loop

  }
}

// to produce an URL for every image that will later gets passed into background-image url attribute of every single photo

function photoURL(photo) {
  return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
} // https://www.flickr.com/services/api/misc.urls.html
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
