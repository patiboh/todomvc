(function (window) {
	'use strict';

	var todoList = {
		todos: [],
		displayTodos: function() {
			if(this.todos.length === 0) {
				console.log('Your todos list is empty');
			}
			else {
				console.log('My Todos: ');
				for (var i=0; i<this.todos.length; i++) {
					var todo = this.todos[i];
					var completed = this.todos[i].completed === true ? '[X]' : '[ ]';
					console.log(completed, todo.todoText);
				}
			}
		},
		addTodo: function(todoText) {
			this.todos.push({
				todoText: todoText,
				completed: false
			});
			this.displayTodos();
		},
		changeTodo: function(position, todoText) {
			this.todos[position].todoText = todoText;
			this.displayTodos();
		},
		deleteTodo: function(position) {
			this.todos.splice(position, 1);
			this.displayTodos();
		},
		toggleCompleted: function(position) {
			var todo = this.todos[position];
			todo.completed = !todo.completed;
			this.displayTodos();
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
			this.displayTodos();
		}
	};

	var handlers = {
		displayTodos: function() {
			todoList.displayTodos();
		},
		toggleAll: function() {
			todoList.toggleAll();
		}
	};
	// Your starting point. Enjoy the ride!

})(window);
