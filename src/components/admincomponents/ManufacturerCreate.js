import React, { useState } from 'react';
import "./componentscss/ManufacturerCreate.css";
import {fetchPostApi} from "../../api/singlecall"

function ManufacturerCreate() {
  const URL=process.env.REACT_APP_URL;
  const [formValues, setFormValues] = useState({
    manufacturerid: '',
    manufacturername: '',
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
      // Save the image file to the manufacturerlogostore directory
      const fileName = `${formValues.manufacturerid}_${formValues.logoid}_${file.name}`;
      const filePath = `../manufacturerlogostore/${fileName}`;
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
    // Here you can use the form data (formValues.manufacturerId, formValues.manufacturerName, formValues.logoid, formValues.logopath)
    // to submit the form to your backend or do whatever you need to do
     const API=URL+"addmanufacturer";

      try {
        const result = await fetchPostApi(API,formValues);
        console.log(result); // do something with the result
        alert('Data submitted successfully!');
      } catch (error) {
        console.log(error); // handle the error
        alert('Error in submitting the data! Please fill again!');
      }
    console.log(formValues);
  };

  return (
    <div className="manufacturercreate-div">
    <label>
      <h1 className="manufacturercreate-h1">Add New Manufacturer</h1>
    </label>
    <div className="formcenter">
    <form  className='manufacturercreate-form' onSubmit={handleSubmit}>
      <div className='manufacturercreate-div2'>
        <label className='manufacturercreate-label2' htmlFor="manufacturerid">Manufacturer ID:</label>
        <div class="error-message">*This field is mandatory</div>
        <input className='manufacturercreate-input'
          type="text"
          id="manufacturerid"
          name="manufacturerid"
          value={formValues.manufacturerid}
          onChange={handleInputChange}
        />
      </div>
      <div className='manufacturercreate-div2'>
        <label className='manufacturercreate-label2' htmlFor="manufacturername">Manufacturer Name:</label>
        <div class="error-message">*This field is mandatory</div>
        <input className='manufacturercreate-input'
          type="text"
          id="manufacturername"
          name="manufacturername"
          value={formValues.manufacturername}
          onChange={handleInputChange}
        />
      </div>
      <div className='manufacturercreate-div2'>
        <label className='manufacturercreate-label2' htmlFor="logoid">Logo ID:</label>
        <div class="error-message">*This field is mandatory</div>
        <input className='manufacturercreate-input'
          type="text"
          id="logoid"
          name="logoid"
          value={formValues.logoid}
          onChange={handleInputChange}
        />
      </div>
      <div className='manufacturercreate-div2'>
        <label className='manufacturercreate-label2' htmlFor="logo">Logo:</label>
        <div class="error-message">*This field is mandatory</div>
        <input className='manufacturercreate-input'
          type="file"
          id="logo"
          name="logo"
          onChange={handleLogoChange}
        />
      </div>
      <input  className='manufacturercreate-button' type="submit" value="Submit" />
      <input className='manufacturercreate-button' type="hidden" id="logopath" name="logopath" value={formValues.logopath} />
    </form>
    </div>
    </div>
  );
}

export default ManufacturerCreate;
