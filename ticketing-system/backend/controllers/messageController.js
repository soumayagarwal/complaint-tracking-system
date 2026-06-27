const Ticket = require("../models/Ticket");
const Message = require("../models/Message");

const sendMessage = async (req,res) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if(!ticket){
        return res.status(404).json({
            error: "Ticket does not exist."
        });
    }

    if(req.user.role !== "admin" && !ticket.createdBy.equals(req.user._id)){
        return res.status(403).json({
            error: "Access denied."
        });
    }

    const {text} = req.body;

    if(!text || !text.trim()){
        return res.status(400).json({
            error: "Message text is required."
        });
    }

    const message = new Message({
        ticketId,
        senderId: req.user._id,
        senderRole: req.user.role,
        text
    });

    await message.save();
    await message.populate("senderId", "name role");

    return res.status(201).json({
        message: {
            id: message._id,
            ticketId: message.ticketId,
            sender: {
                id: message.senderId._id,
                name: message.senderId.name,
                role: message.senderId.role
            },
            text: message.text,
            timestamp: message.createdAt
        }
    });
};

const getMessages = async (req,res) => {
    const ticketId = req.params.id;
    const { since } = req.query;
    const ticket = await Ticket.findById(ticketId);

    if(!ticket){
        return res.status(404).json({
            error: "Ticket not found."
        });
    }

    if(req.user.role !== "admin" && !ticket.createdBy.equals(req.user._id)){
        return res.status(403).json({
            error: "Access denied."
        });
    }

    const filter = {
        ticketId
    };

    if (since) {
        filter.createdAt = {
            $gt: new Date(since)
        };
    }

    const messages = await Message.find(filter)
    .populate("senderId", "name role")
    .sort({ createdAt: 1 });

    const formattedMessage = messages.map((msg) => ({
        id: msg._id,
        ticketId: msg.ticketId,
        sender: {
            id: msg.senderId._id,
            name: msg.senderId.name,
            role: msg.senderId.role
        },
        text: msg.text,
        timestamp: msg.createdAt
    }));

    return res.status(200).json({
        messages: formattedMessage
    });

};

module.exports = {
    sendMessage,
    getMessages
}