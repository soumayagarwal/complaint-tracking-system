const Ticket = require("../models/Ticket");

const getStats = async (req, res) => {
    const totalTickets = await Ticket.countDocuments();

    const openTickets = await Ticket.countDocuments({
        status: "Open"
    });

    const inProgressTickets = await Ticket.countDocuments({
        status: "In Progress"
    });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const resolvedToday = await Ticket.countDocuments({
        status: "Resolved",
        resolvedAt: {
            $gte: startOfToday
        }
    });

    const categoryStats = await Ticket.aggregate([
        {
            $group: {
                _id: "$category",
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    const ticketsByCategory = {};

    categoryStats.forEach(item => {
        ticketsByCategory[item._id] = item.count;
    });

    const statusStats = await Ticket.aggregate([
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    const ticketsByStatus = {};

    statusStats.forEach(item => {
        ticketsByStatus[item._id] = item.count;
    });

    const ticketsOverTime = await Ticket.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt"
                    }
                },
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]);

    const formattedTicketsOverTime = ticketsOverTime.map(item => ({
        date: item._id,
        count: item.count
    }));


    return res.status(200).json({
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedToday,
        ticketsByCategory,
        ticketsByStatus,
        ticketsOverTime: formattedTicketsOverTime
    });
};

module.exports = {
    getStats
};