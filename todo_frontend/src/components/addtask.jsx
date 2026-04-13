import React, {useState} from "react";
import { createTask } from "../api/api";
import { useNavigate } from "react-router-dom";  


const AddTask = ({onTaskAdded}) =>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate(); 

    const handleADD =()=>{
        if(!title) return;
        createTask({title,description})
        .then(()=>{
            setTitle("");
            setDescription("");
            onTaskAdded();  // refresh task list
        })
    }

    return(
        <div
        style={{
        backgroundColor: "#fff9c4", // light yellow for whole screen
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
        
        >
        <div
        style={{
        backgroundColor: "#fff9c4", // light yellow card
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        fontFamily: "Arial, sans-serif",
      }}


        >
            <h2 style={{ textAlign: "center", color: "#555" }}> Add Your New Task Here</h2>
            <input 
            type= "text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            }}
            />
           
            <input 
            type ="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value) }
            style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "16px",
                }}
            />
            <button onClick={handleADD} style={{
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ffeb3b",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.2s",
        }}

        onMouseOver={(e) => (e.target.style.backgroundColor = "#e7d10cff")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffeb3b")}
        >Add Task</button>


 {/* Go to Task List Button */}
        <button
          onClick={() => navigate("/tasks") }
          
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ffeb3b", // light blue
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.2s",
            marginTop: "10px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e7d10cff")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffeb3b")}


>
          Go to Task List
        </button>

        </div>

        </div>
    );
};

export default AddTask;

