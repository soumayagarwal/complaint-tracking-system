import { useNavigate } from "react-router-dom"
import StatusBadge from "./StatusBadge";

const TicketTable = ({tickets}) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return "";
        if (!dateString.includes('T')) return dateString;
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    }

    return(
        <>
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead> 
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Ticket Id</th>
                        <th className="px-6 py-4 font-semibold">Title</th>
                        <th className="px-6 py-4 font-semibold">Category</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Priority</th>
                        <th className="px-6 py-4 font-semibold">Date Created</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                    {tickets.map(ticket => (
                        <tr key={ticket._id} onClick={() => navigate(`/tickets/${ticket._id}`)} className={`hover:bg-gray-50 transition-colors cursor-pointer group border-l-4 ${
                                ticket.priority === 'High' ? 'border-l-red-500' :
                                ticket.priority === 'Medium' ? 'border-l-yellow-400' :
                                'border-l-green-500'
                            }`}>

                            <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                {ticket.id}
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                {ticket.title}
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                {ticket.category}
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-900 transition-colors">
                                <StatusBadge status={ticket.status}/>
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                {ticket.priority}
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                {formatDate(ticket.createdAt)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TicketTable;