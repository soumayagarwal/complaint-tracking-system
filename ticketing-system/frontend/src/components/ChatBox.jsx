import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import { TbMessages } from "react-icons/tb";
import toast from "react-hot-toast";

const ChatBox = ({ticket, messages, setMessages}) => {
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = async () => {

        if (!newMessage.trim()) return;
        console.log(ticket);
        console.log(ticket._id);
        try {
            const response = await api.post(`/tickets/${ticket._id}/messages`, {
                text: newMessage
            });

            setMessages(prev => [
                ...prev,
                response.data.message
            ]);

            setNewMessage("");
            toast.success("Message sent!");

        } catch (err) {
            toast.error("Failed to send message!");
        }

    }

    return (
        <>
            <div className="chat_section border flex flex-col h-125 min-w-100 p-5">
                <h2 className="text-center mb-3">Messages</h2>

                <div className="flex-1 overflow-y-auto pr-2 mb-4">
                    {
                        (messages || []).length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <TbMessages className="h-8 w-8" />
                                <p className="text-center">No messages yet.<br />Start the conversation.</p>
                            </div>
                        ) :
                        (
                            (messages || []).map((message) => (

                                <div key={message._id} className={`mb-4 flex ${user.role === "customer" ? (message.sender.role==='customer' ? "justify-end" : "justify-start") : (message.sender.role==='customer' ? "justify-start" : "justify-end")}`}>

                                    <div className={`p-3 rounded-2xl max-w-[75%] ${message.sender.role === "customer" ? "bg-red-200 text-red-900 rounded-tr-sm" : "bg-gray-200 text-gray-900 rounded-tl-sm"}`}>

                                        <p className="text-xs font-bold mb-1 capitalize">{message.sender.name}</p>
                                        <p className="text-sm">{message.text}</p>
                                        <p className="text-xs text-right opacity-60 mt-1">
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>

                                    </div>

                                </div>
                            ))
                        )
                    }
                </div>

                {ticket.status !== "Resolved" ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }} className="chatSection flex justify-between">

                        <input type="text" value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }} className="border px-3 py-2 w-full rounded-lg mr-2 outline-none" placeholder="Type a message..." />

                        <button type="submit" className="bg-red-600 text-white rounded-lg py-2 px-4 cursor-pointer hover:bg-red-700 transition-colors">Send</button>
                    </form>
                ):
                (
                    <p className="border border-gray-300 rounded-lg bg-gray-50 p-2 text-center opacity-80">This ticket has been resolved and is no longer accepting messages.</p>
                )
            }


            </div>
        </>
    )
}

export default ChatBox