import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleUserProfileClick = () => {
        navigate('/usersTable');
    };

    return (
        <div className="homepage">
            <h1>Admin Dashboard</h1>
            <button onClick={handleUserProfileClick}>User Profile Management</button>
        </div>
    );
}

export default Dashboard;
