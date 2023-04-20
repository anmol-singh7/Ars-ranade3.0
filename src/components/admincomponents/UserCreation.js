import React from "react";
import { useState } from "react";
import "./componentscss/UserCreation.css";
import { Link } from "react-router-dom";
import { fetchPostApi } from "../../api/singlecall";

const UserCreation = () => {
  const URL = process.env.REACT_APP_URL;

  const [values, setValues] = useState({
    userid: "",
    username: "",
    employid: "",
    department: "",
    usertype: "",
    phonenumber: "",
    email: "",
    password: "",
    userstatus: "active",
  });

  const HanleSubmit = async (event) => {
    event.preventDefault();
    console.log("====finalobj====", values);
    const {
      userid,
      username,
      employid,
      department,
      usertype,
      phonenumber,
      email,
      userstatus,
    } = values;
    const password = `${username.substring(0, 3)}${phonenumber.slice(-3)}`;
    const newUser = {
      userid,
      username,
      employid,
      department,
      usertype,
      phonenumber,
      email,
      password,
      userstatus,
    };
    const API = URL + "addusers";

    try {
      const result = await fetchPostApi(API, newUser);
      console.log(result); // do something with the result
      alert('Data saved successfully!');
    } catch (error) {
      console.log(error); // handle the error
      alert('Error in submitting the data! Please fill the data again');
    }
  };


  const handleSelectChange = (e) => {
    const { value } = e.target;
    setValues({
      ...values,
      usertype: value,
    });
    console.log(values);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };



  return (
    <div className="usercreation-div">
      <label>
        <h1 className="usercreation-h1">Create New User</h1>
      </label>
      <div className="formcenter">
      <form className="usercreation-form" onSubmit={HanleSubmit}>
        <div className="usercreation-div2">

          <label className="usercreation-label-2">User ID</label>
          <div class="error-message">*This field is mandatory</div>
          <input
            className="usercreation-input"
            type="text"
            id="userid"
            name="userid"
            value={values.userid}
            onChange={changeHandler}
            placeholder=" Enter your User Id"
            required
          />
         
        </div>

        <div className="usercreation-div2">
          <label className="usercreation-label-2">Username</label>
          <div class="error-message">*This field is mandatory</div>
          <input
            className="usercreation-input"
            type="text"
            id="username"
            name="username"
            placeholder=" Enter your Username"

            value={values.username}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="usercreation-div2">
          <label className="usercreation-label-2">Employee ID</label>
          <div class="error-message">*This field is mandatory</div>
          <input
            className="usercreation-input"
            type="text"
            id="employid"
            name="employid"
            placeholder=" Enter your Employee ID"
            value={values.employid}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="usercreation-div2">
          <label className="usercreation-label-2">Department</label>
          <div class="error-message">*This field is mandatory</div>
          <input
            className="usercreation-input"
            type="text"
            id="department"
            name="department"
            placeholder=" Enter your Department"
            value={values.department}
            onChange={changeHandler}
          />
        </div>
        <div className="usercreation-div2">
          <label className="usercreation-label-2">User Type</label>
          <div class="error-message">*This field is mandatory</div>
          <select
            className="usercreation-select"
            id="usertype"
            name="usertype"
            placeholder=" Select User Type"
            onChange={changeHandler}
            required
          >
            <option className="usercreation-label-2" value="">
              Select User Type
            </option>
            <option className="usercreation-input" value="admin">
              Admin
            </option>
            <option className="usercreation-input" value="approver">
              Approver
            </option>
            <option className="usercreation-input" value="checker">
              Checker
            </option>
            <option className="usercreation-input" value="creator">
              Creator
            </option>
          </select>
        </div>
        <div className="usercreation-div2">
          <label className="usercreation-label-2">Phone Number*</label>
          <div class="error-message">*This field is mandatory</div>
          <input
            className="usercreation-input"
            type="tel"
            id="phonenumber"
            name="phonenumber"
            placeholder=" Enter your Phone Number"
            
            value={values.phonenumber}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="usercreation-div2">
          <label className="usercreation-label-2">Email*</label>
          <div class="error-message">*This field is mandatory</div>
          <input
            className="usercreation-input"
            type="email"
            id="email"
            name="email"
            placeholder=" Enter your Email"
            value={values.email}
            onChange={changeHandler}
            required
          />
        </div>
        <div>
          <button className="usercreation-button" type="submit">
            <Link to="/admin">Back</Link>
          </button>

          <button className="usercreation-button" type="submit">
            Enter
          </button>
          {/* <button type="button" onClick={(()=>console.log(values))}> </button> */}
        </div>
      </form>
      </div>
    </div>
  );
};

export default UserCreation;
