$(document).ready(function() {
  // Activate hamburger menu and sidebar on mobile
  $(".button-collapse").sideNav();

  // Grab the articles as a json
  // $.getJSON("/articles", function(data) {
  //   // For each one
  //   for (var i = 0; i < data.length; i++) {
  //     // Display the apropos information on the page
  //     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  //   }
  // });

  $('#scrape-button').on('click', () => {
    $.getJSON('/scrape', () => console.log('scrape button pressed'));
  });

});