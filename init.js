const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
      console.log("connection succesfull");
      })
      .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
      {
      from : "aman",
      to : "neha",
      message : "this is my 1st message",
      created_at : new Date()
      },

      {
      from : "rahul",
      to : "rocky",
      message : "kese ho mere dost",
      created_at : new Date()
      },

      {
      from : "shreyash",
      to : "gaurav",
      message : "lets start the 1st event",
      created_at : new Date()
      },

      {
      from : "gaurav",
      to : "shreyash",
      message : "lets start now!",
      created_at : new Date()
      },
];

Chat.insertMany(allChats);