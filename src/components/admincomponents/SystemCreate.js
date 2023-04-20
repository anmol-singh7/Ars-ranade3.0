import React, { useState } from 'react';
import "./componentscss/SystemCreate.css";
import {fetchPostApi} from "../../api/singlecall"

function SystemCreate() {
  const URL=process.env.REACT_APP_URL
  const [formValues, setFormValues] = useState({
    systemid: '',
    systemname: '',
    logoid: '',
       logopath: '',
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
      // Save the image file to the systemlogostore directory
      const fileName = `${formValues.systemid}_${formValues.logoid}_${file.name}`;
      const filePath = `../systemlogostore/${fileName}`;
      fetch(filePath, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      }).then(() => {
        setFormValues({
          ...formValues,
          logopath: filePath,
        });
      });
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API=URL+"addsystems";

      try {
        const result = await fetchPostApi(API,formValues);
        console.log(result); // do something with the result
        alert('Data saved successfully!');

      } catch (error) {
        console.log(error); // handle the error
        alert('Error in submitting the data! Please fill the data again.');
      }
    console.log(formValues);
  };

  return (
    <div className="systemcreate-div">
    <label>
      <h1 className="systemcreate-h1">Add System</h1>
    </label>
    <div className="formcenter">

    <form className='systemcreate-form' onSubmit={handleSubmit}>
      <div className='systemcreate-div2' >
        <label className='systemcreate-label2' htmlFor="systemid">System ID:</label>
        <div class="error-message">*This field is mandatory</div>
        <input className='systemcreate-input' 
          type="text"
          id="systemid"
          name="systemid"
          value={formValues.systemid}
          onChange={handleInputChange}
        />
      </div>
      <div className='systemcreate-div2' >
        <label className='systemcreate-label2' htmlFor="systemname">System Name:</label>
        <div class="error-message">*This field is mandatory</div>
        <input className='systemcreate-input' 
          type="text"
          id="systemname"
          name="systemname"
          value={formValues.systemname}
          onChange={handleInputChange}
        />
      </div>
      <div className='systemcreate-div2' >
        <label className='systemcreate-label2'  htmlFor="logoid">Logo ID:</label>
        <div class="error-message">*This field is mandatory</div>
        <input className='systemcreate-input' 
          type="text"
          id="logoid"
          name="logoid"
          value={formValues.logoid}
          onChange={handleInputChange}
        />
      </div>
      <div className='systemcreate-div2' >
        <label className='systemcreate-label2'  htmlFor="logo">Logo:</label>
        <div class="error-message">*This field is mandatory</div>
        <input className='systemcreate-input' 
          type="file"
          id="logo"
          name="logo"
          onChange={handleLogoChange}
        />
      </div>
      <input className='systemcreate-button'  type="submit" value="Submit" />
      <input className='systemcreate-input'  type="hidden" id="logopath" name="logopath" value={formValues.logopath} />
    </form>
    </div>
    </div>
  );
}

export default SystemCreate;