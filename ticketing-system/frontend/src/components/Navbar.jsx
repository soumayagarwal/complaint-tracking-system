import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

const Navbar = ()=>{
    const navigate = useNavigate();
    const { user, logout, token} = useContext(AuthContext);

    const handleNewTicket = ()=>navigate("/tickets/new");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return(
        <>
            <Toaster position="bottom-right" reverseOrder={false} />

            <nav className="flex justify-around border items-center py-2 bg-red-300">

                <div onClick={() => navigate(user?.role === "admin" ? "/admin" : "/dashboard")} className="logo text-xl text-red-800 font-bold">mySupport</div>

                {token && (
                    <div className="bg-red-800 text-white px-4 py-2 rounded-lg capitalize font-semibold">
                        {user?.name}
                    </div>
                )}

                <div className="flex gap-5">
                    {user?.role === "customer" && (
                        <button
                            onClick={handleNewTicket}
                            className="bg-red-800 text-white p-2 cursor-pointer rounded-xl"
                        >
                            + Create New Ticket
                        </button>
                    )}
                    
                    {token && (
                        <button
                        onClick={handleLogout}
                        className="bg-red-800 text-white px-4 py-2 cursor-pointer rounded-xl"
                        >
                            Logout
                        </button>
                    )}
                </div>

            </nav>
        </>
    )
};

export default Navbar;