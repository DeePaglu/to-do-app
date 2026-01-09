document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksContainer = document.getElementById('tasksContainer');
    const emptyState = document.getElementById('emptyState');
    const filterAll = document.getElementById('filterAll');
    const filterActive = document.getElementById('filterActive');
    const filterCompleted = document.getElementById('filterCompleted');
    const clearCompleted = document.getElementById('clearCompleted');

    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    // Initialize
    renderTasks();
    updateEmptyState();

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterAll.addEventListener('click', () => setFilter('all'));
    filterActive.addEventListener('click', () => setFilter('active'));
    filterCompleted.addEventListener('click', () => setFilter('completed'));
    clearCompleted.addEventListener('click', clearCompletedTasks);

    // Functions
    function addTask() {
        const text = newTaskInput.value.trim();
        if (text) {
            const newTask = {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date()
            };
            tasks.unshift(newTask);
            saveTasks();
            renderTasks();
            newTaskInput.value = '';
            updateEmptyState();
        }
    }

    function renderTasks() {
        tasksContainer.innerHTML = '';
        
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const todoItem = document.createElement('custom-todo-item');
            todoItem.setAttribute('task-id', task.id);
            todoItem.setAttribute('text', task.text);
            todoItem.setAttribute('completed', task.completed);
            tasksContainer.appendChild(todoItem);
        });

        updateFilterButtons();
    }

    function updateFilterButtons() {
        const activeCount = tasks.filter(t => !t.completed).length;
        const completedCount = tasks.filter(t => t.completed).length;

        filterAll.textContent = `All (${tasks.length})`;
        filterActive.textContent = `Active (${activeCount})`;
        filterCompleted.textContent = `Completed (${completedCount})`;
    }

    function setFilter(filter) {
        currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`).classList.add('active');
        renderTasks();
    }

    function clearCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateEmptyState();
    }

    function updateEmptyState() {
        emptyState.style.display = tasks.length === 0 ? 'block' : 'none';
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Global functions for todo-item component to call
    window.toggleTaskCompletion = (id) => {
        const task = tasks.find(t => t.id == id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    };

    window.deleteTask = (id) => {
        tasks = tasks.filter(t => t.id != id);
        saveTasks();
        renderTasks();
        updateEmptyState();
    };

    window.editTask = (id, newText) => {
        const task = tasks.find(t => t.id == id);
        if (task && newText.trim()) {
            task.text = newText.trim();
            saveTasks();
        }
    };
});