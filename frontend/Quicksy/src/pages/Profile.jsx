import axios from 'axios';
import React, { useEffect } from 'react'
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Profile() {

    const [userData, setUserData] = React.useState(null);

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get('http://localhost:7777/api/v1/user/profile', { withCredentials: true });
            setUserData(res?.data?.data);
        } catch (err) {
            console.error("Error fetching user profile data:", err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:7777/api/v1/auth/logout', {}, { withCredentials: true });
            setUserData(null);
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

  return (
    <div>
        <h1 className="text-2xl font-bold text-center text-green-600 my-6">User Profile</h1>
        {userData ? (
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Name:</h2>
                    <p className="text-gray-600">{userData.name}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Email:</h2>
                    <p className="text-gray-600">{userData.email}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Phone:</h2>
                    <p className="text-gray-600">{userData.phone}</p>
                </div>
                <div>
                    <button onClick={handleLogout}>Logout</button>


                </div>
                {/* Add more fields as necessary */}
            </div>
        ) : (
            <p className="text-center text-gray-600">Loading profile...</p>
        )}  
    </div>
  )
}

export default Profile