const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

main().then(() => {
      console.log("connection succesfull");
      })
      .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find();
        console.log(chats); // To see the fetched data
        res.render("index.ejs", { chats: chats }); // Pass 'chats' to the view
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching chats.");
    }
});

app.get("/chats/new", async (req, res) => {
    try {
        let chats = await Chat.find();
        console.log(chats); // To see the fetched data
        res.render("new.ejs", { chats: chats }); // Pass 'chats' to the view
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching chats.");
    }
});

app.post("/chats", (req,res) => {
      let {from, to, message} = req.body;
      let newChat = new Chat ({
            from : from,
            to : to,
            message : message,
            created_at : new Date()
      });
      
      newChat.save().then((res) => {
        console.log("chat was saved");
      }).catch((err) => {
        console.log(err);
      });
      res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req,res) => {
    let {id} = (req.params);
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})

app.put("/chats/:id", async (req,res)=> {
    let {id} = req.params;
    let {message : newMessage} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {message : newMessage}, {runValidators : true, new : true});
    console.log(updatedChat);
    res.redirect("/chats");
});

app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
})

app.get("/", (req,res) => {
      res.send("root is working");
});

app.listen(3000, () => {
      console.log("server is listening");
});

