
var my = require('./myModule.js');

var console = require('console');
var sys = { 'puts': console.log, 'debug': console.error },
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");
my_http.createServer(function(request,response){
  console.log(request.url);
  var my_path = url.parse(request.url).pathname;
  console.log(my_path);
  if(my_path == '/')my_path = '/home.html';
  var full_path = path.join(process.cwd(),my_path);
  console.log(full_path);
  filesys.exists(full_path,function(exists){
    if(!exists){
      response.writeHeader(404, {"Content-Type": "text/plain"});  
      response.write("404 Not Found\n");  
      response.end();
    }
    else{
      filesys.readFile(full_path, "binary", function(err, file) {  
           if(err) {  
               response.writeHeader(500, {"Content-Type": "text/plain"});  
               response.write(err + "\n");  
               response.end();  
          
           }  
         else{
          response.writeHeader(200);  
              response.write(file, "binary");  
              response.end();
        }
            
      });
    }
  });
}).listen(process.env.PORT || 3000);
sys.puts("Server started Running on " +(process.env.PORT || 3000)+ " at " + my.dateTime()); 