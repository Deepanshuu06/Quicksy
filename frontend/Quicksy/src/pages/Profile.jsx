import axios from 'axios';
import React, { useEffect } from 'react'

function Profile() {

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get('http://localhost:7777/api/v1/user/profile', { withCredentials: true });
            console.log("User profile data:", res.data);
        } catch (err) {
            console.error("Error fetching user profile data:", err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

  return (
    <div>Profile</div>
  )
}

export default Profile