import './App.scss';

import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import TodoList from './Components/TodoList/TodoList';
import TodoForm from './Components/TodoForm/TodoForm';
import PostList from './Components/PostList/PostList';
import Paginantion from './Components/Pagination/Paginantion';
import PostFilterForm from './Components/PostFilterForm/PostFilterForm';
import Clock from './Components/Clock/Clock';

function App() {
	const [todoList, setTodoList] = useState([
		{
			id: 1,
			title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		{
			id: 2,
			title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
		{
			id: 3,
			title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		},
	]);

	const [postsList, setPostsList] = useState([]);
	const [pagination, setPagination] = useState({
		_page: 1,
		_totleRows: 10,
		_limit: 1,
	});
	const [filters, setFilters] = useState({
		_page: 1,
		_limit: 10,
		title_like: '',
	});

	const [showClock, setShowClock] = useState(true);

	// -----------------useEffect-----------------
	useEffect(() => {
		async function fetchPostList() {
			try {
				// Chuyển objects filters sang string
				const paramsString = queryString.stringify(filters);
				const requestURL = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
				const response = await fetch(requestURL);
				const responseJSON = await response.json();
				console.log(responseJSON);

				const { data, pagination } = responseJSON;

				setPostsList(data);
				setPagination(pagination);
			} catch (error) {}
		}

		fetchPostList();
	}, [filters]);

	// -----------------Function-----------------

	// onClick to delete item
	function onTodoClick(todo) {
		const index = todoList.findIndex((x) => x.id === todo.id);
		if (index < 0) return;

		if (index) {
			const newTodoList = [...todoList];
			newTodoList.splice(index, 1);
			setTodoList(newTodoList);
		}
	}

	// Submit form
	function handleTodoFormSubmit(formValues) {
		// Add new todo to current todolist
		const todo = {
			id: todoList.length + 1,
			// Get all value from input
			...formValues,
		};
		const newTodoList = [...todoList];
		newTodoList.push(todo);
		setTodoList(newTodoList);

		// setTodoList([...todoList, { id: todoList.length + 1, ...formValues }]);
	}

	// Pagination
	function handlePageChage(newPage) {
		setFilters({
			...filters,
			_page: newPage,
		});
	}

	//Filter item
	function handleFilterChange(newFilter) {
		setFilters({
			...filters,
			_page: 1, // Đặt trường hợp đang page 2 search item page 1 => reset về page 1
			title_like: newFilter.searchTerm,
		});
	}

	// -----------------Function-----------------
	return (
		<div className="App">
			<h1> React Todo list </h1>
			<TodoForm onSubmit={handleTodoFormSubmit} />
			<TodoList todos={todoList} onTodoClick={onTodoClick} />

			<PostFilterForm onSubmit={handleFilterChange} />
			<PostList posts={postsList} />
			<Paginantion pagination={pagination} onPageChange={handlePageChage} />

			{showClock && <Clock />}
			<button onClick={() => setShowClock(false)}> Click </button>
		</div>
	);
}

export default App;
