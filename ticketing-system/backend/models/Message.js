const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
{
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    senderRole: {
        type: String,
        enum: ["customer", "admin"],
        required: true
    },

    text: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
}
);

messageSchema.index({
    ticketId: 1,
    createdAt: 1
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;