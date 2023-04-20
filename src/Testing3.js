import React, { useState } from "react";

const data = [
    { head1: "Product A", head2: "Category X", unit: "100", attribute: "1" },
    { head1: "Product B", head2: "Category Y", unit: "200", attribute: "2" },
    { head1: "Product C", head2: "Category Z", unit: "300", attribute: "3" }
];

const Dropdown = ({ options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionSelect = (value) => {
        setIsOpen(false);
        onSelect(value);
    };

    return (
        <div className="dropdown">
            <div
                className="dropdown-toggle"
                onClick={() => setIsOpen(!isOpen)}
                style={{ backgroundColor: selected ? "lightgreen" : "" }}
            >
                {selected || "Select attribute"}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <div
                            className="dropdown-item"
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;


