//1 Add new task

//2 mark task as completed

//3 delete task

//4 persist tasks using local storage


document.addEventListener("DOMContentLoaded", function () {
    // Function to add a new task
    window.addTask = function () {
        const taskId = document.getElementById("taskid").value;
        const taskName = document.getElementById("taskname").value;
        const taskDetails = document.getElementById("taskdetails").value;

        if (taskId && taskName && taskDetails) {
            const newTask = {
                id: taskId,
                name: taskName,
                details: taskDetails,
                completed: false,
            };

            // Retrieve tasks from local storage or initialize an empty array
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(newTask);

            // Update tasks in local storage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            alert("Task added successfully!");
        } else {
            alert("Please fill in all fields");
        }
    };

    /*
    // Function to mark a task as completed
    window.completedTasks = function () {
        const taskId = document.getElementById("taskid").value;

        // Retrieve tasks from local storage or initialize an empty array
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.completed = true;

            // Update tasks in local storage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            alert("Task marked as completed!");
        } else {
            alert("Task not found");
        }

        var key=document.getElementById("taskid").value 
        if(key in tasks){
            // var tasks = JSON.parse(localStorage.getItem(tasks))
            var result = document.getElementById("res")
            result.innerHTML=`<ul class="list-group list-group-flush">
            <li class="list-group-item">${key.id}</li>
            <li class="list-group-item">${key.name}</li>
            <li class="list-group-item">${key.details}</li>
          </ul>`
         }
         else{
             alert("not found")
         }
    };
        
    */

    window.completedTasks = function () {
        const taskId = document.getElementById("taskid").value;
    
        // Retrieve tasks from local storage or initialize an empty array
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.completed = true;
    
            // Update tasks in local storage
            localStorage.setItem("tasks", JSON.stringify(tasks));
    
            alert("Task marked as completed!");
    
            // Display the completed task details
            var result = document.getElementById("res");
            result.innerHTML = `<ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${task.id}</li>
                <li class="list-group-item">Name: ${task.name}</li>
                <li class="list-group-item">Details: ${task.details}</li>
            </ul>`;
        } else {
            alert("Task not found");
        }
    };
    







    // Function to remove a task
    window.removeTasks = function () {
        const taskId = document.getElementById("dlt").value;

        // Retrieve tasks from local storage or initialize an empty array
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const taskIndex = tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);

            // Update tasks in local storage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            alert("Task removed successfully!");
        } else {
            alert("Task not found");
        }
    };

    // Function to persist tasks using AJAX API Fetch
    window.persistTasks = function () {
        // Retrieve tasks from local storage or initialize an empty array
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
        fetch("YOUR_API_ENDPOINT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tasks: tasks }), // Send tasks as an object with a 'tasks' property
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("error!");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Server response:", data); // Log the server response
                document.getElementById("result").innerHTML =
                    "Tasks persisted successfully!";
            })
            .catch((error) => {
                console.error("Error persisting tasks:", error.message);
                document.getElementById("result").innerHTML =
                    `Error`;
            });
    };
    
    
});
