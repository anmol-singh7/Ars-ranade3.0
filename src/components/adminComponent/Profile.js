import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../design.css/profile.css"

const ProfileDropdown = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="profile-container">
            <img
                src="https://as2.ftcdn.net/v2/jpg/04/83/90/87/1000_F_483908734_Fn5m2DUij8ijZHgD95HgMLty2kOVZ7hA.jpg"
                alt="Profile"
                className="profile-image"
                onClick={toggleDropdown}
            />
            <div className={`dropdown1 ${dropdownVisible ? 'show' : ''}`}>
             
                <div className="dropdown-item1">
                    Profile
                </div>
                <div className="dropdown-item1">
                    Change Password/Security
                </div>
                <div className="dropdown-item1">
                    Settings
                </div>
                <div className="dropdown-item1">
                    Help
                </div>
                <div className="dropdown-item2" onClick={() => handleLogout()}>Logout</div>
                
            </div>
        </div>
    );
};

export default ProfileDropdown;