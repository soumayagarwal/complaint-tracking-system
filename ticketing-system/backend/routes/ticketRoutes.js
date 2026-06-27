const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
    createTicket,
    getTicketById,
    getTickets,
    updateTicketStatus,
    changeTicketCategory,
    deleteTicket
} = require("../controllers/ticketController");
const {
    sendMessage,
    getMessages
} = require("../controllers/messageController");
const { route } = require("./authRoutes");

const router = express.Router();

router.get(
    "/",
    protect,
    getTickets
);
router.post("/",protect,createTicket);
router.patch(
    "/:id/status",
    protect,
    updateTicketStatus
);
router.patch(
    "/:id/category",
    protect,
    changeTicketCategory
);
router.post(
    "/:id/messages",
    protect,
    sendMessage
);
router.get(
    "/:id/messages",
    protect,
    getMessages
);
router.delete(
    "/:id",
    protect,
    deleteTicket
);
router.get(
    "/:id",
    protect,
    getTicketById
);

module.exports = router;