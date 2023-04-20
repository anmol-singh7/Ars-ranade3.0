import React, { useState } from "react";

const BodyFilter = ({ bigBody, atList, attribute, filtbody }) => {
    // Define the 2-D arra
    const index = atList.indexOf(attribute)
    // Define state for the filter value
    const [filterValue, setFilterValue] = useState("");

    // Define a function to handle changes to the filter input
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
        const filteredData = bigBody.filter((row) => String(row[index]) >= String(event.target.value));
        filtbody(filteredData);
    };

    // Filter the data based on the filter value


    // Render the table
    return (
        <div>
            <input type="text" value={filterValue} onChange={(e) => handleFilterChange(e, bigBody, index)} />
        </div>
    );
};

export default BodyFilter;
