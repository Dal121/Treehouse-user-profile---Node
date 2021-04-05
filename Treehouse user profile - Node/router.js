 //  Handle HTTP route GET / :username i.e /chalkers
 var Profile = require("./profile.js");
 var renderer = require('./renderer.js');
var querystring = require('querystring')
 var commonHeaders = {'Content-Type': 'text/html'};
  
 function home(req, res) {
    // if url == '/' && GET
    if(req.url === '/') {
      if(req.method.toLowerCase() === 'get') {
          //show search
      
      //res.statusCode = 200;
      res.writeHead(200, commonHeaders);
      renderer.view('header', {}, res);
      renderer.view('search', {}, res);
      renderer.view('footer', {}, res);
      res.end();
      } else {
         // if url == '/' && POST
         //get post data from body
         req.on('data', function(postBody){        
        //redirect to /:username
         var query = querystring.parse(postBody.toString());
         res.writeHead(303, {'Location': '/' + query.username });
         res.end();
      });
      }
    } 
   
  }
  
   //  Handle HTTP route GET/:username ie /chalkers
  function user(req, res) {
    var username = req.url.replace('/', '');
    if (username.length > 0) {
      //res.statusCode = 200;
      res.writeHead(200, commonHeaders);
      renderer.view('header', {}, res);
        // get json from treehouse
      var studentProfile = new Profile(username);
      //on end
      studentProfile.on("end", function(profileJSON) {
        //show profile

        //store values we need
        var values = {
            avatarUrl: profileJSON.gravatar_url,
            username: profileJSON.profile_name,
            badges: profileJSON.badges.length,
            javascriptPoints: profileJSON.points.JavaScript 
        }
        //simple response
        renderer.view('profile', values, res);
        res.end('footer', {}, res);
        res.end();
      });
        //on error
      studentProfile.on("error", function(error){
          //show error
          renderer.view('error', {errorMessage: error.message}, res);
          renderer.view('search', {}, res);
          renderer.view('footer', {}, res);
          res.end();
      });
      
      
    }
  }

  module.exports.home = home;
  module.exports.user = user;