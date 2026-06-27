import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        // console.log("Login function called.");
        setLoading(true);
        try{
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const data = response.data;

            localStorage.setItem("token",data.token);
            setToken(data.token);
            setUser(data.user);

            return data;
        }
        finally {
            setLoading(false);
        }
    };

    const register = async (name,email,password) => {
        setLoading(true);
        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password
            });

            const data = response.data;

            setUser(data.user);
            return data;

        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    const fetchUser = async () => {
        if(!token) return;

        try {
            const response = await api.get("/auth/me");

            setUser(response.data);
        } catch (err) {
            logout();
        }
    };

    useEffect(() => {
        fetchUser();   
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                loading,
                setLoading,
                login,
                logout,
                register,
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};