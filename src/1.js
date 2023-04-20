import React, { useState, useEffect } from 'react';
import { fetchGetApi, fetchPostApi } from "../api/singlecall";
import ButtonWithModal from '../Testing';
import Modal2 from '../Testing2';
import { useLocation } from "react-router-dom";


        // </table >
function ViewBoard() {

    const URL = process.env.REACT_APP_URL;
    const API1 = URL + "advancesearch";
    const API2 = URL + "description/reportid";
    const API3 = URL + "getsetdata/reportid";
    const API4 = URL + "systems";
    const API5 = URL + "manufacturers";
    const API6 = URL + "description"
    const API7 = URL + "setPointData";
    const API8 = URL + "sensors";
    const API9 = URL + "attributes";
    const [description, setdec] = useState({ clientid: "", systems: "", manufacturer: "", datebegin: "", timebegin: "", dateend: "", timeend: "", databasename: "", table1: "", formtype: "", status1: "", prechandler: "", nexthandler: "", count: "", reportname: "" });
    const [clientname, setclientname] = useState("");
    const [data, FillSetPointData] = useState([[]]);
    const { state } = useLocation();
    const [atList, setAtlist] = useState([]);
    // const [data, setData] = useState([[]]);
    const [showModal, setShowModal] = useState(false);
    const [options, setOptions] = useState([[]]);
    const [clientList, setClientList] = useState([]);
    const [systemList, setSystemList] = useState([]);
    const [selectedDB, setSelectedDB] = useState("");
    const [manufacturerList, setManufacturerList] = useState([]);
    const [table1, setTable1] = useState([]);
    const [formList, setFormList] = useState([]);
    const [sel, setSel] = useState(null);
    const [min_date, setmin_date] = useState("");
    const [max_date, setmax_date] = useState("");
    const [nextversion, setversion] = useState("");
    const [list, setList] = useState([]);
    const [formValues, setFormValues] = useState({
        userid: "ABS-896645467/Creator",
        clientid: "",
        formtype: "",
        systems: "",
        manufacturer: "",
        datebegin: "",
        timebegin: "",
        dateend: "",
        timeend: "",
        status1: "Draft",
        timetype: "",
        table1: '',
        databasename: '',
        version: '',
        reportid: state.alfa,
        utilityid: null,
        prechandler: '',
        nexthandler: '',
        count: 1,
        reportname: "",

    });

    const [body, setBody] = useState([]);

    const [headi2, setHeadi2] = useState([]);
    const [prevheadingjson, setPrevHeadingJson] = useState([]);
    const [heading, setHeading] = useState([]);
    const [prevheading, setPrevHeading] = useState([]);
    const [DATA, setDATA] = useState([]);

    const fetch2 = async (AP, data2) => {
        const result1 = await fetchPostApi(AP, data2);
        //  console.log("result1",result1)
        setdec(result1.result[0]);
        setclientname(result1.clientname);
        setversion(result1.nextversion);

        // const res=await fetch6(API6,{reportid:state.alfa,version:result1.result[0].version})
    };

    const fetch3 = async (API, data2) => {
        console.log("before fetch", API, data2, typeof (data2.reportid));
        const resultsetdataapi = await fetchPostApi(API, data2);
        console.log("After fetch", resultsetdataapi[0].setdata);
        FillSetPointData(resultsetdataapi[0].setdata)
        // console.log("resultsetdataapiiiiiiiiiiiiiiiiiiii",resultsetdataapi.setdata);

        //  FillSetPointData(result1.setdata);
    };

    const fetch4 = async (API) => {
        const result = await fetchGetApi(API);

        setSystemList(result);
    };

    const fetch5 = async (API) => {
        const result = await fetchGetApi(API);

        setManufacturerList(result);
    };

    const fetch7 = async (API, data2) => {
        //  const data2={databasename: "bz2vx6b6k3kn9nlapzd9", tablename: "cLIENT_2_table_1"}
        const result = await fetchPostApi(API, data2);

        setAtlist(result);
    }

    const xat = async () => {
        const delta = { reportid: state.alfa };

        const response3 = await fetchPostApi(API1, delta);
        // console.log(response3);
        setHeading(response3.firstheader);
        setPrevHeadingJson(response3.firstheader);
        const arr = {
            sensorname: "S5",
            head1: "Set Points",
            head2: "Date and Time",
            unit: "",
            attribute: "",
            formtype: "",
        };
        setHeading([arr, ...response3.firstheader]);
        setPrevHeadingJson([arr, ...response3.firstheader]);
        var arr2 = []
        for (var i = 0; i < response3.firstheader.length; i++) {
            arr2.push(i + 1);
        }
        setPrevHeading(arr2);
        const pan = response3.body;
        var te = [[]];
        for (var i = 0; i < pan.length - 1; i++) {
            te[i] = Object.values(pan[i]);
        }
        setHeadi2([arr, ...response3.secondheader]);
        setBody(te);
        const trial = Object.entries(response3.attributelist);
        delete trial.CurDT;
        delete trial.CurT;

        // console.log('=====',trial);
        setOptions(trial);
    };

    useEffect(() => {
        const xx = { reportid: state.alfa };
        //  console.log("xxxxxxxxxx",xx)

        fetch2(API2, xx);
        fetch3(API3, xx);
        fetch4(API4);
        fetch5(API5);
        xat();
        //  fetch6(API6,);

    }, []);

    const handlechange2 = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setdec({
            ...description,
            [name]: value,
        });
        // console.log("eventttttttt",e);
    }

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
            userid: "AB_HAFAGAKS",
            databasename: description.databasename,
            table1: description.table1,
            clientid: description.clientid,
            prechandler: 'Creator',
            nexthandler: 'Creator',
            version: nextversion,
            formtype: description.formtype,
            reportname: description.reportname,
            timetype: "1"
        });
    };
    const handleInputChange = (e, row, col) => {
        const newData = [...data];
        newData[row][col] = e.target.value;
        FillSetPointData(newData);
    };

    const addRow = () => {
        // console.log("addrow",data.length)
        if (data.length - 1 === 0) {
            const len = heading.length;
            const bet = data.length + 1;
            const t = [[]];
            for (var i = 0; i < bet; i++) {
                var tt = [len];
                for (var j = 0; j < len; j++) {
                    if (j !== 0) {
                        tt[j] = "-";
                    } else {
                        tt[j] = "";
                    }
                }
                // console.log("addrow",data.length,tt);
                t[i] = tt;
                // console.log("2d",t)
            }
            FillSetPointData(t);
        }
        else {
            const newData = [...data];
            // console.log("one",newData)
            newData.push(Array(data[0].length).fill("-"));
            newData[newData.length - 1][0] = ""
            // console.log("two",newData)
            FillSetPointData(newData);
        };
    };

    const handleSelectChange = (e, row, col) => {
        const newData = [...data];
        // newData[row][col] = e.target.value;
        // setData(newData);
        const arr = options;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] === e.target.value) {
                // console.log("Removing row:", arr[i]);
                newData[row][col] = arr[i][1];
                FillSetPointData(newData);
                arr.splice(i, 1);
                i--; // Decrement i to account for the removed element
                break;
            }
        }

        // isSelected === false? setIsselected(true):setIsselected(false);
    };

    // const sendData = async ()=>{
    //     // setFormValues({
    //     //   ...formValues,
    //     //   databasename: description.databasename,
    //     //   table1:description.table1,
    //     //   clientid:description.clientid,
    //     //   prechandler:'Creator',
    //     //   nexthandler:'Creator',
    //     //   version:nextversion,
    //     //   formtype:description.formtype,
    //     //   reportname:description.reportname,
    //     //   timetype:"1"

    //     // });
    //    const ans= await fetchPostApi(API6,formValues);
    //    const ans2=await fetchPostApi(API7,{reportid:state.alfa+"aaaaaaaa",setdata:data});
    //     console.log("description ans",ans,ans2);


    //   };

    const getUniqueSystems = [
        ...new Set(systemList.map((item) => item.systemname)),
    ];
    const getUniqueManu = [
        ...new Set(manufacturerList.map((item) => item.manufacturername)),
    ];
    const fetch6 = async (a, b, c) => {

        const gama = { databasename: a, tablename: b, formtype: c };
        const sensorlist = await fetchPostApi(API8, gama);

        //  console.log("jjjjjjjjjjjjjjjjj",sensorlist)
        setList(sensorlist);
        // setData(result1.setdata)

        //  FillSetPointData(result1.setdata);
    };
    // const hand=async()=>{
    if (description.databasename !== "" && description.table1 !== "" && description.formtype !== "" && (list.length === 0)) {
        fetch6(description.databasename, description.table1, description.formtype);
        fetch7(API9, { databasename: description.databasename, tablename: description.table1 });
    }
    // }
    // const removeElements=(A, n, arr)=> {
    //     // const n = B;
    //     const indexesToRemove = new Set(A);
    //     for (let i = 0; i < arr.length; i++) {
    //       for (let j = arr[i].length - 1; j >= 0; j--) {
    //         if (indexesToRemove.has(j)) {
    //           arr[i].splice(j, 1);
    //         }
    //       }
    //       arr[i].push(...Array(n).fill("-"));
    //     }
    //     return arr;
    //   }







    function updateDataArrays(heading, removed, prevremoved, prevadded, added, DAT, arrayTWOD) {
        console.log(heading, removed, prevremoved, prevadded, added, DAT, arrayTWOD)
        let temp = [];
        var array2D = arrayTWOD;
        var DATA = DAT;
        // Find the index of the first element of removed-prevremoved in the heading array
        let index = heading.findIndex(el => removed.includes(el) && !prevremoved.includes(el));
        while (index !== -1) {
            // Store/push the index+1 element of each row of 2-D array in temp
            let dataofthatjson = [];
            for (let i = 0; i < array2D.length; i++) {
                dataofthatjson.push(array2D[i][index + 1]);
                array2D[i].splice(index + 1, 1); // Remove index+1 element from each row of 2-D array
            }
            temp.push({ val: heading[index], dataofthatjson });

            // Find the next index of the first element of removed-prevremoved in the heading array
            index = heading.findIndex((el, i) => i > index && removed.includes(el) && !prevremoved.includes(el));
        }

        // Find the val element in DATA whose val key value is equal to first element of added-prevadded
        let dataToAdd = null;
        for (let i = 0; i < DATA.length; i++) {
            if (DATA[i].val.head1 === added[0] && !prevadded.includes(added[0])) {
                dataToAdd = DATA[i];
                DATA.splice(i, 1); // Remove the element from DATA
                break;
            }
        }

        // Add dataofthatjson values to each row of 2-D array, or add '-' if dataToAdd is null
        if (dataToAdd) {
            for (let i = 0; i < array2D.length; i++) {
                array2D[i].push(...dataToAdd.dataofthatjson);
            }
        } else {
            for (let i = 0; i < array2D.length; i++) {
                array2D[i].push('-');
            }
        }

        // Find the val element in DATA whose val key value is equal to first element of prevremoved-removed
        let dataToRemove = null;
        for (let i = 0; i < DATA.length; i++) {
            if (DATA[i].val.head1 === removed[0] && !prevremoved.includes(removed[0])) {
                dataToRemove = DATA[i];
                DATA.splice(i, 1); // Remove the element from DATA
                break;
            }
        }

        // Remove dataofthatjson values from each row of 2-D array, or remove the entire row if dataToRemove is not null
        if (dataToRemove) {
            for (let i = 0; i < array2D.length; i++) {
                let index = dataToRemove.dataofthatjson[i];
                array2D[i].splice(index, 1);
            }
        } else {
            let index = heading.findIndex(el => removed.includes(el));
            while (index !== -1) {
                for (let i = 0; i < array2D.length; i++) {
                    array2D[i].splice(index + 1, 1);
                }
                index = heading.findIndex((el, i) => i > index && removed.includes(el));
            }
        }

        // Push temp array to DATA

        return { TWOD: array2D, DD: DATA.concat(temp) };
    }

















    const addheading = (heading, added, removed, prevremoved, prevadded) => {
        const arr = {
            sensorname: "",
            head1: "Set Points",
            head2: "Date and Time",
            unit: "",
            attribute: "",
            formtype: "",
        };
        // setSelected([arr, ...orderSelected(data, markedData)]);

        // if()inde
        // const prev_diff = prevheading.filter(x => !(jsooo.inde).includes(x));
        // const inde = (jsooo.inde).filter(x => !prevheading.includes(x));

        // var newdata = removeElements(prev_diff,added.length,data)
        const newdata = updateDataArrays(heading, removed, prevremoved, prevadded, added, DATA, data);
        setHeading([arr, ...heading]);
        FillSetPointData(newdata.TWOD);
        setDATA(newdata.DD);
        // setPrevHeading(jsooo.inde);
    }
    const addheadi2 = (selectedpd) => {
        // const arr = {
        //   sensorname: "",
        //   head1: "Set Points",
        //   head2: "Date and Time",
        //   unit: "",
        //   attribute: "",
        //   formtype: "",
        // };
        // setSelected([arr, ...orderSelected(data, markedData)]);
        setHeadi2(selectedpd);
    }

    const generateSelectedArray = (prevaddedjsons, data, list) => {
        let actuallyselected = [];

        // iterate over prevaddedjsons
        for (let i = 0; i < prevaddedjsons.length; i++) {
            let dd = [];
            // push the (i+1)th element of each row in data array
            for (let j = 0; j < data.length; j++) {
                dd.push(data[j][i]);
            }
            // create the json and push it to actuallyselected array
            actuallyselected.push({
                jso: prevaddedjsons[i],
                dat: dd
            });
        }

        // iterate over list
        for (let i = 0; i < list.length; i++) {
            // check if the element is not present in prevaddedjsons
            let isPresent = false;
            for (let j = 0; j < prevaddedjsons.length; j++) {
                if (prevaddedjsons[j].sensorname === list[i].sensorname) {
                    isPresent = true;
                    break;
                }
            }
            // if element is not present, create a new json and push it to actuallyselected array
            if (!isPresent) {
                let tt = new Array(data.length).fill("-");
                actuallyselected.push({
                    jso: list[i],
                    dat: tt
                });
            }
        }
        console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", actuallyselected)
        return actuallyselected;
    }





    const headerRow = (heading) => {
        return (
            <tr>
                {Object.keys(heading[0].jso).map((key) => {
                    if (key === "head1" || key === "head2" || key === "unit") {
                        return <th key={key}>{heading[0].jso[key]}</th>;
                    }
                })}
            </tr>
        );
    }


    const dataRows = (heading, prevheadingjson) => {
        data.map((row, rowIndex) => {
            return (
                <tr key={rowIndex}>
                    {heading.map((col, colIndex) => {
                        let isPresent = false;
                        for (let k = 0; k < prevheadingjson.length; k++) {
                            if (prevheadingjson[k] === col.jso) {
                                isPresent = true;
                                break;
                            }
                        }
                        if (isPresent) {
                            let cellData = "-";
                            if (col.dat[rowIndex]) {
                                cellData = col.dat[rowIndex];
                            }
                            return <td key={colIndex}>{cellData}</td>;
                        }
                    })}
                </tr>
            );
        });
    }




    return (
        <>
            <button onClick={() => generateSelectedArray(prevheadingjson, data, list)}>Hiiiiii</button>

            <table>
                <thead>{headerRow(heading)}</thead>
                <tbody>{dataRows(heading, prevheadingjson)}</tbody>
            </table>
            <div className="finalformcreate-container">
                <table
                    className="finalformcreate-table "
                    htmlFor="#table"
                    style={{ borderWidth: "0.5px", borderColor: "black" }}
                >
                    <thead className="finalformcreate-thead">
                        <tr className="finalformcreate-tr">
                            <th>Report Name </th>
                            <th colSpan={heading.length - 1}>
                                <td className="mapmodule-th">
                                    <input className="mapmodule-input" htmlFor="reportname"
                                        type="text"
                                        id="reportname"
                                        name="reportname"
                                        value={description.reportname}
                                        onChange={handlechange2}
                                        placeholder="Enter head2 value"
                                        required
                                    />
                                </td></th>
                        </tr>
                        <tr className="finalformcreate-tr">
                            <th>Client </th>
                            <th colSpan={heading.length - 1}>{clientname}</th>
                        </tr>
                        <tr className="finalformcreate-tr">
                            <th>System Name</th>
                            <th colSpan={heading.length - 1}>
                                <select
                                    className="formcreate-select"
                                    type="text"
                                    id="systems"
                                    name="systems"
                                    value={formValues.systems}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        {description.systems}
                                    </option>
                                    {getUniqueSystems.map((cur, index) => (
                                        <option key={index}>{cur}</option>
                                    ))}
                                </select>
                            </th>
                        </tr>
                        <tr className="finalformcreate-tr">
                            <th>Manufactured By </th>
                            <th colSpan={heading.length - 1}>
                                <select
                                    className="formcreate-select"
                                    type="text"
                                    id="manufacturer"
                                    name="manufacturer"
                                    value={formValues.manufacturer}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        {description.manufacturer}
                                    </option>
                                    {getUniqueManu.map((cur, index) => (
                                        <option key={index}>{cur}</option>
                                    ))}
                                </select>
                            </th>
                        </tr>
                        <tr className="finalformcreate-tr">
                            <th>From Date and Time</th>
                            <th colSpan={heading.length - 1}>

                                <>
                                    {/* <div className="formcreate-div3">
            <label className="formcreate-label2" htmlFor="datebegin">Date Begin</label> */}
                                    <input
                                        className="formcreate-select"
                                        type="date"
                                        id="datebegin"
                                        placeholder={description.datebegin}
                                        name="datebegin"
                                        value={description.datebegin}
                                        min={min_date}
                                        max={max_date}
                                        // disabled={!min_date}
                                        onChange={handleChange}
                                    />
                                    {/* </div> */}

                                    <input
                                        className="formcreate-select"
                                        type="time"
                                        id="timebegin"
                                        name="timebegin"
                                        value={description.timebegin}
                                        onChange={handleChange}
                                    />
                                </>

                            </th>
                        </tr>

                        <tr className="finalformcreate-tr">
                            <th>To Date and Time </th>
                            <th colSpan={heading.length - 1}>
                                <input
                                    className="formcreate-select"
                                    type="date"
                                    id="dateend"
                                    name="dateend"
                                    value={description.dateend}
                                    onChange={handleChange}
                                    //date end not before date begin
                                    min={formValues.datebegin}
                                    max={max_date}
                                    disabled={!formValues.datebegin}

                                />
                                <input
                                    className="formcreate-select"
                                    type="time"
                                    id="timeend"
                                    name="timeend"
                                    value={description.timeend}
                                    onChange={handleChange}
                                    disabled={!formValues.datebegin}
                                />
                            </th>
                        </tr>

                        <tr className="finalformcreate-tr">
                            {" "}
                            <th colSpan={heading.length}></th>
                        </tr>
                    </thead>
                </table>
                <table className="finalformcreate-table "
                    htmlFor="#table2"
                    style={{ borderWidth: "0.5px", borderColor: "black" }}>
                    {/* </
          <table className="finalformcreate-table " htmlFor="#table"> */}
                    <div >
                        <div>
                            <thead className="finalformcreate-thead">
                                <tr className="finalformcreate-tr">
                                    {heading.map((header, col) => (
                                        <th className="finalformcreate-th" key={col}>
                                            {col === 0 ? (
                                                <div>
                                                    <th>
                                                        <tr>{header.head1}</tr>
                                                        <tr>{ }</tr>
                                                        <tr>{header.unit}</tr>
                                                    </th>
                                                </div>
                                            ) : (
                                                <div>
                                                    <th>
                                                        <tr>{header.head1}</tr>
                                                        <tr>{header.head2}</tr>
                                                        <tr>{header.unit}</tr>
                                                    </th>
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>

                            </thead>

                            <tbody className="finalformcreate-tbody">
                                {data.map((row, rowIndex) => (
                                    <tr className="finalformcreate-tr" key={rowIndex}>
                                        {row.map((cell, colIndex) => (
                                            <td className="finalformcreate-td" key={colIndex}>
                                                {colIndex === 0 && rowIndex > 0 ? (
                                                    <input
                                                        type="text"
                                                        value={cell}
                                                        onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                                    />
                                                ) : rowIndex > 0 ? (
                                                    <select
                                                        value={cell}
                                                        onChange={(e) => handleSelectChange(e, rowIndex, colIndex)
                                                        }
                                                    >
                                                        <option value="-">{data[rowIndex][colIndex]}</option>
                                                        {options.map((cur, index) => (
                                                            <option key={index} value={cur[0]} >
                                                                {cur[0]}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr>
                                    <button className="finalformcreate-add-button" onClick={addRow}>
                                        Add Row
                                    </button>

                                </tr>
                            </tbody>
                        </div>
                        <ButtonWithModal Data={list} markedData={prevheadingjson} newmarkedData={heading} style={{ zIndex: "3" }} addheading={addheading} />
                    </div>
                </table>
                <table className="finalformcreate-table "
                    htmlFor="#table3"
                    style={{ borderWidth: "0.5px", borderColor: "black" }}>
                    <tbody className="finalformcreate-tbody">

                        {/* {data.map((row, rowIndex) => (
            <tr className="finalformcreate-tr" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td className="finalformcreate-td" key={colIndex}>
                  {cell}
                </td>
              ))}
            </tr>
          ))} */}

                        <tr className="finalformcreate-tr">
                            {headi2.map((header, col) => (
                                <th className="finalformcreate-th" key={col}>
                                    {col > 1 ? (
                                        <div>
                                            <div>
                                                <th>
                                                    <tr>{header.head1}</tr>
                                                    <tr>{header.head2}</tr>
                                                    <tr>{header.unit}</tr>
                                                </th>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {col === 1 ? (
                                                <div>
                                                    <th>
                                                        <tr>{header.head1}</tr>
                                                        <tr>{header.head2}</tr>
                                                        <tr>{header.unit}</tr>
                                                    </th>
                                                    \
                                                </div>
                                            ) : (
                                                <div>
                                                    <th>
                                                        <tr>{ }</tr>
                                                        <tr>{header.head2}</tr>
                                                        <tr>{header.unit}</tr>
                                                    </th>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </th>
                            ))}
                            {/* <select>
      {list.map((option, index) => (
        <option key={index}>
          <table>
            <tbody>
              <tr>
                <td>Head1</td>
                <td>{option.head1}</td>
              </tr>
              <tr>
                <td>Head2</td>
                <td>{option.head2}</td>
              </tr>
              <tr>
                <td>Unit</td>
                <td>{option.unit}</td>
              </tr>
            </tbody>
          </table>
        </option>
      ))}
    </select> */}
                            <Modal2 initialData={list} markedData={headi2} dropdowndata={atList} addheadi2={addheadi2} style={{ zIndex: "3" }} />
                        </tr>
                        {body.map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    {/* <button className="finalformcreate-submit-button" onClick={sendData} >Save Changes</button> */}
                </table>
                {/* <button type="button" onClick={()=>hand()}>ssssssss</button> */}
            </div>
        </>
    );
}

export default ViewBoard;
