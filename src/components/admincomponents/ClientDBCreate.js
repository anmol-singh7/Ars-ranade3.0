import React, { useState } from "react";
import "./componentscss/ClientDBCreate.css";
import { fetchPostApi } from "../../api/singlecall";

function ClientDBCreate() {
  const URL=process.env.REACT_APP_URL;
  const [formValues, setFormValues] = useState({
    clientid: "",
    clientname: "",
    hostofdatabase: "",
    userofdatabase: "",
    passwordofdatabase: "",
    databasename: "",
    waitForConnections: 1,
    connectionLimit: 5,
    queueLimit: 0,
  });
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // setFormValues({
      //   ...formValues,
      //   logo: reader.result,
      // });
      // Save the image file to the clientlogostore directory
      const fileName = `${formValues.clientid}_${formValues.logoId}_${file.name}`;
      const filePath = `../clientlogostore/${fileName}`;
      fetch(filePath, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      }).then(() => {
        setFormValues({
          ...formValues,
          logoPath: filePath,
        });
      });
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can use the form data (formValues.clientId, formValues.clientName, formValues.logoId, formValues.logoPath)
    // to submit the form to your backend or do whatever you need to do
    console.log(formValues);
    const API =URL+"addCredential";
    try {
      const result = await fetchPostApi(API, formValues);
      console.log(result); // do something with the result
      alert('Data saved successfully!');
    } catch (error) {
      console.log(error); // handle the error
      alert('Some Error Occurred! ');

    }

    console.log(formValues);
  };

  return (
    <div className="clientdbcreate-div">
      <label>
        <h1 className="clientdbcreate-h1">Add New Client</h1>
      </label>
<div className="formcenter">
      <form className="clientdbcreate-form" onSubmit={handleSubmit}>
        <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="clientid">
            Client ID:
          </label>
          <div class="error-message">*This field is mandatory</div>
          <input
            className="clientdbcreate-input"
            type="text"
            id="clientid"
            name="clientid"
            placeholder=" Enter the Client ID"
            value={formValues.clientid}
            onChange={handleInputChange}
          />
        </div>
        <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="clientname">
            Client Name:
          </label>
          <div class="error-message">*This field is mandatory</div>

          <input
            className="clientdbcreate-input"
            type="text"
            id="clientname"
            name="clientname"
            placeholder=" Enter the Client Name"
            value={formValues.clientname}
            onChange={handleInputChange}
          />
        </div>
        <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="hostofdatabase">
            Host:
          </label>
          <div class="error-message">*This field is mandatory</div>

          <input
            className="clientdbcreate-input"
            type="text"
            id="hostofdatabase"
            name="hostofdatabase"
            placeholder=" Enter the Host"
            value={formValues.hostofdatabase}
            onChange={handleInputChange}
          />
        </div>

        <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="userofdatabase">
            User :
          </label>
          <div class="error-message">*This field is mandatory</div>

          <input
            className="clientdbcreate-input"
            type="text"
            id="userofdatabase"
            name="userofdatabase"
            placeholder=" Enter User"
            onChange={handleInputChange}
          />
        </div>

        <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="logo">
            Logo:
          </label>
          <div class="error-message">*This field is mandatory</div>

          <input
            className="clientdbcreate-input"
            type="file"
            id="logo"
            name="logo"
            placeholder=" Attach Required Logo"
            onChange={handleLogoChange}
          />
        </div>
        <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="passwordofdatabase">
            Password :
          </label>
          <div class="error-message">*This field is mandatory</div>

          <input
            className="clientdbcreate-input"
            type="password"
            id="passwordofdatabase"
            name="passwordofdatabase"
            placeholder=" Enter your Password"

            onChange={handleInputChange}
          />
        </div>

        <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="databasename">
            Database Name :
          </label>
          <div class="error-message">*This field is mandatory</div>

          <input
            className="clientdbcreate-input"
            type="text"
            id="databasename"
            name="databasename"
            placeholder=" Enter the Database Name"
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="connectionLimit">
            Connections :
          </label>
          <div class="error-message">*This field is mandatory</div>

          <input
            className="clientdbcreate-input"
            type="text"
            id="connectionLimit"
            name="connectionLimit"
            placeholder=" Enter the Connections"
            onChange={handleInputChange}
          />
        </div> */}
{/* 
        <div className="clientdbcreate-div2">
          <label className="clientdbcreate-label2" htmlFor="queueLimit">
            Queue Limit :
          </label>
          <div class="error-message">*This field is mandatory</div>

          <input
            className="clientdbcreate-input"
            type="text"
            id="queueLimit"
            name="queueLimit"
            placeholder=" Enter Queue Limit"
            onChange={handleInputChange}
          />
        </div> */}
        <div className="clientdbcreate-div2">
          </div>
        <div className="clientdbcreate-div2">
        <input className="clientdbcreate-button" type="submit" value="Submit" />
        <input
          className="clientdbcreate-button"
          type="hidden"
          id="userofdatabase"
          name="userofdatabase"
          value={formValues.logoPath}
        />
        </div>
        
      </form>
      </div>
    </div>
  );
}

export default ClientDBCreate;
