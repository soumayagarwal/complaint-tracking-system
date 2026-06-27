import React from "react"

const statusColor = {
  "Open": "bg-red-300 text-red-800",
  "In Progress": "bg-yellow-300 text-yellow-800",
  "Resolved": "bg-green-300 text-green-800"
};

const StatusBadge = ({status}) => {

    const color = statusColor[status] || "bg-gray-100 text-gray-800";
    
    return(
        <>
            <span className={`rounded-xl py-1 px-3 ${color}`}>
                {status}
            </span>
        </>
    )   
}

export default StatusBadge