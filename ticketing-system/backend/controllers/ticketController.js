const Ticket = require("../models/Ticket");
const Message = require("../models/Message");

const createTicket = async (req,res) => {
    const { title, category, priority, description } = req.body;

    const count = await Ticket.countDocuments();
    const ticketNumber = `TKT-${String(count + 1).padStart(3, "0")}`;

    const ticket = new Ticket({
        ticketNumber,
        title,
        category,
        priority,
        description,
        createdBy: req.user._id
    });

    await ticket.save();

    res.status(201).json({
        message: "Ticket created successfully.",
        ticket
    });
};

const getTicketById = async (req,res) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    console.log(ticket);

    if(!ticket){
        return res.status(404).json({
            error: "Ticket not found."
        });
    }


    if (req.user.role !== "admin" && !ticket.createdBy.equals(req.user._id)) {
        return res.status(403).json({
            error: "Access denied."
        });
    }

    res.json({
        ticket
    });
};

const getTickets = async (req,res) => {
    const {
        status,
        priority,
        category,
        search,
        page=1,
        limit=10
    } = req.query;

    const filter = {};

    if (req.user.role === "customer") {
        filter.createdBy = req.user._id;
    }

    if (status) {
        filter.status = status;
    }

    if (priority) {
        filter.priority = priority;
    }

    if (category) {
        filter.category = category;
    }

    if (search) {
        filter.title = {
            $regex: search,
            $options: "i"
        };
    }

    const total = await Ticket.countDocuments(filter);

    const skip = (page - 1) * limit;

    const tickets = await Ticket.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

    const pages = Math.ceil(total / limit);

    return res.status(200).json({
        tickets,
        total,
        page: Number(page),
        pages
    });
};

const updateTicketStatus = async (req,res) => {
    const ticketId = req.params.id;
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

    const {status} = req.body;

    const validStatuses = [
        "Open",
        "In Progress",
        "Resolved"
    ];

    if(!validStatuses.includes(status)){
        return res.status(400).json({
            error: "Invalid request."
        });
    }

    if (ticket.status === status) {
        return res.status(400).json({
            error: "Ticket already has this status."
        });
    }

    ticket.status = status;
    if (status === "Resolved") {
        ticket.resolvedAt = new Date();
    } else {
        ticket.resolvedAt = null;
    }

    await ticket.save();

    res.json({
        message: "Ticket status updated successfully.",
        ticket
    })
};

const changeTicketCategory = async (req,res) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if(!ticket){
        return res.status(404).json({
            error: "Ticket not found."
        });
    }

    if(req.user.role !== "admin"){
        return res.status(403).json({
            error: "Access denied."
        });
    }

    const {category} = req.body;

    const validCategories = [
        "Hardware",
        "Software",
        "Billing",
        "Network",
        "Other"
    ];

    if(!validCategories.includes(category)){
        return res.status(400).json({
            error: "Invalid request."
        });
    }

    ticket.category = category;
    
    await ticket.save();

    res.json({
        message: "Ticket category changed successfully.",
        ticket
    })
};

const deleteTicket = async (req,res) => {
    const ticketId = req.params.id;
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

    await Message.deleteMany({
        ticketId: ticket._id
    });

    await Ticket.findByIdAndDelete(ticketId);

    return res.status(200).json({
        message: "Ticket deleted successfully."
    });
};

module.exports = {
    createTicket,
    getTicketById,
    getTickets,
    updateTicketStatus,
    changeTicketCategory,
    deleteTicket
};