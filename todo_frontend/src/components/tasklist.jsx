import React, { useState } from "react";
import { deleteTask, updateTask } from "../api/api";
// import { Icon } from 'semantic-ui-css';
import { useNavigate } from "react-router-dom"; 


const TaskList=({tasks=[],onRefresh }) =>{
    // edit 
    const [editingID, setEditingId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription]=useState("");
    const navigate = useNavigate(); 

    const handleEdit =(task)=>{
        setEditingId(task.internal_id);
        setTitle(task.title);
        setDescription(task.description);
    };

    const handleUpdate=(id)=>{
        // BE api 
        updateTask(id, {title, description})
        .then(()=>{
            setEditingId(null);  // exist edit mode
            onRefresh();         // refresh list 

        })
        .catch((err)=> console.error(err))
    }

    
    const handleToggle =(task) =>{
        // send to BE api 
        updateTask(task.internal_id, {
            completed:!task.completed,
        }
    ).then(()=> onRefresh())
    .catch((err)=> console.error(err));
    }

    const handleDelete=(task)=>{
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        //send to BE api
        deleteTask(task.internal_id)

        .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);  // 👈 show BE message
        onRefresh();

    })
        .catch((err) => {
      console.error(err);
      alert("Something went wrong"); 
    });
    };


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
            >
            <button onClick={() => navigate("/") }
            style={{
                position: "absolute",
                top: "40px",
                right: "20px",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#ffeb3b", // light yellow
                color: "#333",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "1px 2px 4px rgba(0,0,0,0.2)"
            }}
                
                >
                Add Task
            </button>
            </div>
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
        fontFamily: "Arial, sans-serif"}}>
        <ul>
            <h2 style={{  color: "#555" }}>Task List</h2>
            <div>
            {tasks.map((task) =>(
                <li key={task.internal_id}>
                    {/* (if-else) */}
                    {editingID === task.internal_id ? (
                        // <> </> Used to group elements
                        <>    
                        <input value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        <button onClick={()=> handleUpdate(task.internal_id)}> save </button>

                        </>

                    ):(

                    <><div style={{ fontWeight: "bold",padding: "2px 10px",  }}>
                        <input
                        type ="checkbox"
                        checked ={task.completed}
                        onChange={()=> handleToggle(task)}
                        />

                    {/* normal view */}
                    {/* <div   style={{
                            marginBottom: "px", // optional: space between list items>
                                            }}> */}
                    <span>
                        
                        {task.title}- {task.description}
                    </span>
                    <button onClick={()=> handleEdit(task)} style={{
                            marginLeft: "5px",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#facda5ff", // light yellow
                            color: "#333",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: "1px 2px 4px rgba(0,0,0,0.2)",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#f8bc87ff")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#facda5ff")}
                        >
                    Edit
                    </button>
                    <button
                        onClick={() => handleDelete(task)}
                        style={{
                            marginLeft: "5px",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#fdb3b3ff", // light yellow
                            color: "#333",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: "1px 2px 4px rgba(0,0,0,0.2)",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#f79f9fff")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#fdb3b3ff")}
                        >
                        Delete
                        </button></div> 
                    
                    {/* <button onClick={()=> handleDelete(task) }style={{ marginLeft: "5px",backgroundColor: "#f7eea3ff" }}>Delete</button></div> */}
                    {/* <Icon
                        name="edit"
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => handleEdit(task)}
                        /> */}

                    {/* </div> */}
                    </>
                    
                    )}

                </li>
            ))  
        }

        </div> 
        </ul>
        </div>
        </div>
    );
};
export default TaskList
