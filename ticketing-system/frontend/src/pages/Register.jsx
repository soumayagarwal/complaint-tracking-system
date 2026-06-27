import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Registration =  () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const data = await register(name, email, password);

            if(data.user.role === "admin"){
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancelButton = () => {
        navigate("/");
    }

    return(
        <>
            <Navbar />

            <form onSubmit={handleRegister} className="flex flex-col border border-gray-200 shadow-sm rounded-xl mx-auto my-10 max-w-2xl p-8 bg-white">
                <h1 className="text-xl font-bold mb-1">Register</h1>
                <p className="text-sm text-gray-600 mb-4">Please provide your details.</p>

                <label className="text-sm mt-4 font-semibold text-gray-700">Name*</label>
                <input type="text" required name="name" value={name} onChange={(e) => {setName(e.target.value)}} className="border border-gray-300 p-2 my-1 rounded-xl outline-none " placeholder="Enter your name" />

                <label className="text-sm mt-4 font-semibold text-gray-700">Email*</label>
                <input type="email" required name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="border border-gray-300 p-2 my-1 rounded-xl outline-none " placeholder="Enter your email address" />

                <label className="text-sm mt-4 font-semibold text-gray-700">Password*</label>
                <input type="password" required name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="border border-gray-300 p-2 my-1 rounded-xl outline-none " placeholder="Enter password" />

                <div className="flex gap-2 mt-5 text-sm font-semibold">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link to="/login" className="cursor-pointer hover:underline">
                        Login
                    </Link>
                </div>

                <div className="Buttons flex justify-end gap-3 mt-10">
                    <button type="button" onClick={handleCancelButton} className="border-2 rounded-lg mx-5 p-2 cursor-pointer hover:bg-gray-100">Cancel</button>
                    <button type="submit" className="border-2 rounded-lg mx-5 p-2 cursor-pointer flex justify-center items-center gap-2 bg-red-300 hover:bg-red-400">Register</button>
                </div>

            </form>
        </>
    )
};

export default Registration;