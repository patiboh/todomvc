(function (window) {
	'use strict';

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
			var addTodoTextInput = document.getElementById('addTodoTextInput');
			todoList.addTodo(addTodoTextInput.value);
			this.clearInput([addTodoTextInput]);
			view.displayTodoList();
		},
		changeTodo: function() {
			var changeTodPositionInput = document.getElementById('changeTodoPositionInput');
			var changeTodoTextInput = document.getElementById('changeTodoTextInput');
			todoList.changeTodo(changeTodPositionInput.valueAsNumber, changeTodoTextInput.value);
			this.clearInput([changeTodPositionInput, changeTodoTextInput]);
			view.displayTodoList();
		},
		deleteTodo: function(position) {
			todoList.deleteTodo(position);
			view.displayTodoList();
		},
		toggleCompleted: function() {
			var toggelCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
			todoList.toggleCompleted(toggelCompletedPositionInput.valueAsNumber);
			this.clearInput([toggelCompletedPositionInput]);
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
			deleteButton.className = 'delete-button';
			return deleteButton;
		},
		setupEventListeners: function() {
			var todosUl = document.querySelector('ul');
			todosUl.addEventListener('click', function(event) {
				var elementClicked = event.target;
				if(elementClicked.className === 'delete-button') {
					var position = parseInt(elementClicked.parentNode);
					handlers.deleteTodo(position);
				}
			});
		}
	}

	view.setupEventListeners();
	// Your starting point. Enjoy the ride!

})(window);
