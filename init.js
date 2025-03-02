const mongoose = require('mongoose');
const Message = require('./models/message');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
        console.log("✅ MongoDB Connected");

        let allChats = [
            { from: "Neha", to: "Priya", message: "Send me your notes", date: new Date() },
            { from: "Amit", to: "Rahul", message: "Are you coming to the party?", date: new Date() },
            { from: "Sara", to: "Maya", message: "Let's catch up this weekend!", date: new Date() },
            { from: "Vikram", to: "Rohan", message: "Don't forget to bring the charger.", date: new Date() },
            { from: "Anjali", to: "Ritu", message: "Call me when you're free.", date: new Date() },
            { from: "Karan", to: "Sameer", message: "Did you complete the project?", date: new Date() }
        ];

        let insertedMessages = await Message.insertMany(allChats);
        console.log("✅ Messages Inserted:", insertedMessages);
        mongoose.connection.close();
    } catch (err) {
        console.error("❌ MongoDB Error:", err);
    }
}

main();
