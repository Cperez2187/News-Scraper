// **************************************************
// Routes for Home page (index.handlebars)
// **************************************************

// Dependencies
// ==============================
const Article = require('../models/Article');
const request = require('request');
const cheerio = require('cheerio');


// Routes
// ==========================
module.exports = app => {

  // Renders default layout of home(index) page
  app.get('/', (req, res) => {

    // Grab every doc in the Articles array
    Article.find({}, function(error, articles) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Or send the articles to the index as a json object
      else {
        console.log('articles', articles);
        res.render('index', { articles });
      }
    });
    
  });
  
  app.get('/scrape', (req, res) => {
    // Make a request call to grab the HTML body from the site of your choice
    request("http://www.theverge.com", function(error, response, html) {
    
      let $ = cheerio.load(html);
    
      // Select each element in the HTML body from which you want information.
      // NOTE: Cheerio selectors function similarly to jQuery's selectors,
      // but be sure to visit the package's npm page to see how it works
      $(".c-entry-box--compact").each(function(i, element) {

        // create empty data object to hold data
        let data = {};
        
        // Add the link, title, and image of every article to the data object
        data.link = $(element).find('.c-entry-box--compact__title').find('a').attr('href');
        data.title = $(element).find('.c-entry-box--compact__title').find('a').text();
        data.image = $(element).find('img').attr('src');

        // Create a new of entry of the Article model and pass in the data object
        let entry = new Article(data);
    
        // Save the entry into the database(Article collection)
        entry.save((err, data) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('Insert successful');
            // console.log(JSON.stringify(data));
          }
        });

        if (i === 20) {
          console.log('Scrape complete.');
          return false;
        }
      });
    
    }); 
  });
};
