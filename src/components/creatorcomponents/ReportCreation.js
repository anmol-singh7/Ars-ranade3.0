import React, { useState, useEffect } from 'react';
import { fetchGetApi, fetchPostApi, updatetables } from "../../api/singlecall";
import ButtonWithModal from './ButtonWithModal';
import Modal2 from './Modal2';
import Bodytable from './BodyDisplay';
import { useLocation } from "react-router-dom";
import "../../design.css/FormCreate.css";
import "../../design.css/ThreeButton.css";


function ViewBoard(props) {

    const URL = process.env.REACT_APP_URL;
    const API1 = URL + "advancesearch2";
    const API2 = URL + "description/reportid";
    const API4 = URL + "systems";
    const API5 = URL + "manufacturers";
    const API8 = URL + "sensors";
    const API9 = URL + "attributes";
    const API10 = URL + "normalpoints";
    const API11 = URL + "setpoints";
    const API12 = URL + "setPointData";
    const API13 = URL + "updateDescription";
    const API14 = URL + "addfilter";

    const [description, setdec] = useState({ clientid: "", systems: "", manufacturer: "", datebegin: "", timebegin: "", dateend: "", timeend: "", databasename: "", table1: "", formtype: "", status1: "", prechandler: "", nexthandler: "", count: "", reportname: "" });
    const [clientname, setclientname] = useState("");
    const [data, FillSetPointData] = useState([[]]);
    const { state } = useLocation();
    const [atList, setAtlist] = useState([]);
    const [options, setOptions] = useState([[]]);
    const [systemList, setSystemList] = useState([]);
    const [manufacturerList, setManufacturerList] = useState([]);
    const [min_date, setmin_date] = useState("");
    const [max_date, setmax_date] = useState("");
    const [timeBegin, setTimeBegin] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [nextversion, setversion] = useState("");
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [xx, setxx] = useState({ reportid: state.alfa });
    const [formValues, setFormValues] = useState({
        systems: "",
        manufacturer: "",
        datebegin: "",
        timebegin: "",
        dateend: "",
        timeend: "",
        status1: "created",
        reportid: state.alfa,
        reportname: "",

    });
    const [body, setBody] = useState([]);
    const [System, setSystem] = useState("");
    const [Manufacturer, setManufacturer] = useState("");
    const [Reportname, setReportname] = useState("");
    const [bodydata, setBodyData] = useState([]);
    const [headi2, setHeadi2] = useState([]);
    const [prevheadingjson, setPrevHeadingJson] = useState([]);
    const [heading, setHeading] = useState([]);
    const [allheading, setAllHeading] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [filters, setFilters] = useState({});
    const [filters2, setfilters2] = useState({});

    const toggleOptions = () => {
        setIsActive(!isActive);
    };

    const generateSelectedArray = (prevaddedjsons, data, list) => {
        // console.log("prev", prevheadingjson, "2-D", data, "allhead", list);

        // prevaddedjsons.push(arr);

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
        // const actuallyselected = actuallyselectedAll;
        let Alll = []
        for (let i = 0; i < list.length; i++) {
            // check if the element is not present in prevaddedjsons
            let isPresent = false;
            for (let j = 0; j < prevaddedjsons.length; j++) {
                if (prevaddedjsons[j].head1 === list[i].head1 && prevaddedjsons[j].head2 === list[i].head2 && prevaddedjsons[j].unit === list[i].unit) {
                    isPresent = true;
                    break;
                }
            }
            // if element is not present, create a new json and push it to actuallyselected array
            if (!isPresent) {
                let tt = new Array(data.length).fill("-");
                Alll.push({
                    jso: list[i],
                    dat: tt
                });
            }
        }
        var actuallyselectedAll = actuallyselected.concat(Alll);
        return { actuallyselected, actuallyselectedAll };
    };

    const fetch2 = async (AP, data2, clientname, nextversion, desc, formValues) => {
        if (clientname === "" || nextversion === "" || desc === "") {
            const result1 = await fetchPostApi(AP, data2);
            //  console.log("result1",result1)
            setdec(result1.result[0]);

            setSystem(result1.result[0].systems);
            setManufacturer(result1.result[0].manufacturer);
            setReportname(result1.result[0].reportname);

            setclientname(result1.clientname);
            setversion(result1.nextversion);
        }
        // const res=await fetch6(API6,{reportid:state.alfa,version:result1.result[0].version})
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

        setAtlist([...result]);
        // var temp=[];
        // for(let i=0;i<result.length;i++){
        //   if(i===0){
        //     temp.push({ attribute:"", val:""});
        //   }
        //   else{
        //   temp.push({attribute:result[i],val:""});
        //   }
        // }

        let obj = {};
        for (let i = 0; i < result.length; i++) {
            if (i === 0) {
                obj['firstelement'] = { minval: "", maxval: "" };
            }
            else {
                obj[result[i]] = { minval: "", maxval: "" };
            }
        }
        setFilters(obj);
    };

    const xat = async (data, list) => {
        const delta = { reportid: state.alfa };

        const response3 = await fetchPostApi(API1, delta);
        const arr = {
            sensorname: "S0",
            head1: "Set Points",
            head2: "",
            unit: "",
            attribute: "firstelement",
            formtype: "",
        };
        const ttoo = []
        ttoo.push(arr);
        setPrevHeadingJson([...ttoo]);

        // if (callsetTable===false){
        // setTable(ttoo, data, list);
        //     setCallSetTable("tt");
        // }

        const pan = response3.body;
        var te = [[]];
        for (var i = 0; i < pan.length - 1; i++) {
            te[i] = Object.values(pan[i]);
        }

        // setHeadi2([arr, ...response3.secondheader]);
        setBodyData(te);
        setmin_date(te[0][0].substring(0, 10));
        setStartDate(te[0][0].substring(0, 10))
        setmax_date(te[te.length - 1][0].substring(0, 10));
        setEndDate(te[te.length - 1][0].substring(0, 10));
        setBody(te);
        const temp = {

            systems: description.systems,
            manufacturer: description.manufacturer,
            datebegin: te[0][0].substring(0, 10),
            timebegin: formValues.timebegin,
            dateend: te[te.length - 1][0].substring(0, 10),
            timeend: formValues.timeend,
            status1: "created",
            reportid: state.alfa,
            reportname: formValues.reportname,

        };
        console.log("secondfffffffffffffff", temp, formValues);
        setFormValues(temp);
        setFormValues(temp);
        const trial = Object.entries(response3.attributelist);
        delete trial.CurDT;
        delete trial.CurT;
        setOptions(trial);

    };

    const setTable = (prevheadingjson, data, list) => {
        const jso = generateSelectedArray(prevheadingjson, data, list);
        setAllHeading(jso.actuallyselectedAll);
        setHeading(jso.actuallyselected);
    };

    useEffect(() => {
        fetch2(API2, xx, clientname, nextversion, description, formValues);
        fetch4(API4);
        fetch5(API5);
        xat(data, list);

    }, []);

    const handlechange2 = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setdec({
            ...description,
            [name]: value,
        });
        // console.log("eventttttttt",e);
    };

    const filterbody = (bodydata, startdate, enddate, timeBegin, timeEnd) => {
        const filteredData = [];

        for (let i = 0; i < bodydata.length; i++) {
            var temp = bodydata[i][0];
            let rowdata = temp.replace(/T/g, " ");
            let dotIndex = rowdata.indexOf(".");
            if (dotIndex >= 0) {
                rowdata = rowdata.substring(0, dotIndex);
            }

            // console.log(rowdata);
            const startpoint = startdate + " " + timeBegin;
            const endpoint = enddate + " " + timeEnd;
            if (rowdata >= startpoint && rowdata <= endpoint) {
                filteredData.push(bodydata[i]);
            }
        }
        return filteredData;
    };

    const handleChange = (event, bodydata, startdate, enddate, timeBegin, timeEnd) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log("ffffffffffffffffffffffffffff", formValues);
        setFormValues({
            ...formValues,
            [name]: value,
        });

        if (name === 'datebegin') {

            setStartDate(value);
            setBody(filterbody(bodydata, value, enddate, timeBegin, timeEnd));
        }
        else if (name === 'dateend') {
            setEndDate(value);
            setBody(filterbody(bodydata, startdate, value, timeBegin, timeEnd));
        }
        else if (name === 'timebegin') {
            setTimeBegin(value);
            setBody(filterbody(bodydata, startdate, enddate, value, timeEnd));
        }
        else if (name === "timeend") {
            setTimeEnd(value);
            setBody(filterbody(bodydata, startdate, enddate, timeBegin, value));
        }
        else if (name === "reportname") {
            setReportname(value);
        }
        else if (name === "systems") {
            setSystem(value);
        }
        else if (name === "manufacturer") {
            setManufacturer(value)
        }

    };

    const handleInputChange = (e, row, col, jso) => {
        e.preventDefault();
        let index = -1;
        for (let j = 0; j < allheading.length; j++) {
            if (allheading[j].jso.head1 === jso.head1 && allheading[j].jso.head2 === jso.head2 && allheading[j].jso.unit === jso.unit) {
                index = j;
                break;
            }
        }

        if (index !== -1) {
            let temp = allheading[index].dat;
            temp[row] = e.target.value;

            const jj = { jso: allheading[index].jso, dat: temp };
            var tempallheading = allheading;
            tempallheading[index] = jj;
            setAllHeading([...tempallheading]);
        }
    };

    const handleSelectChange = (e, row, col, jso) => {
        let index = -1;
        for (let j = 0; j < allheading.length; j++) {
            if (allheading[j].jso.head1 === jso.head1 && allheading[j].jso.head2 === jso.head2 && allheading[j].jso.unit === jso.unit) {
                index = j;
                break;
            }
        }
        if (index !== -1) {
            let temp = allheading[index].dat;
            temp[row] = e.target.value;

            //  const arr = options;
            // for (let i = 0; i < arr.length; i++) {
            //     if (arr[i][0] === e.target.value) {
            //       temp[row]=arr[i][1];
            //       arr.splice(i, 1);
            //       i--; 
            //       break;
            //     }
            //   }

            const jj = { jso: allheading[index].jso, dat: temp };
            var tempallheading = allheading;
            tempallheading[index] = jj;
            setAllHeading([...tempallheading]);
        }
        // isSelected === false? setIsselected(true):setIsselected(false);
    };

    const showSelect = (options, val) => {
        // console.log("optionsssssssssss",options,val)
        const arr = options;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] === val) {
                return arr[i][1];
                arr.splice(i, 1);
                i--;
                break;
            }
        }
        return "-";
    };

    const getUniqueSystems = [
        ...new Set(systemList.map((item) => item.systemname)),
    ];

    const getUniqueManu = [
        ...new Set(manufacturerList.map((item) => item.manufacturername)),
    ];

    const fetch6 = async (a, b, c) => {

        const gama = { databasename: a, tablename: b, formtype: c };
        const sensorlist = await fetchPostApi(API8, gama);
        setList(sensorlist);
        setList2(sensorlist);
    };

    if (description.databasename !== "" && description.table1 !== "" && description.formtype !== "" && (list.length === 0)) {
        fetch6(description.databasename, description.table1, description.formtype);
        fetch7(API9, { databasename: description.databasename, tablename: description.table1 });
    };

    const findMatchingHeadings = (allheadings, headings) => {
        console.log("allllllllll", allheading, "heeeeeeeeee", headings)
        const result = [];
        result.push(allheading[0]);
        // result.push(firstjson);
        allheadings.forEach((element) => {
            headings.forEach((headingElement) => {
                if (
                    element.jso.head1 === headingElement.head1 &&
                    element.jso.head2 === headingElement.head2 &&
                    element.jso.unit === headingElement.unit
                ) {
                    result.push(element);
                }
            });
        });
        return result;
    };

    const addheading = (selectedheadings) => {
        setHeading(findMatchingHeadings(allheading, selectedheadings));
    };

    const addheadi2 = (temp, data) => {
        setHeadi2([...temp]);
        setList2([...data]);
    };

    const headerRow = (heading) => {
        return (
            <tr>
                {heading.map((jj) => {
                    return <th key={jj.jso.sensorname}>
                        <div>{jj.jso.head1}</div>
                        <div>{jj.jso.head2}</div>
                        <div>{jj.jso.unit}</div>
                    </th>;
                })}
            </tr>
        );
    };

    const dataRows = (heading, data, prevheadingjson) => {
        let temp = [];
        if (heading.length > 0) {
            temp = heading[0].dat;
        }
        return (
            temp.map((row, rowIndex) => {
                if (rowIndex > 0) {
                    return (
                        <tr key={rowIndex}>
                            {heading.map((col, colIndex) => {
                                return (
                                    <>
                                        <td>  {colIndex === 0 ? (
                                            <input
                                                type="text"
                                                value={col.dat[rowIndex]}
                                                onChange={(e) => handleInputChange(e, rowIndex, colIndex, col.jso)}
                                            />
                                        ) :
                                            <select
                                                value={showSelect(options, col.dat[rowIndex])}
                                                onChange={(e) => handleSelectChange(e, rowIndex, colIndex, col.jso)
                                                }
                                            >
                                                <option value="-">{showSelect(options, col.dat[rowIndex])}</option>
                                                {options.map((cur, index) => (
                                                    <option key={index} value={cur[0]} >
                                                        {cur[0]}
                                                    </option>
                                                ))}
                                            </select>

                                        }
                                        </td>
                                    </>)
                            })}
                        </tr>
                    )
                };
            }));
    };

    const mergearrayx = (A, B) => {
        let merged = [];
        merged.push(B[0]);
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < B.length; j++) {
                if (A[i].head1 === B[j].head1 && A[i].head2 === B[j].head2 && A[i].unit === B[j].unit) {
                    merged.push(B[j]);

                    break;
                }
            }

        }
        return merged;
    };

    const shiftLeft = (headi2, list, json, index) => {
        if (index === 0) {
            return list;
        } else {
            const temp = headi2[index - 1];
            let result = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].head1 === temp.head1 && list[i].head2 === temp.head2 && list[i].unit === temp.unit) {
                    result.push(json);
                    result.push(list[i]);
                }
                else if (list[i].head1 === json.head1 && list[i].head2 === json.head2 && list[i].unit === json.unit) {
                    continue;
                }
                else {
                    result.push(list[i]);
                }
            }

            const result2 = mergearrayx(result, headi2);
            setList2([...result]);
            setHeadi2([...result2]);
        }
    };

    const shiftRight = (headi2, list, header, index) => {
        if (index === headi2.length) {
            return;
        } else {
            const temp = headi2[index + 1];
            let result = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].head1 === temp.head1 && list[i].head2 === temp.head2 && list[i].unit === temp.unit) {
                    result.push(list[i]);
                    result.push(header);
                }
                else if (list[i].head1 === header.head1 && list[i].head2 === header.head2 && list[i].unit === header.unit) {
                    continue;
                }
                else {
                    result.push(list[i]);
                }
            }

            const result2 = mergearrayx(result, headi2);
            setList2([...result]);
            setHeadi2([...result2]);
        }

    };

    const modifyJsonArray = (jsonArray, headingss) => {
        // console.log("ttttttttttttttttttttttttttttttttttttttttttttttttt",jsonArray);
        const result = [];
        if (Array.isArray(jsonArray) && jsonArray.length > 0) {
            for (let i = 0; i < jsonArray.length; i++) {
                if (i === 0) {
                    const temp = jsonArray[i].dat;
                    temp.push(" ");
                    result.push({ jso: jsonArray[i].jso, dat: temp })
                }
                else {
                    const temp1 = jsonArray[i].dat;
                    temp1.push("-");
                    result.push({ jso: jsonArray[i].jso, dat: temp1 })
                }
            }
        }
        setAllHeading(result);
    };

    const bodyindex = (row, attribute, atlist) => {
        // console.log("iiiiiiiiiiiiiiiiiiiiiii", attribute, row,  atlist);
        const index = atlist.indexOf(attribute);
        // console.log(index);

        if (index === -1) {
            if (attribute === "firstelement") {
                return row[0];
            }
            return "-";
        }
        else {
            return row[index];
        }
    };

    const bodytable = (row, headi2, atlist) => {
        // const temp=[];
        //  for(let i=0;i<headi2.length;i++){
        //      temp.push(row[headi2[i].attribute]);
        //  }
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjj",headi2);
        return (<tr className="finalformcreate-tr">
            {headi2.map((head, index) =>
                <td className="finalformcreate-td" >{bodyindex(row, head.attribute, atlist)}</td>)}
        </tr>)
    };

    const setOptionsMin = (body, atList, heading, allheading) => {
        console.log(heading, allheading)
        const temp = [];
        for (let i = 0; i < atList.length; i++) {
            if (body.length > 0) {
                temp.push([atList[i], body[0][i]]);
            }
            else {
                temp.push([atList[i], " "]);
            }
        }
        setOptions([...temp]);
        //  let tt=heading
        // setHeading([...tt]);
        // let jj=allheading
        // setAllHeading([...jj]);
    };

    const setOptionsMax = (body, atList, heading, allheading) => {
        const temp = [];
        for (let i = 0; i < atList.length; i++) {
            if (body.length > 0) {
                temp.push([atList[i], body[body.length - 1][i]]);
            }
            else {
                temp.push([atList[i], " "]);
            }
        }
        setOptions([...temp]);
        // let tt = heading
        // setHeading([...tt]);
        // let jj = allheading
        // setAllHeading([...jj]);
    };

    const Setfilter2 = (filte) => {
        console.log("flterererfdfeevev", filte)
        setfilters2(filte)
    }

    function jsonTo2DArray(jsonArray) {
        // get the keys of the JSON objects, excluding key 0
        const keys = Object.keys(jsonArray[0].dat).filter(key => key !== "0");

        // create an empty 2-D array with the same number of columns as the keys
        const result = new Array(keys.length).fill().map(() => []);

        // iterate over the keys and populate the 2-D array
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            for (let j = 0; j < jsonArray.length; j++) {
                result[i][j] = (jsonArray[j].dat)[key];
            }
        }

        return result;
    }

    const create2DArray = (headings) => {
        const array2D = jsonTo2DArray(headings);
        const setpointarray = [];
        // Loop through each JSON object in the array
        for (let i = 0; i < headings.length; i++) {
            if (i > 0) {
                setpointarray.push({ sensorname: headings[i].jso.sensorname, reportid: state.alfa, order1: i })
            }
        }

        return { arr: { reportid: state.alfa, setdata: array2D }, setpointarray };
    }

    const normalPoint = (headi2) => {
        const normalPoint = [];
        for (let i = 0; i < headi2.length; i++) {
            if (i > 0) {
                normalPoint.push({ reportid: state.alfa, sensorname: headi2[i].sensorname, attribute: headi2[i].attribute, order1: i })
            }
        }
        return normalPoint;
    }

    const handlesub = async () => {
        const temp = { ...formValues, systems: System, manufacturer: Manufacturer, reportname: Reportname }
        // console.log("ttpppppppppppppttttttttttttttppppppppp",headi2)

        const dd = create2DArray(heading);
        const t = normalPoint(headi2);
        //    console.log("ttttttttttt",t,"ddddddddddddddd",dd)
        // console.log('temptempteeeeeeeeeeeeeeemp',dd.arr.setdata);
        const e = await fetchPostApi(API14, { reportid: xx.reportid, filter1: filters2 })
        console.log("dddddddddddddddddddd", e);

        const a = await updatetables(API13, temp);
        console.log("aaaaaaaaaaaaaaaaa", a);
        const b = await fetchPostApi(API10, t);
        console.log("BBBBBBBBBBBBBBBBBBBB", b)
        const c = await fetchPostApi(API11, dd.setpointarray);
        console.log("cccccccccccccccccc", c)
        const d = await fetchPostApi(API12, dd.arr);
        console.log("iiiiiiiiiiiiiii", d);
        alert('Report Created successfully!');
    }

    const filtbody = (bodyy) => {
        console.log(bodyy);
    }
    return (
        <>
            <div className="finalformcreate-container">
                <table
                    className="finalformcreate-table "
                    htmlFor="#table"
                    style={{ borderWidth: "3px", borderColor: "black" }}
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
                                        value={Reportname}
                                        onChange={handleChange}
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
                                        // placeholder={description.datebegin}
                                        name="datebegin"
                                        value={startdate}
                                        min={min_date}
                                        max={max_date}
                                        // disabled={!min_date}
                                        onChange={(e) => handleChange(e, bodydata, startdate, enddate, timeBegin, timeEnd)}
                                    />
                                    {/* </div> */}

                                    <input
                                        className="formcreate-select"
                                        type="time"
                                        id="timebegin"
                                        name="timebegin"
                                        value={timeBegin}
                                        onChange={(e) => handleChange(e, bodydata, startdate, enddate, timeBegin, timeEnd)}
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
                                    value={enddate}
                                    onChange={(e) => handleChange(e, bodydata, startdate, enddate, timeBegin, timeEnd)}
                                    //date end not before date begin
                                    min={startdate}
                                    max={max_date}
                                    disabled={!startdate}

                                />
                                <input
                                    className="formcreate-select"
                                    type="time"
                                    id="timeend"
                                    name="timeend"
                                    value={timeEnd}
                                    onChange={(e) => handleChange(e, bodydata, startdate, enddate, timeBegin, timeEnd)}
                                    disabled={!startdate}
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
                    style={{ borderWidth: "3px", borderColor: "black" }}>
                    <thead className="finalformcreate-thead">
                        {headerRow(heading)}
                    </thead>

                    <tbody className="finalformcreate-tbody">
                        {dataRows(heading, data, prevheadingjson)}
                    </tbody>
                </table>
                <div style={{ display: "flex" }}>
                    <button className="add-button" onClick={() => setTable(prevheadingjson, data, list)}>Reset</button>
                    {/* <button className="add-button" onClick={() => setTable(prevheadingjson, data, list)}>Reset</button> */}
                    <ButtonWithModal Data={list} markedData={prevheadingjson} style={{ zIndex: "3" }} addheading={addheading} />
                    {/* <button className="add-button" onClick={()=>setOptionsMin(body,atList,heading,allheading)}>Min</button>
          <button className="add-button" onClick={() => setOptionsMax(body, atList, heading, allheading)}>Max</button>
          */}
                    <div className={`wrapper ${isActive ? 'active' : ''}`}>
                        <button className="btn" onClick={toggleOptions}>
                            <i className={`ri ${isActive ? 'ri-close-line' : 'ri-share-line'}`}></i>
                        </button>
                        <ul className="list">
                            <li className="item" onClick={() => setOptionsMin(body, atList, heading, allheading)}>
                                <a className="link ig">
                                    Min
                                </a>
                            </li>
                            <li className="item" style={{ '--d': '0.25s' }} onClick={() => setOptionsMax(body, atList, heading, allheading)}>
                                <a className="link tw">
                                    Max
                                </a>
                            </li>
                            <li className="item" style={{ '--d': '0.5s' }} onClick={() => modifyJsonArray(allheading, heading)}>
                                <a className="link sc">
                                    Add Row
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>-
                <table className="finalformcreate-table "
                    htmlFor="#table3"
                    style={{ borderWidth: "3px", borderColor: "black" }}>
                    <tbody className="finalformcreate-tbody">
                        <tr className="finalformcreate-tr">
                            {headi2.map((header, col) => (
                                <th className="finalformcreate-th" key={col}>
                                    {col > 1 ? (col < headi2.length - 1 ?
                                        <th>
                                            <button type='button' onClick={() => shiftLeft(headi2, list, header, col)}>Left</button>
                                            <tr>{header.head1}</tr>
                                            <tr>{header.head2}</tr>
                                            <tr>{header.unit}</tr>
                                            <button type='button' onClick={() => shiftRight(headi2, list, header, col)}>Right</button>
                                        </th>
                                        :
                                        <th>
                                            <button type='button' onClick={() => shiftLeft(headi2, list, header, col)}>Left</button>
                                            <tr>{header.head1}</tr>
                                            <tr>{header.head2}</tr>
                                            <tr>{header.unit}</tr>
                                        </th>
                                    ) : (
                                        <>
                                            {col === 1 ? (
                                                <th>
                                                    <tr>{header.head1}</tr>
                                                    <tr>{header.head2}</tr>
                                                    <tr>{header.unit}</tr>
                                                    <button type='button' onClick={() => shiftRight(headi2, list, header, col)}>Right</button>
                                                </th>
                                            ) : (
                                                <th>
                                                    <tr>{ }</tr>
                                                    <tr>{header.head2}</tr>
                                                    <tr>{header.unit}</tr>
                                                </th>
                                            )}
                                        </>
                                    )}
                                </th>
                            ))}
                            <Modal2 initialData={list2} markedData={headi2} dropdowndata={atList} addheadi2={addheadi2} style={{ zIndex: "3" }} />
                        </tr>
                    </tbody>

                    {atList.length > 0 ? <Bodytable headi2={headi2} bodydata={bodydata} body={body} atList={atList} filt={filters} minDateAndTime={description.datebegin + 'T' + description.timebegin + ':00.000Z'} maxDateAndTime={description.dateend + 'T' + description.timeend + ':59.000Z'} visib={"EDIT"} Setfilter2={Setfilter2} /> : ""}

                </table>

            </div>
            <button className="add-button" onClick={() => handlesub(data, filters)}>Final</button>
        </>
    );
}
export default ViewBoard;


