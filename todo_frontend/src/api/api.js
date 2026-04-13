import axios from "axios"

const API ="http://localhost:8000/api/task"; // Django backend URL"


//creates a reusable instance
export const api = axios.create({
    baseURL: API,
    headers:{
        "Content-Type":"application/json",
    },
});


// CRUD functions 
export const getTasks =() => api.get("/");
export const createTask =(data) => api.post("/",data);
export const updateTask =(id,data) => api.put(`/${id}/`,data)
export const deleteTask =(id, data) =>api.delete(`/${id}/`,data)
