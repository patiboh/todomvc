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
			var allTrue = true;
			for(var i=0; i<this.todos.length; i++) {
				if (this.todos[i].completed === false) {
					allTrue = false;
					break;
				}
			}
			if(allTrue) {
				for( i=0; i<this.todos.length; i++) {
					this.todos[i].completed = false;
				}
			}
			else {
				for( i=0; i<this.todos.length; i++) {
					this.todos[i].completed = true;
				}
			}
		}
	};

	var handlers = {
		clearInput: function(elements) {
			for (var i=0; i<elements.length; i++) { // elements = []
				elements[i].value = '';
			}
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
		deleteTodo: function() {
			var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
			todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
			this.clearInput([deleteTodoPositionInput]);
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
		}
	}

	var view = {
		displayTodoList: function() {
			if(todoList.todos.length === 0) {
				console.log('Your todos list is empty');
			}
			else {
				console.log('My Todos: ');
				var todosUl = document.querySelector('ul');
				todosUl.innerHTML = '';
				for (var i=0; i<todoList.todos.length; i++) {
					var todoLi = document.createElement('li');
					var todo = todoList.todos[i];
					var completed = todo.completed === true ? '[X] ' : '[_] ';

					todoLi.textContent = completed + todo.todoText;
					todosUl.appendChild(todoLi);
				}
			}
		}
	}
	// Your starting point. Enjoy the ride!

})(window);
