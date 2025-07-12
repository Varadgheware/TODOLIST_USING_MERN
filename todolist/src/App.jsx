import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './navbar'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa';

function App() {
  const [task, setTask] = useState("")
  const [data, setData] = useState([])

  // Fetch all todos from backend
  const getData = () => {
    axios.get('http://localhost:3000/getlogin')
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const Handlebutton2 = () => {
     axios.put("http://localhost:3000/getupdate")
     .then(result =>{
        console.log(result);
     })
     .catch(err=>{
      console.log(err);
     })
  }
  const Handlebutton = () => {
    if (!task) return;
    axios.post("http://localhost:3000/getlogin", { task: task })
      .then(result => {
        setTask("");
        getData();
      })
      .catch(error => console.log(error))
  }

  const handleDone = (id) => {
    axios.put(`http://localhost:3000/getupdate/${id}`)
      .then(() => getData())
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/getdelete/${id}`)
      .then(() => getData())
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="mainclass">
        <h2>TO DO LIST</h2>
        <input type="text" placeholder='Enter Text' id='textholder' value={task} onChange={(e) => setTask(e.target.value)} />
        <span className="button"><button type="button" onClick={Handlebutton}>ADD</button></span>
      </div>
      <div className="result">
        <h3>Results</h3>
        {data.length === 0 ? (
          <h2>No result</h2>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {data.map((k, ind) => (
              <li key={k._id || ind} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                <button className="circle-green" type='button' onClick={() => handleDone(k._id)}></button>
                <span style={{ marginLeft: '10px', textDecoration: k.done ? 'line-through' : 'none' }}>{k.task}</span>
                <FaTrash style={{ marginLeft: '15px', color: 'black', cursor: 'pointer' }} onClick={() => handleDelete(k._id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
