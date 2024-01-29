document.addEventListener('DOMContentLoaded', function () {
    
    updateDateTime();
    setInterval(updateDateTime, 60000); 
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');


    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value);
    });


    loadTasks();

    function updateDateTime() {
        const currentDate = new Date();
        document.getElementById('date').innerText = currentDate.toLocaleDateString();
        document.getElementById('time').innerText = currentDate.toLocaleTimeString();
    }

    function addTask(taskText) {
        if (taskText.trim() !== '') {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button onclick="editTask(this)">Editar</button>
                <button onclick="removeTask(this)">Remover</button>
            `;
            taskList.appendChild(taskItem);

        
            taskInput.value = '';

            
            saveTask(taskText);
        }
    }

    function editTask(button) {
        const taskItem = button.parentElement;
        const oldText = taskItem.querySelector('span').innerText;
        const newText = prompt('Editar Tarefa:', oldText);
        if (newText !== null) {
            taskItem.querySelector('span').innerText = newText;

            
            updateTask(taskText, newText);
        }
    }

    function removeTask(button) {
        const taskItem = button.parentElement;
        const taskText = taskItem.querySelector('span').innerText;
        if (confirm('Deseja remover a tarefa?')) {
            taskList.removeChild(taskItem);

            
            deleteTask(taskText);
        }
    }

    function saveTask(taskText) {
        
        fetch('https://crudcrud.com/api/4702c5d8ce634d2f8a57d5a6c44d9742/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: taskText }),
        });
    }

    function loadTasks() {
        
        fetch('https://crudcrud.com/api/4702c5d8ce634d2f8a57d5a6c44d9742/tasks')
            .then(response => response.json())
            .then(data => {
                data.forEach(task => addTask(task.text));
            });
    }

    function updateTask(oldText, newText) {
        
        fetch(`https://crudcrud.com/api/4702c5d8ce634d2f8a57d5a6c44d9742/tasks?text=${oldText}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: newText }),
        });
    }

    function deleteTask(taskText) {
        
        fetch(`https://crudcrud.com/api/4702c5d8ce634d2f8a57d5a6c44d9742/tasks?text=${taskText}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
        
            console.log('Tarefa removida:', data);
        })
        .catch(error => {
          
            console.error('Erro ao remover tarefa:', error);
        });
    }
});
