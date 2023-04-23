import { useState } from 'react';
import "./admincomponents/componentscss/ThreeButton.css";

function ButtonWithLinks() {
    const [isActive, setIsActive] = useState(false);

    const toggleOptions = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`wrapper ${isActive ? 'active' : ''}`}>
            <button className="btn" onClick={toggleOptions}>
                <i className={`ri ${isActive ? 'ri-close-line' : 'ri-share-line'}`}></i>
            </button>
            <ul className="list">
                <li className="item">
                    <a href="#" className="link ig">
                        <i className="ri-instagram-line"></i>
                    </a>
                </li>
                <li className="item" style={{ '--d': '0.25s' }}>
                    <a href="#" className="link tw">
                        <i className="ri-twitter-line"></i>
                    </a>
                </li>
                <li className="item" style={{ '--d': '0.5s' }}>
                    <a href="#" className="link sc">
                        <i className="ri-snapchat-line"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default ButtonWithLinks;
