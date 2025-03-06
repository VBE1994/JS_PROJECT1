document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById("taskInput");

    const addTaskBtn = document.getElementById("addTaskBtn");

    const taskList = document.getElementById("taskList");

    const errorMsg = document.getElementById("error-msg");

    const allBtn = document.getElementById("allBtn");

    const activeBtn = document.getElementById("activeBtn");

    const completedBtn = document.getElementById("completedBtn");

 

    addTaskBtn.addEventListener("click", addTask);

    allBtn.addEventListener("click", () => filterTasks("all"));

    activeBtn.addEventListener("click", () => filterTasks("active"));

    completedBtn.addEventListener("click", () => filterTasks("completed"));

 

    function addTask() {

        let taskValue = taskInput.value.trim();

        if (taskValue.length < 3) {

            errorMsg.textContent = "Task must be at least 3 characters long.";

            taskInput.classList.add("error-border");

            return;

        }

        errorMsg.textContent = "";

        taskInput.classList.remove("error-border");

 

        let li = document.createElement("li");

        li.textContent = taskValue;

       

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "❌";

        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {

            taskList.removeChild(li);

            saveTasks();

        });

       

        let completeBtn = document.createElement("button");

        completeBtn.textContent = "✔";

        completeBtn.classList.add("complete-btn");

        completeBtn.addEventListener("click", () => {

            li.classList.toggle("completed");

            saveTasks();

        });

       

        li.appendChild(completeBtn);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

       

        taskInput.value = "";

        saveTasks();

    }

 

    function saveTasks() {

        let tasks = [];

        document.querySelectorAll("#taskList li").forEach(li => {

            let text = li.childNodes[0].nodeValue.trim();

            tasks.push({ text: text, completed: li.classList.contains("completed") });

        });

        localStorage.setItem("tasks", JSON.stringify(tasks));

    }

 

    function loadTasks() {

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks.forEach(task => {

            let li = document.createElement("li");

            li.textContent = task.text;

            if (task.completed) li.classList.add("completed");

 

            let deleteBtn = document.createElement("button");

            deleteBtn.textContent = "❌";

            deleteBtn.classList.add("delete-btn");

            deleteBtn.addEventListener("click", () => {

                taskList.removeChild(li);

                saveTasks();

            });

           

            let completeBtn = document.createElement("button");

            completeBtn.textContent = "✔";

            completeBtn.classList.add("complete-btn");

            completeBtn.addEventListener("click", () => {

                li.classList.toggle("completed");

                saveTasks();

            });

 

            li.appendChild(completeBtn);

            li.appendChild(deleteBtn);

            taskList.appendChild(li);

        });

    }

 

    function filterTasks(filter) {

        document.querySelectorAll("#taskList li").forEach(li => {

            switch (filter) {

                case "all":

                    li.style.display = "flex";

                    break;

                case "active":

                    li.style.display = li.classList.contains("completed") ? "none" : "flex";

                    break;

                case "completed":

                    li.style.display = li.classList.contains("completed") ? "flex" : "none";

                    break;

            }

        });

    }

 

    loadTasks();

});