import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Login = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("Login button clicked.");

        try {
            const data = await login(email,password);

            if(data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
            // console.log("Login success.");
        } catch (err) {
            console.log(err);
            console.log("Login failed.");
        }
    };

    return(
        <>
            <Navbar />

            <form onSubmit={handleLogin} className="flex flex-col border border-gray-200 shadow-sm rounded-xl mx-auto my-10 max-w-2xl p-8 bg-white">
                <h1 className="text-xl font-bold mb-1">Login</h1>
                <p className="text-sm text-gray-600 mb-4">Please provide your credentials.</p>

                <label className="text-sm mt-4 font-semibold text-gray-700">Email*</label>
                <input type="email" required name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="border border-gray-300 p-2 my-1 rounded-xl outline-none " placeholder="Enter your email address" />

                <label className="text-sm mt-4 font-semibold text-gray-700">Password*</label>
                <input type="password" required name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="border border-gray-300 p-2 my-1 rounded-xl outline-none " placeholder="Enter password" />

                <div className="flex gap-2 mt-5 text-sm font-semibold">
                    <span className="text-gray-600">Do not have an account?</span>
                    <Link to="/register" className="cursor-pointer hover:underline">
                        Register
                    </Link>
                </div>

                <div className="Buttons flex justify-end gap-3 mt-10">
                    {/* <button type="button" onClick={handleCancelButton} className="border-2 rounded-lg mx-5 p-2 cursor-pointer hover:bg-gray-100">Cancel</button> */}
                    <button type="submit" className="border-2 rounded-lg mx-5 p-2 cursor-pointer flex justify-center items-center gap-2 bg-red-300 hover:bg-red-400">Login</button>
                </div>

            </form>
        </>
    )
};

export default Login;