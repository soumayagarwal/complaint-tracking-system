const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    ticketNumber: {type: String, unique: true},
    title: {type: String, required: true},
    category: {type: String, enum: ['Hardware','Software','Billing','Network','Other'], required: true},
    priority: {type: String, enum: ['Low','Medium','High'], required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['Open','In Progress','Resolved'], default: "Open"},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resolvedAt: {type: Date}
    
}, {timestamps: true}
);

const Ticket = mongoose.model("Ticket",ticketSchema);

module.exports = Ticket;