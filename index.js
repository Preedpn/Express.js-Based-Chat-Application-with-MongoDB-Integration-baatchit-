const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const path = require('path'); // Import Path module for working with file paths
const Message = require('./models/message.js'); // Import the Message model
const app = express(); // Initialize an Express app
const methodOverride = require('method-override');
const { ADDRGETNETWORKPARAMS } = require('dns');
app.use(methodOverride('_method'));





const port = 3000; // Define the port number
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory to look for EJS templates
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); // Connect to MongoDB
        console.log("Connection successful");

        // Save a sample chat message after successful connection
  
    } catch (err) {
        console.error("MongoDB Connection Error:", err); // Log any connection errors
    }
}

main(); // Call the function to connect to the database

// Define a simple route for the home page
app.get('/', (req, res) => {
    res.send('Hello World!'); // Responds with a simple message
});

// Define a route to display all chat messages
app.get("/chats", async (req, res) => {
    let chats = await Message.find(); // Fetch all messages from the database
    console.log(chats);
    res.render("index.ejs", { chats }); // Render 'index.ejs' and pass the fetched messages
});

// Define a route to show a form for creating a new message
app.get("/chats/new", (req, res) => {
    res.render("new.ejs"); // Render 'new.ejs' template
});
app.post("/chats", async (req, res) => {
    let { from, to, message } = req.body; // Extract data from form
    let newMessage = new Message({ from, to, message, date: new Date() });

    await newMessage.save(); // Save to MongoDB
    res.redirect("/chats"); // Redirect to chats page
});

// Start the Express server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // Log the running server info
});
//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let msg=await Message.findById(id);
    res.render("edit.ejs",{msg});
});
//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message } = req.body; // ✅ Corrected field name
  
    let updatedChat = await Message.findByIdAndUpdate(
      id,
      { message: message }, // ✅ Correct field name
      { runValidators: true, new: true }
    );
  
    console.log(updatedChat);
    res.redirect("/chats");
  });
  //destroy route
  app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteChat=await Message.findOneAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
  });
  
