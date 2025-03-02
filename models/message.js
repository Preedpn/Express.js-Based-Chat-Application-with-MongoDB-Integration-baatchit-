const mongoose = require('mongoose');

// Define the schema
const messageSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, 'Sender (from) is required'],
        trim: true,
        minlength: [3, 'Sender (from) must be at least 3 characters long']
    },
    to: {
        type: String,
        required: [true, 'Recipient (to) is required'],
        trim: true,
        minlength: [3, 'Recipient (to) must be at least 3 characters long']
    },
    message: {
        type: String,
        required: [true, 'Message content is required'],
        maxlength: [500, 'Message cannot exceed 500 characters']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create the model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
