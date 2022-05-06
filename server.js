const http = require("http");
const os = require("os");
const fs = require("fs");
const PORT = 4000;

// Create server
const server = http.createServer((req, res) => {
  console.log("The url path", req.url);
   const {url} = req;

  // For home/index (/) route
  if(url==="/") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    fs.readFile('./pages/index.html', (err, data) => {
      if(err) {
        console.log("Error in reading index.html file", err);
        return res.end("Something went wrong.")    //We return the res.end() method so the application doesn't crash but shows our error message on the frontend
      }
      res.write(data);
      res.end();
    })
  } 
  // For /about route
  else if (url === "/about") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./pages/about.html', (err, data) => {
      if(err) {
        console.log("Error in reading about.html file", err);
        return res.end("Something went wrong.");  //We return the res.end() method so the application doesn't crash but shows our error message on the frontend
      }
      res.write(data);
      res.end()
    })
  } 
  // For /sys route
  else if (url === "/sys") {
      let data = {
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        numberOfCPUS: os.cpus().length,
        networkInterfaces: os.networkInterfaces(),
        uptime: os.uptime(),
      };
      //To convert the data to JSON format
      data = JSON.stringify(data);
      // Create or rewrite the file and save the data in osinfo.json using the asynchronous method writeFile
      fs.writeFile("osinfo.json", data, (err) => {
        if (err) throw err;
        console.log("File has been saved");
      });
      // Could also be done like this
      // res.statusCode = 201;
      // res.setHeader('Content-Type', 'text/plain');
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("Your OS info has been saved successfully!");
  } 
  // Any url route that is not among be the 3 (home, about or sys) return the 404 page
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    // Read the 404 html page and send it back to the frontend.
    fs.readFile('./pages/404.html', (err, data) => {
      if(err) {
        console.log("Error in reading 404.html file", err);
        return res.end("Something went wrong.");  //We return the res.end() method so the application doesn't crash but shows our error message on the frontend
      }
      res.write(data);
      res.end()
    })    

  }

});
// Listening to server
server.listen(PORT, 'localhost', () => {
  console.log("Server listening on PORT ", PORT);
});
