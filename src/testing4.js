import React, { useState, useEffect } from "react";
import "../src/components/admincomponents/componentscss/modal.css"

// const initialData = [
//   {
//     head1: "Product A",
//     head2: "Category X",
//     unit: "100",
//     attribute: ""
//   },
//   {
//     head1: "Product B",
//     head2: "Category Y",
//     unit: "200",
//     attribute: ""
//   },
//   {
//     head1: "Product C",
//     head2: "Category Z",
//     unit: "300",
//     attribute: ""
//   },
//   {
//     head1: "Product A",
//     head2: "Category X",
//     unit: "100",
//     attribute: ""
//   },
//   {
//     head1: "Product B",
//     head2: "Category Y",
//     unit: "200",
//     attribute: ""
//   },
//   {
//     head1: "Product C",
//     head2: "Category Z",
//     unit: "300",
//     attribute: ""
//   }
// ];

const Modal2 = ({ initialData }) => {
    const [data, setData] = useState(initialData);
    const [showModal, setShowModal] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        setData(initialData);
        // console.log('Component mounted');
    }, [data, initialData])
    const toggleModal = () => {
        // console.log("selected222", selected);
        setShowModal(!showModal);
        if (!showModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    };

    const handleDropdownChange = (item, Index, selectedOption) => {
        const updatedData = [...data];
        const selectedData = updatedData[Index];
        if (selectedOption !== "none") {
            // selectedData.attribute = selectedOption;
            setSelectedOptions((prevSelectedOptions) => {
                const newSelectedOption = {
                    activity: item.activity,
                    attribute: selectedOption,
                    head1: item.head1,
                    head2: item.head2,
                    inuse: item.inuse,
                    sensorname: item.sensorname,
                    unit: item.unit,
                };
                console.log("selectedOptions", selectedOptions)
                return [...prevSelectedOptions, newSelectedOption];
            });
        } else {
            selectedData.attribute = "";
            setSelectedOptions((prevSelectedOptions) => {
                const updatedSelectedOptions = { ...prevSelectedOptions };
                delete updatedSelectedOptions[
                    `${selectedData.head1}-${selectedData.head2}-${selectedData.unit}`
                ];
                return updatedSelectedOptions;
            });
            selectedData.isOpen = !selectedData.isOpen;
        }
        setData(updatedData);
    };


    const handleDivClick = (index) => {
        const updatedData = [...data];
        const selectedData = updatedData[index];
        selectedData.isOpen = !selectedData.isOpen;
        console.log("data222222", data);
        setData(updatedData);
    };
    const setModalOffAndModalOverFlow = () => {
        setShowModal(!showModal);
        //  console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttt")
        document.body.classList.remove('modal-open');
    }
    return (
        <div>
            <button onClick={toggleModal}>+</button>
            {showModal && (
                <div className="modal-container" onClick={() => setModalOffAndModalOverFlow()}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                        <h2>Select rows</h2>

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            {data.map((item, index) => (
                                <div
                                    key={`${item.head1}-${item.head2}-${item.unit}`}
                                    style={{
                                        width: "9%", margin: "15px", padding: "15px", textAlign: "center", border: "solid 1px black", borderRadius: "10px",
                                        backgroundColor: selectedOptions.some((o) => (
                                            o.head1 === item.head1 &&
                                            o.head2 === item.head2 &&
                                            o.unit === item.unit
                                        )) ? '#c8f4c8' : 'inherit'
                                    }}
                                >
                                    <div onClick={() => handleDivClick(index)}>
                                        <div>{item.head1}</div>
                                        <div>{item.head2}</div>
                                        <div>{item.unit}</div>
                                    </div>
                                    {/* {item.isOpen && ( */}
                                    <select
                                        value={item.attribute}
                                        onChange={(e) => handleDropdownChange(item, index, e.target.value)}
                                    >
                                        <option value="none">None</option>
                                        <option value="Option 1">Option 1</option>
                                        <option value="Option 2">Option 2</option>
                                        <option value="Option 3">Option 3</option>
                                    </select>
                                    {/* )} */}
                                </div>
                            ))}
                        </div>
                        <button onClick={toggleModal}>Save</button>
                    </div>
                </div>)}
        </div>
    );
};

export default Modal2;
