import ToDoApp from "./app";

const app = new ToDoApp();

window.addEventListener("load", () => {
    let saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", app.createTask.bind(app));
    app.loadTasks();
});
