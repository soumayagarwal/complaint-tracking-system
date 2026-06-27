import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { AuthContext } from "./AuthContext";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const {token} = useContext(AuthContext);

    const [tickets ,setTickets] = useState([]);
    const [role, setRole] = useState("user");

    const fetchTickets = async () => {
        try{
            const response = await api.get("/tickets");
            setTickets(response.data.tickets);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        if(token){
            fetchTickets();
        }
    },[token]);

    return(
        <TicketContext.Provider
        value={{
            tickets,
            setTickets,
            role,
            setRole
        }}
        >
            {children}
        </TicketContext.Provider>
    )
}