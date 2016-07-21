(function (window) {
	
	var todoList = {
		todos: [],
		addTodo: function(todoText) {
			this.todos.push({
				todoText: todoText,
				completed: false
			});
		},
		changeTodo: function(position, todoText) {
			this.todos[position].todoText = todoText;
		},
		deleteTodo: function(position) {
			this.todos.splice(position, 1);
		},
		toggleCompleted: function(position) {
			var todo = this.todos[position];
			todo.completed = !todo.completed;
		},
		toggleAll: function() {
			var totalTodos = this.todos.length;
			var completedTodos = 0;

			this.todos.forEach( function(todo) {
				if (todo.completed === true) {
					completedTodos++;
				}
			});
			this.todos.forEach( function(todo) {
				if(completedTodos === totalTodos) {
					todo.completed = false;
				}
				else {
					todo.completed = true;
				}
			});
		}
	};

	var handlers = {
		clearInput: function(elements) {
			elements.forEach( function(item) {
				item.value = '';
			});
		},
		addTodo: function() {
			var addInputText = document.getElementById('add-input--text');
			todoList.addTodo(addInputText.value);
			this.clearInput([addInputText]);
			view.displayTodoList();
		},
		changeTodo: function() {
			var changeInputPosition = document.getElementById('change-input--position');
			var changeInputText = document.getElementById('change-input--text');
			todoList.changeTodo(changeInputPosition.valueAsNumber, changeInputText.value);
			this.clearInput([changeInputPosition, changeInputText]);
			view.displayTodoList();
		},
		deleteTodo: function(position) {
			todoList.deleteTodo(position);
			view.displayTodoList();
		},
		toggleCompleted: function() {
			var toggelCompletetInputPosition = document.getElementById('toggle-completed-input--position');
			todoList.toggleCompleted(toggelCompletetInputPosition.valueAsNumber);
			this.clearInput([toggelCompletetInputPosition]);
			view.displayTodoList();
		},
		toggleAll: function() {
			todoList.toggleAll();
			view.displayTodoList();
		}
	}

	var view = {
		displayTodoList: function() {
			var todosUl = document.querySelector('ul');
			todosUl.innerHTML = '';
			todoList.todos.forEach(function (item, index) {
				var todoLi = document.createElement('li');
				var completed = item.completed === true ? '[X] ' : '[_] ';
				todoLi.textContent = completed + item.todoText;
				todoLi.id = "todo-"+ index;
				todoLi.appendChild(this.createDeleteButton());
				todosUl.appendChild(todoLi);
			}, this);
		},
		createDeleteButton: function() {
			var deleteButton = document.createElement('button');
			deleteButton.textContent = 'Delete';
			deleteButton.className = 'delete_button';
			return deleteButton;
		},
		setupEventListeners: function() {
			var todosUl = document.getElementById('todo-list');
			todosUl.addEventListener('click', function(event) {
				var elementClicked = event.target;
				if(elementClicked.className === 'delete_button') {
					var position = parseInt(elementClicked.parentNode);
					handlers.deleteTodo(position);
				}
			});

			var main = document.querySelector('main');
			main.addEventListener('click', function(event) {
				var elementClicked = event.target;
				switch (elementClicked.id) {
					case 'add-button'              : handlers.addTodo(); break;
					case 'change-button'           : handlers.changeTodo(); break;
					case 'delete-button'           : handlers.deleteTodo(); break;
					case 'toggle-completed-button' : handlers.toggleCompleted(); break;
					case 'toggle-all-button'       : handlers.toggleAll(); break;
					default                        : break;
				}
			});
		}
	}

	view.setupEventListeners();

})(window);
