import Api from "./api";

export default class ToDoApp {

    constructor() {
        this.api = new Api();
    }

    loadTasks() {
        this.api.getAllTasks()
            .then(res => this.showTasks(res.data))
            .catch(err => console.log(err));
    }

    showTasks(taskList) {
        let wrapper = document.getElementById("toDoList");
        wrapper.innerHTML = "";
        for (let task of taskList) {
            let item = document.createElement("li");
            item.id = task.id;
            item.classList.add("task");
            wrapper.appendChild(item);

            let taskText = document.createElement("span");
            taskText.innerText = task.text;
            item.appendChild(taskText);

            let buttonWrapper = document.createElement("span");
            buttonWrapper.classList.add("actionButtons");
            item.appendChild(buttonWrapper);

            let editButton = document.createElement("button");
            editButton.innerHTML = '<i class="far fa-edit"></i>';
            editButton.addEventListener("click", this.updateTask.bind(this));
            buttonWrapper.appendChild(editButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
            deleteButton.addEventListener("click", this.deleteTask.bind(this));
            buttonWrapper.appendChild(deleteButton);
        }
    }

    createTask() {
        let text = document.getElementById("taskText").value;
        let id = document.getElementById("taskId").value;
        let promise;

        if (id) {
            promise = this.api.updateTask(id, text);
        } else {
            promise = this.api.createTask(text);
        }

        promise.then(res => {
            this.clearForm();
            this.loadTasks();
        });
    }

    /**
     * @param {MouseEvent} e 
     */
    updateTask(e) {
        let taskText = document.getElementById("taskText");
        taskText.value = e.target.closest("li").querySelector("span").innerText;
        let taskId = document.getElementById("taskId");
        taskId.value = e.target.closest("li").id.replace(/^\D+/, "");
        taskText.focus();
    }

    /**
     * @param {MouseEvent} e 
     */
    deleteTask(e) {
        let id = e.target.closest("li").id.replace(/^\D+/, "");
        this.api.deleteTask(id).then(res => {
            this.loadTasks();
        });
    }

    clearForm() {
        let textInput = document.getElementById("taskText");
        textInput.value = "";
        let idInput = document.getElementById("taskId");
        idInput.value = "";
    }
}
