const fs = require('fs');
const http = require('http');
const express = require("express");
const app = express();
const server = http.createServer(app);


console.log("HTMX-demo backend init");

//simple
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
    const html = "<div class='response'>Wow! " + rand + "</div>";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
})

//chat
app.get("/chatView", async (req, res) => { //form creator
    app.set('view engine', 'pug');
    console.log("Requesting chat view ... ");
    res.render('chatView', { 
      title: 'HTMX-demo Chat', 
      topMsg:"HTMX-demo by GetSOME"
    });
})
const writeToFile = async (nick,content,fileName) => {
    let response = {msg:nick + ": " + content}
    await fs.appendFile(fileName, nick + ": " + content + "\n", err => {
        if (err) {
            response = [{msg:"Error writing:" + content}]
            console.error(err);
        }
        // file written successfully
        console.log("[WORKER] Wrote:" + content)    
         
    });
    return response;
}

const readTextFile = async (fileName) => {
    let data;
    try {
        data = await fs.readFileSync(fileName, 'utf8');
        console.log(data);
        const _messages = data.split("\n")
        const messages = _messages.map(
            (onemsg,i) => "<p class='row-"+i+"'>" + onemsg + "</p>"
        ) 
        return messages.join('');
    } catch (err) {
        console.error(err);
    }
}

app.get("/write", async (req, res) => {
    //hx-swap="beforeend" for appending

    const content = req.query.content
    const nick = req.query.nick

    const fileName = './chat.txt'
    const data = await writeToFile(nick,content,fileName);
    const chatFile = await readTextFile(fileName);

    console.log(data);
    console.log("HTMX chat request");
    const rand = Math.floor(Math.random() * 10000000)
    const html = "<div id='"+rand+"' class='response'>" + chatFile + "</div>";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
});
app.get("/read", async (req, res) => {
    const fileName = './chat.txt' 
    const chatFile = await readTextFile(fileName);

    console.log("HTMX chat request");
    const rand = Math.floor(Math.random() * 10000000)
    const html = "<div id='"+rand+"' class='response'>" + chatFile + "</div>";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
});



server.listen(3000, () => {
    console.log('listening on *:3000');
    console.log("http://localhost:3000/view");
});