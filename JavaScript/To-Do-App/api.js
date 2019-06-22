import Axios from "axios";

export default class Api {

    constructor() {
        this.apiEndpoint = "http://localhost:3000/todos";
    }

    getAllTasks() {
        return Axios.get(this.apiEndpoint);
    }

    createTask(text) {
        return Axios.post(this.apiEndpoint, { text });
    }

    updateTask(id, text) {
        return Axios.put(`${this.apiEndpoint}/${id}`, { text });
    }

    deleteTask(id) {
        return Axios.delete(`${this.apiEndpoint}/${id}`);
    }

}
