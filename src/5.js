import React, { useState, useEffect } from "react";
import "../src/components/admincomponents/componentscss/modal.css"

const Modal2 = ({ initialData, markedData, dropdowndata, addheadi2 }) => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dropdata, setdropdata] = useState([]);


    const switchwithmarked = (initialData, markedData) => {
        //to add values to attribute value 
        const arr = initialData;
        for (let i = 0; i < initialData.length; i++) {
            for (let j = 0; j < markedData.length; j++) {
                if (initialData[i].head1 === markedData[j].head1 && initialData[i].head2 === markedData[j].head2 && initialData[i].unit === markedData[j].unit) {
                    arr[i] = markedData[j];
                    break;
                }
            }
            setData([...arr])
            // return arr;
        }
    }

    useEffect(() => {
        switchwithmarked(initialData, markedData);
        setdropdata(dropdowndata);
        // setSelectedOptions(markedData);
        // console.log('Component mounted');
    }, [initialData, dropdowndata, markedData])

    const toggleModal = () => {
        // console.log("selected222", selected);
        setShowModal(!showModal);
        if (!showModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    };


    const toggleModal2 = (data) => {
        // console.log("selected222", selected);
        const temp = []
        const arr = {
            attribute: "firstelement",
            formtype: "",
            head1: "Set Points",
            head2: "Date and Time",
            sensorname: "S0",
            unit: ""
        }
        temp.push(arr);
        for (let i = 0; i < data.length; i++) {
            if (data[i].attribute !== "none" && data[i].attribute !== "1") {
                temp.push(data[i]);
            }
        }

        addheadi2(temp, data);
        setShowModal(!showModal);
        if (!showModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    };

    const handleDropdownChange = (item, Index, selectedOption, data) => {

        const updatedData = [...data];
        const newSelectedOption = {
            activity: data[Index].activity,
            attribute: selectedOption,
            head1: data[Index].head1,
            head2: data[Index].head2,
            inuse: data[Index].inuse,
            sensorname: data[Index].sensorname,
            unit: data[Index].unit,
        };
        updatedData[Index] = newSelectedOption;
        setData([...updatedData]);
    };



    const setModalOffAndModalOverFlow = () => {
        setShowModal(!showModal);
        //  console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttt")
        document.body.classList.remove('modal-open');
    }

    const bbgcolor = (item) => {
        var w = true;
        if (item.attribute !== "none" && item.attribute !== "1") {
            w = false;
            return '#c8f4c8'
        }

        if (w) {
            return 'inherit';
        }
    }
    const dropoptions = (opt, index, data) => {
        for (let i = 1; i < data.length; i++) {

            if (data[i].attribute === opt) {
                return <option disabled key={index} value={opt}>{opt}</option>
            }
        }
        return <option key={index} value={opt}>{opt}</option>
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
                                    key={item}
                                    style={{
                                        width: "9%", margin: "15px", padding: "15px", textAlign: "center", border: "solid 1px black", borderRadius: "10px",
                                        backgroundColor: bbgcolor(item)
                                    }}
                                >
                                    <div>
                                        <div>{item.head1}</div>
                                        <div>{item.head2}</div>
                                        <div>{item.unit}</div>
                                    </div>
                                    {/* {item.isOpen && ( */}
                                    <select
                                        value={item.attribute === 1 ? "none" : item.attribute}
                                        onChange={(e) => handleDropdownChange(item, index, e.target.value, data)}
                                    >
                                        <option value="none">None</option>
                                        {dropdata.map((opt, ind) => (
                                            ind > 0 ? dropoptions(opt, ind, data) : ''
                                        ))}
                                        {/* <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option> */}

                                    </select>
                                    {/* )} */}
                                </div>
                            ))}
                        </div>
                        <button onClick={() => toggleModal2(data)}>Save</button>
                    </div>
                </div>)}
        </div>
    );
};

export default Modal2;
