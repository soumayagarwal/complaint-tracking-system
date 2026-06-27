import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import StatusBadge from "../components/StatusBadge";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import toast from "react-hot-toast";

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();
    const role = user?.role;

    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        if (!dateString.includes('T')) return dateString;
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await api.get(`/tickets/${id}`);
                setTicket(response.data.ticket);
            } catch (err) {
                toast.error("Failed to load ticket!");
                navigate("/dashboard");
            } finally {
                setLoading(false);
            }
        };

        const loadMessages = async () => {
            try {
                const response = await api.get(`/tickets/${id}/messages`);
                setMessages(response.data.messages);
            } catch (err) {
                toast.error("Failed to load messages.");
            }
        }

        fetchTicket();
        loadMessages();
    }, [id, navigate]);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;

        try {
            const response = await api.patch(`/tickets/${id}/status`, {
                status: newStatus,
            });

            setTicket(response.data.ticket);
            toast.success("Status updated");
        } catch (err) {
            toast.error("Failed to update status!");
        }
    }

    const handleCategoryChange = async (e) => {
        const newCategory = e.target.value;

        try {
            const response = await api.patch(`/tickets/${id}/category`, {
                category: newCategory,
            });

            setTicket(response.data.ticket);
            toast.success("Category updated!");
        } catch (err) {
            toast.error("Failed to update category.");
        }
    };

    const handleMarkResolved = async () => {
        try {
            const response = await api.patch(`/tickets/${id}/status`, {
                status: "Resolved",
            });

            setTicket(response.data.ticket);
            toast.success("Ticket marked as resolved!");
        } catch (err) {
            toast.error("Couldn't update ticket.");
        }
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/tickets/${id}`);
            toast.success("Ticket deleted!");
            navigate("/dashboard");
        } catch (err) {
            toast.error("Failed to delete ticket.");
        }
    }


    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }
    if (!ticket) {
        return <div className="text-center mt-10">Ticket not found.</div>;
    }

    console.log(ticket);

    return (
        <>
            <Navbar />

            <div className="ticket_details flex justify-around items-start mt-10 px-10">
                <div className="ticket_info border p-5 min-w-75 rounded-lg shadow-sm">
                    <p className="mb-2"><strong>Ticket: </strong>{ticket.ticketNumber}</p>
                    <p className="mb-2"><strong>Title: </strong>{ticket.title}</p>

                    <p className="mb-2"><strong>Category: </strong>{ticket.category}</p>
                    {role === "admin" && (
                        <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <label className="text-sm text-gray-600 font-semibold block mb-1">Admin Control: Change Category</label>
                            <select name="status" value={ticket.category} onChange={handleCategoryChange} className="border border-gray-300 px-2 py-1 w-full rounded-md outline-none bg-white">
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Billing">Billing</option>
                                <option value="Network">Network</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    )}

                    <p className="my-4"><strong>Status: </strong><StatusBadge status={ticket.status} /></p>
                    {role === "admin" && (
                        <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <label className="text-sm text-gray-600 font-semibold block mb-1">Admin Control: Update Status</label>
                            <select name="status" value={ticket.status} onChange={handleStatusChange} className="border border-gray-300 px-2 py-1 w-full rounded-md outline-none bg-white">
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>
                    )}

                    <p className="mb-2"><strong>Priority: </strong>{ticket.priority}</p>
                    <p className="mb-2"><strong>Date: </strong>{formatDate(ticket.createdAt)}</p>

                    {role === "customer" && (
                        <div className="mt-4 pt-4 border-t flex flex-col gap-2">
                            {ticket.status!=="Resolved" && (
                                <button onClick={handleMarkResolved} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors w-full cursor-pointer">
                                    Mark as Resolved
                                </button>
                            )}

                            <button onClick={() => setShowDeleteModal(true)} className="bg-white border border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 rounded-md transition-colors w-full cursor-pointer">
                                Delete Ticket
                            </button>
                        </div>
                    )}

                    {role === "admin" && (
                        <div className="mt-4 pt-4 border-t flex flex-col gap-2">
                            <button onClick={() => setShowDeleteModal(true)} className="bg-white border border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 rounded-md transition-colors w-full cursor-pointer">
                                Delete Ticket
                            </button>
                        </div>
                    )}


                </div>

                <ChatBox ticket={ticket} messages={messages} setMessages={setMessages} />
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4">
                        <h2 className="text-xl font-bold mb-3 text-gray-800">Delete Ticket?</h2>
                        <p className="text-gray-600 mb-6 text-sm">
                            Are you sure you want to delete <span className="font-bold">{ticket.ticketNumber}</span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setShowDeleteModal(false)} 
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors cursor-pointer"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TicketDetail