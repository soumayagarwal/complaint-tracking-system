import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";

const CreateTicket = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Hardware");
    const [priority, setPriority] = useState("Medium");
    const [description, setDescription] = useState("");
    
    
    const handleSubmitTicket = async (e) => {
        e.preventDefault();

        if(title.trim().length < 5){
            toast.error("Title must be at least 5 characters.");
            return;
        }
        if(description.trim().length < 20){
            toast.error("Description must be at least 20 characters.");
            return;
        }

        try {
            await api.post("/tickets", {
                title,
                category,
                priority,
                description
            });

            toast.success("Ticket created successfully!");
            navigate("/dashboard");
        } 
        catch (err) {
            console.log(err);
            console.log(err.response);

            toast.error(
                err.response?.data?.error || "Failed to create ticket."
            );
        }
    }

    const handleCancelButton = () => {
        navigate("/");
    }


    return (
        <>
            <Navbar />

            <form onSubmit={handleSubmitTicket} className="flex flex-col border border-gray-200 shadow-sm rounded-xl mx-auto my-10 max-w-2xl p-8 bg-white">
                <h1 className="text-xl font-bold mb-1">Create New Ticket</h1>
                <p className="text-sm text-gray-600 mb-4">Please provide the details of your issue below, and our support team will assist you shortly.</p>

                <label className="text-sm mt-4 font-semibold text-gray-700">Ticket Title*</label>
                <input type="text" required minLength={5} name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} className="border border-gray-300 p-2 my-1 rounded-xl outline-none " placeholder="Brief summary of the issue." />

                <label className="text-sm mt-4 font-semibold text-gray-700">Category*</label>
                <select name="selectCategory" value={category} onChange={(e) => {setCategory(e.target.value)}} className="border border-gray-300 rounded-xl px-3 py-1.5 my-1 w-full outline-none">
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Billing">Billing</option>
                    <option value="Network">Network</option>
                    <option value="Other">Other</option>
                </select>

                <label className="text-sm mt-4 font-semibold text-gray-700">Priority*</label>
                <select name="selectCategory" value={priority} onChange={(e) => {setPriority(e.target.value)}} className="border border-gray-300 rounded-xl px-3 py-1.5 my-1 w-full outline-none">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <label className="text-sm mt-4 font-semibold text-gray-700">Description*</label>
                <textarea value={description} rows="4" required minLength={20} onChange={(e) => {setDescription(e.target.value)}} className="border border-gray-300 p-2 my-1 rounded-xl outline-none" placeholder="Please provide as much detail as possible to help us resolve your issue quickly. Steps to reproduce are highly appreciated." />

                <div className="Buttons flex justify-end gap-3 mt-10">
                    <button type="button" onClick={handleCancelButton} className="border-2 rounded-lg mx-5 p-2 cursor-pointer hover:bg-gray-100">Cancel</button>
                    <button type="submit" className="border-2 rounded-lg mx-5 p-2 cursor-pointer flex justify-center items-center gap-2 bg-red-300 hover:bg-red-400"><IoSend />Submit Ticket</button>
                </div>

            </form>
        </>
    )
}

export default CreateTicket