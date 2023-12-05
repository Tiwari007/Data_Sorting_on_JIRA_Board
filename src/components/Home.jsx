import React, { useState, useEffect } from "react";

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const tempData = localStorage.getItem("data");
        setData(JSON.parse(tempData));
    }, []);

const editHandler = (id) => {
    // with the use of id we can filter out the data 
    // using filter method

    const newData = data.filter((singleData) => singleData.id === id)
    setData(newData);
}

const deleteHandler = (id) => {
    //  same as edit we can filter out the data using filter method
    const newData = data.filter((singleData) => singleData.id !== id)
    setData(newData);
}

    return (
        <div>
            {data && (  // Here we have to map through the data the key is coming from data index. by which we can edit or delete 
            // that particular data
                <div>
                    return (
                    <div key={data.id}>
                        <button type="button" onClick={editHandler(id)}>Edit</button>
                        <button type="button" onClick={deleteHandler(id)}>Delete</button>
                        <h1>{data.name}</h1>
                        <h1>{data.age}</h1>
                        <h1>{data.email}</h1>
                    </div>
                    );
                </div>
            )}
        </div>
    );
};

export default Home;
