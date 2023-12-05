import React, { useState } from "react";

const CreateDetails = () => {

  const [data, setData] = useState({
    id: Math.floor(Math.random() * 100),
    name: "",
    email: "",
    phone: "",
    age: ""
  })

  const submitHandler = (e) => {
      e.preventDefault()
      console.log("hELLO");
      console.log("data", data);

      // We have two choices either we can store the data into localStorage or in store(contextAPI/ Redux) this second one takes toomuch time 
      // So let's go with local storage.


      localStorage.setItem("data", JSON.stringify(data))
  }
  return (
    <form>
      <label htmlFor="name">Name
        <input type="text" id="name" onChange={(e) => setData({...data, name: e.target.value})} required />
      </label>
      <label htmlFor="email">E-Mail
        <input type="email" id="email" onChange={(e) => setData({...data, email: e.target.value})} required />
      </label>
      <label htmlFor="phone">Phone
        <input type="phone" id="phone" onChange={(e) => setData({...data, phone: e.target.value})} required />
      </label>
      <label htmlFor="age">Age
        <input type="age" id="age" onChange={(e) => setData({...data, age: e.target.value})} required />
      </label>
      <button type="button">Cancel</button>
      <button type="submit" onClick={(e) => submitHandler(e)}>Add</button>
    </form>
  );
};

export default CreateDetails;
