require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");

const User = require("./models/User");
const Ticket = require("./models/Ticket");
const Message = require("./models/Message");

const seedDatabase = async () => {
    await connectDB();

    await Message.deleteMany({});
    await Ticket.deleteMany({});
    await User.deleteMany({});

    const adminPassword = await bcrypt.hash("admin123",10);
    const alicePassword = await bcrypt.hash("password123",10);
    const bobPassword = await bcrypt.hash("password123",10);

    const users = await User.insertMany([
        {
            name: "Admin User",
            email: "admin@support.com",
            passwordHash: adminPassword,
            role: "admin"
        },
        {
            name: "Alice Johnson",
            email: "alice@example.com",
            passwordHash: alicePassword,
            role: "customer"
        },
        {
            name: "Bob Smith",
            email: "bob@example.com",
            passwordHash: bobPassword,
            role: "customer"
        }
    ]);

    const today = new Date();
    const daysAgo = (days) => {
        const date = new Date(today);
        date.setDate(today.getDate() - days);
        return date;
    };

    const ticketData = [
        {
            ticketNumber: "TKT-001",
            title: "Laptop screen flickering",
            category: "Hardware",
            priority: "High",
            description: "Laptop display flickers randomly while working for several minutes.",
            status: "Resolved",
            createdBy: users[1]._id,
            createdAt: daysAgo(6),
            updatedAt: daysAgo(6),
            resolvedAt: daysAgo(5)
        },

        {
            ticketNumber: "TKT-002",
            title: "Unable to connect to office WiFi",
            category: "Network",
            priority: "Medium",
            description: "The office WiFi disconnects every few minutes during work hours.",
            status: "In Progress",
            createdBy: users[2]._id,
            createdAt: daysAgo(5),
            updatedAt: daysAgo(4)
        },

        {
            ticketNumber: "TKT-003",
            title: "Cannot login to employee portal",
            category: "Software",
            priority: "High",
            description: "The portal keeps showing invalid credentials despite correct password.",
            status: "Open",
            createdBy: users[1]._id,
            createdAt: daysAgo(4),
            updatedAt: daysAgo(4)
        },

        {
            ticketNumber: "TKT-004",
            title: "Incorrect billing amount",
            category: "Billing",
            priority: "Medium",
            description: "The latest invoice contains incorrect billing charges for this month.",
            status: "Resolved",
            createdBy: users[2]._id,
            createdAt: daysAgo(3),
            updatedAt: daysAgo(2),
            resolvedAt: daysAgo(1)
        },

        {
            ticketNumber: "TKT-005",
            title: "VPN connection keeps failing",
            category: "Network",
            priority: "High",
            description: "Unable to establish VPN connection while working remotely.",
            status: "Open",
            createdBy: users[1]._id,
            createdAt: daysAgo(2),
            updatedAt: daysAgo(2)
        },

        {
            ticketNumber: "TKT-006",
            title: "Need Microsoft Office installation",
            category: "Software",
            priority: "Low",
            description: "New office laptop requires Microsoft Office installation.",
            status: "In Progress",
            createdBy: users[2]._id,
            createdAt: daysAgo(1),
            updatedAt: daysAgo(1)
        },

        {
            ticketNumber: "TKT-007",
            title: "Keyboard keys not responding",
            category: "Other",
            priority: "Low",
            description: "Several keys on the laptop keyboard have stopped responding.",
            status: "Open",
            createdBy: users[1]._id,
            createdAt: daysAgo(0),
            updatedAt: daysAgo(0)
        }
    ];

    const tickets = await Ticket.insertMany(ticketData);

    const messageData = [
        // TKT-001
        {
            ticketId: tickets[0]._id,
            senderId: users[1]._id,
            senderRole: "customer",
            text: "My laptop screen keeps flickering every few minutes."
        },
        {
            ticketId: tickets[0]._id,
            senderId: users[0]._id,
            senderRole: "admin",
            text: "We'll check the graphics driver. Have you updated it recently?"
        },
        {
            ticketId: tickets[0]._id,
            senderId: users[1]._id,
            senderRole: "customer",
            text: "No, I haven't updated it yet."
        },
        {
            ticketId: tickets[0]._id,
            senderId: users[0]._id,
            senderRole: "admin",
            text: "Please update it and restart the laptop. The issue should be resolved."
        },

        // TKT-002
        {
            ticketId: tickets[1]._id,
            senderId: users[2]._id,
            senderRole: "customer",
            text: "Office WiFi disconnects every few minutes."
        },
        {
            ticketId: tickets[1]._id,
            senderId: users[0]._id,
            senderRole: "admin",
            text: "Does it happen on every device or only your laptop?"
        },
        {
            ticketId: tickets[1]._id,
            senderId: users[2]._id,
            senderRole: "customer",
            text: "Only on my laptop."
        },
        {
            ticketId: tickets[1]._id,
            senderId: users[0]._id,
            senderRole: "admin",
            text: "We're checking your network adapter configuration."
        },

        // TKT-003
        {
            ticketId: tickets[2]._id,
            senderId: users[1]._id,
            senderRole: "customer",
            text: "I'm unable to log into the employee portal."
        },
        {
            ticketId: tickets[2]._id,
            senderId: users[0]._id,
            senderRole: "admin",
            text: "Are you receiving an invalid credentials message?"
        },
        {
            ticketId: tickets[2]._id,
            senderId: users[1]._id,
            senderRole: "customer",
            text: "Yes, even after resetting my password."
        },
        {
            ticketId: tickets[2]._id,
            senderId: users[0]._id,
            senderRole: "admin",
            text: "We'll investigate the authentication service and update you soon."
        }
    ];

    await Message.insertMany(messageData);

    console.log("Database seeded successfully.");

    await mongoose.connection.close();
    process.exit(0);
};

seedDatabase().catch((err) => {
    console.error(err);
    process.exit(1);
});