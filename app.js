const http = require('http');
const express = require("express");
const app = express();
const server = http.createServer(app);


console.log("HTMX-demo backend init");

app.get("/view", async (req, res) => { //form creator
    app.set('view engine', 'pug');
    console.log("Requesting main view ... ");
    res.render('mainView', { 
      title: 'HTMX-demo', 
      topMsg:"HTMX-demo by GetSOME"
    });
})

app.get("/HTMX_resp", async (req, res) => { //form creator
    //app.set('view engine', 'pug');
    // var html = fs.readFileSync(path.join(__dirname, "./form_creator.html"), "utf8");
    console.log("HTMX request");
    const rand = Math.floor(Math.random() * 10000000)
    const html = "<div id='response'>Wow! " + rand + "</div>";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
})

server.listen(3000, () => {
    console.log('listening on *:3000');
    console.log("http://localhost:3000/view");
});