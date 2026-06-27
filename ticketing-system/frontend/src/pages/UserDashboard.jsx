import { useContext, useState } from "react";
import { TicketContext } from "../context/TicketContext";
import Navbar from "../components/Navbar";
import TicketTable from "../components/TicketTable";

const UserDashboard = ()=>{
    const {tickets} = useContext(TicketContext);

    return(
        <>
            <Navbar />
            
            <main className="max-w-7xl mx-auto p-5 mt-5">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">My Tickets</h1>
                        <p className="text-sm text-gray-500 mt-1">Track and manage your support requests.</p>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                    {tickets.length === 0 ? (
                        <div className="p-16 flex flex-col items-center justify-center text-gray-500">
                            <p className="text-lg font-medium mb-1">No tickets found</p>
                        </div>
                    ) : (
                        <TicketTable tickets={tickets} />
                    )}
                </div>
            </main>
        </>
    )
}

export default UserDashboard