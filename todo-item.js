class CustomTodoItem extends HTMLElement {
    connectedCallback() {
        const id = this.getAttribute('task-id');
        const text = this.getAttribute('text');
        const completed = this.getAttribute('completed') === 'true';

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .todo-item {
                    display: flex;
                    align-items: center;
                    padding: 12px 16px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                
                .checkbox {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #d1d5db;
                    border-radius: 50%;
                    margin-right: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .checkbox.checked {
                    background-color: #3b82f6;
                    border-color: #3b82f6;
                }
                
                .checkbox:hover {
                    border-color: #9ca3af;
                }
                
                .checkbox.checked:hover {
                    background-color: #2563eb;
                    border-color: #2563eb;
                }
                
                .todo-text {
                    flex-grow: 1;
                    margin-right: 12px;
                    color: #1f2937;
                    transition: all 0.2s ease;
                }
                
                .edit-input {
                    flex-grow: 1;
                    margin-right: 12px;
                    padding: 4px 8px;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    outline: none;
                }
                
                .actions {
                    display: flex;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }
                
                .todo-item:hover .actions {
                    opacity: 1;
                }
                
                .action-btn {
                    background: none;
                    border: none;
                    color: #9ca3af;
                    cursor: pointer;
                    padding: 4px;
                    transition: color 0.2s ease;
                }
                
                .action-btn:hover {
                    color: #3b82f6;
                }
                
                .delete-btn:hover {
                    color: #ef4444;
                }
            </style>
            <div class="todo-item ${completed ? 'completed' : ''}">
                <div class="checkbox ${completed ? 'checked' : ''}" onclick="toggleTaskCompletion(${id})">
                    ${completed ? '<i data-feather="check" class="w-3 h-3 text-white"></i>' : ''}
                </div>
                <span class="todo-text">${text}</span>
                <div class="actions">
                    <button class="action-btn edit-btn" onclick="this.closest('custom-todo-item').startEdit()">
                        <i data-feather="edit-2" class="w-4 h-4"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTask(${id})">
                        <i data-feather="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Replace feather icons after rendering
        if (completed) {
            setTimeout(() => {
                feather.replace({ class: 'feather-inline', width: 12, height: 12 });
            }, 0);
        }
        
        setTimeout(() => {
            feather.replace({ class: 'feather-inline', width: 16, height: 16 });
        }, 0);
    }

    startEdit() {
        const text = this.getAttribute('text');
        const id = this.getAttribute('task-id');
        
        this.shadowRoot.querySelector('.todo-text').style.display = 'none';
        
        const editInput = document.createElement('input');
        editInput.className = 'edit-input';
        editInput.value = text;
        editInput.addEventListener('blur', () => this.finishEdit(editInput, id));
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.finishEdit(editInput, id);
        });
        
        this.shadowRoot.querySelector('.todo-item').insertBefore(
            editInput,
            this.shadowRoot.querySelector('.actions')
        );
        
        editInput.focus();
    }

    finishEdit(input, id) {
        const newText = input.value;
        window.editTask(id, newText);
        this.setAttribute('text', newText);
        this.shadowRoot.querySelector('.todo-text').textContent = newText;
        this.shadowRoot.querySelector('.todo-text').style.display = 'block';
        input.remove();
    }
}

customElements.define('custom-todo-item', CustomTodoItem);