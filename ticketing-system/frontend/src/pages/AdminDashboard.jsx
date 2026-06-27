import { useContext, useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TicketContext } from "../context/TicketContext";
import Navbar from "../components/Navbar";
import api from "../lib/api";
import TicketTable from "../components/TicketTable";

const AdminDashboard = ()=>{
    const { tickets } = useContext(TicketContext);
    const [stats, setStats] = useState(null);
    const [filter,setFilter] = useState("All");
    const [error, setError] = useState(false);
    // console.log(tickets);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get("/admin/stats");
                setStats(response.data);
            }
            catch (err) {
                console.error(err);
                setError(true);
            }
        };

        fetchStats();
    }, []);

    if (!stats) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Failed to load dashboard.</div>;
    }

    const handleFilterChange = (e) => {
        const updatedFilter = e.target.value;
        setFilter(updatedFilter);
    }

    const visibleTickets = filter === 'All' ? tickets : tickets.filter(t => t.status === filter)

    const categoryArray = Object.entries(stats.ticketsByCategory).map(
        ([name, value]) => ({
            name,
            value
        })
    );

    // const RADIAN = Math.PI / 180;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#36454F'];

    const dateArray = stats.ticketsOverTime.map(item => ({
        date: new Date(item.date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric"
            }
        ),
        count: item.count
    }));

    return(
        <>
            <Navbar/>

            <main className="max-w-7xl mx-auto p-5 mt-5">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

                <div className="KPI-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                    <div className="total_tickets bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col justify-center items-center">
                        <p className="font-semibold text-gray-500">Total Tickets</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalTickets}</p>
                    </div>

                    <div className="total_open bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col justify-center items-center">
                        <p className="font-semibold text-gray-500">Total Open</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{stats.openTickets}</p>
                    </div>

                    <div className="total_inProgress bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col justify-center items-center">
                        <p className="font-semibold text-gray-500">In Progress</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{stats.inProgressTickets}</p>
                    </div>

                    <div className="total_resolved_today bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col justify-center items-center">
                        <p className="font-semibold text-gray-500">Resolved Today</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{stats.resolvedToday}</p>
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
                    {/* CHART SECTION */}

                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col items-center">
                        <h2 className="text-lg font-bold mb-6 text-gray-700 w-full text-left">Tickets Over Time</h2>
                        <div className="w-full h-75">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dateArray}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="date" tick={{fill: '#6b7280'}} tickLine={false} />
                                    <YAxis allowDecimals={false} tick={{fill: '#6b7280'}} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{fill: '#f3f4f6'}} />
                                    <Bar dataKey="count" fill="#f87171" radius={[4, 4, 0, 0]} name="New Tickets" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col items-center">
                        <h2 className="text-lg font-bold mb-2 text-gray-700 w-full text-left">Tickets by Category</h2>
                        <div className="w-full h-75">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryArray}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label
                                    >
                                        {categoryArray.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-700">Global Ticket Queue</h2>
                        
                        <div className="bg-gray-50 p-1 rounded-lg border border-gray-200 inline-flex items-center">
                            <label className="text-sm text-gray-700 font-semibold mr-1.5 ml-1">
                                Filter by Status:
                            </label>
                            <select value={filter} onChange={handleFilterChange} className="border border-gray-300 rounded-md px-1 py-0.5 outline-none bg-white">
                                <option value="All">All Tickets</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>
                    </div>

                    <TicketTable tickets={visibleTickets} />
                </div>
            </main>
            
        </>
    )
}

export default AdminDashboard