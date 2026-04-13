import { useEffect, useState } from "react";
import AddTask  from "./addtask";
import { getTasks } from "../api/api";
import TaskList from "./tasklist";
import { Routes, Route } from "react-router-dom";

const TaskAPP=() =>{

    const[tasks, setTasks]=useState([]);

    const fetchTasks=()=>{
        getTasks()
        .then((res) => setTasks(res.data.results))
        .catch((err) => console.error(err));
    };

    useEffect(()=>fetchTasks(),[])
    
    // return(
    //     <div>
    //         <h2>TODO APP</h2>
    //         {/* PASSING FUNCTION */}
    //         <AddTask onTaskAdded={fetchTasks}/>
             
    //         {/* <Routes>
    //         <Route path="/tasks" element={<TaskList tasks={tasks} onRefresh={fetchTasks} />} />
    //         </Routes> */}
    //         {/* <TaskList tasks={tasks} onRefresh={fetchTasks}/> */}
            
    //     </div>
    // );
      return (
        <Routes>
            <Route
            path="/"
            element={<AddTask onTaskAdded={fetchTasks} />}
            />
            <Route
            path="/tasks"
            element={<TaskList tasks={tasks} onRefresh={fetchTasks} />}
            />
        </Routes>

    );
};

export default TaskAPP;