import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#3490dc',
    color: '#fff',
    padding: '8px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  cardButton: {
    backgroundColor: '#3490dc',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '4px',
    marginRight: '5px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  },
  deleteButton: {
    backgroundColor: '#e3342f',
    color: '#fff',
    padding: '8px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    marginRight: '10px',
  },
  modal: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
      width: '300px',
      margin: 'auto',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }
  },
  input: {
    border: '1px solid black',
    margin: '4px'
  },
  jiraGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    height: '100vh',
    marginTop: '10px',
  },
  gridItem: {
    border: '1px solid #ddd',
    padding: '20px',
    textAlign: 'center',
  },
};

Modal.setAppElement('#root');

const App = () => {

  //set some initial data show it shows something on the board
  const [data, setData] = useState([
    {
      id: Math.floor(Math.random() * 1000),
      name: "Vivek",
      email: "vt@mail.com",
      phone: "98883",
      age: 24
    },
    {
      id: Math.floor(Math.random() * 1000),
      name: "Bucky",
      email: "buck@mail.com",
      phone: "988898",
      age: 90
    },
    {
      id: Math.floor(Math.random() * 1000),
      name: "Vicky",
      email: "vicky@mail.com",
      phone: "9888376",
      age: 8
    }
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', age: '' });
  const [isEdit, setIsEdit] = useState(0);
  const [categorizedData, setCategorizedData] = useState({
    'Age 1-18': [],
    'Age 19-25': [],
    'Age 26-45': [],
    'Age 45+': [],
  });
  const [search, setSearch] = useState("")

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData')) || data;
    setData(storedData);
  }, []);

  useEffect(() => {
    console.log("data", data);

    // Create a copy of the current state to avoid mutating it directly
    const newCategorizedData = {
      'Age 1-18': [],
      'Age 19-25': [],
      'Age 26-45': [],
      'Age 45+': [],
    };

    data.forEach(person => {
      console.log("person", person);

      if (+person.age <= 18) {
        console.log("triggered Age 1-18");
        newCategorizedData['Age 1-18'].push(person);
      } else if (+person.age <= 25) {
        console.log("triggered Age 19-25");
        newCategorizedData['Age 19-25'].push(person);
      } else if (+person.age <= 45) {
        console.log("triggered Age 26-45");
        newCategorizedData['Age 26-45'].push(person);
      } else {
        console.log("triggered Age 45+");
        newCategorizedData['Age 45+'].push(person);
      }
    });

    // Update state with the new categorizedData
    setCategorizedData(newCategorizedData);

  }, [data]);

    // Partially Working 
  // When we type in search box it check the name that matches and store in the categorizedData.
  // That will show only that data we are looking for 

  // useEffect(() => {
  //   const temp = data.filter(single => single?.name?.toLowerCase().includes(search?.toLowerCase()))
  //   setCategorizedData(temp)
  // }, [search])


  // This Works Perfectly Fine
  const openModal = () => {
    setModalIsOpen(true);
  };


  // This Works Perfectly Fine
  const closeModal = () => {
    setModalIsOpen(false);
  };


  // This Works Perfectly Fine
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // This Works Perfectly Fine
  const handleSubmit = () => {

    if(isEdit){
      let tempData = data.filter(single => single.id !== isEdit)
      let newData = [...tempData, formData]
      localStorage.setItem('userData', JSON.stringify(newData));
      setData(newData);
      setModalIsOpen(false);
    }
    else{
      let newData =[...data, formData]
      localStorage.setItem('userData', JSON.stringify(newData));
      setData(newData);
      setModalIsOpen(false);
    }
  };


  // This Works Perfectly Fine
  const handleCancel = () => {
    setFormData({ name: '', phone: '', email: '', age: '' });
    setModalIsOpen(false);
  }


  // Partially Working (⚠)
  const handleEdit = (id) => {
    const editData = data.filter(single => single.id === id);
    console.log("editData ", editData);
    setFormData(editData[0]);
    setModalIsOpen(true);
    setIsEdit(id)
  };


  // This Works Perfectly Fine
  const handleDelete = (id) => {
    const newData = data.filter(singleData => singleData.id !== id)
    localStorage.setItem('userData', JSON.stringify(newData));
    setData(newData);
  };



  // Sort the array of object by name 

  // const sortByNameHandler = () => {
  //   const tempData = data.sort(function (a, b) {
  //     if (a.name < b.name) {
  //       return -1;
  //     }
  //     if (a.name > b.name) {
  //       return 1;
  //     }
  //     return 0;
  //   });

  //   setCategorizedData(tempData)
  // }




  const GridItem = ({ title, data }) => {
    return (
      <div style={styles.gridItem}>
        <h2>{title}</h2>
        <div>
          {
            data && data?.map((user, index) => {
              return (
                <div key={index} style={styles.card}>
                  <p style={styles.label}>Name: {user.name}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Email: {user.email}</p>
                  <p>Age: {user.age}</p>
                  <div style={{ marginTop: '10px' }}>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ ...styles.cardButton, ...styles.deleteButton }}
                    >
                      Delete
                    </button>
                    <button onClick={() => handleEdit(user.id)} style={styles.cardButton}>
                      Edit
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  };

 




  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Age Grid Application</h1>

      <button onClick={openModal} style={styles.addButton}>
        Add User
      </button>
      <span className='ml-4'>
        <label htmlFor='search'>🔍 <input placeholder='Search by Name (Partially Completed)' type='text' onChange={(e) => setSearch(e.target.value)} style={{border: '1px solid black', padding: '6px'}} /></label>
      </span>
      <span className='ml-4'>
      <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Sort By Name</button>
      </span>
      

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={styles.modal}>
        <div>
          <h2 style={{ ...styles.heading, marginBottom: '20px' }}>Add User</h2>
          <form>
            <div style={{ marginBottom: '10px' }}>
              <label style={styles.label}>Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={styles.label}>Phone:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={styles.label}>Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={styles.label}>Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
            </div>
            <button type="button" onClick={handleCancel} style={styles.deleteButton}>
              CANCEL
            </button>
            <button type="button" onClick={handleSubmit} style={styles.addButton}>
              ADD
            </button>
          </form>
        </div>
      </Modal>



      {/* Here we have to create a grid(table) of four coulmns */}

      <div style={styles.jiraGrid}>
        {/* We have to map through the data and check the age for the data according t that
        we have send the data in that grid.
        
        Note: - For that let's create a card what it looks like */}

        {
          Object.keys(categorizedData).map(ageGroup => (
            <GridItem key={ageGroup} title={`Grid ${ageGroup}`} data={categorizedData[ageGroup]} />
          ))
        }
      </div>
    </div>
  );
};

export default App;
