import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
	todos: PropTypes.array,
	onTodoClick: PropTypes.func,
};

TodoList.defaultPróps = {
	todos: [],
	onTodoClick: null,
};

function TodoList(props) {
	const { todos, onTodoClick } = props;

	function handleClick(todo) {
		if (onTodoClick) {
			onTodoClick(todo);
		}
	}
	console.log(todos);
	return (
		<ul className="todo-list">
			{todos.map((todo) => {
				return (
					<li key={todo.id} onClick={() => handleClick(todo)}>
						{todo.title}
					</li>
				);
			})}
		</ul>
	);
}

export default TodoList;
