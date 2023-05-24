import data from './../data.json'

export const addTodo = (todo) => {
	return {
		type: 'ADD_TODO',
		payload: todo,
	}
}

export const updateTodo = (todo) => {
	return {
		type: 'UPDATE_TODO',
		payload: todo,
	}
}

export const deleteTodo = (id) => {
	return {
		type: 'DELETE_TODO',
		payload: id,
	}
}

export const fetchTodos = () => {
	const moveDoneTasksToEnd = (tasks) => {
		const doneTasks = [];
		const todoTasks = [];
	  
		tasks.forEach((task) => {
		  if (task.status === 'Done') {
			doneTasks.push(task);
		  } else {
			todoTasks.push(task);
		  }
		});
	  
		return [...todoTasks, ...doneTasks];
	};
	return (dispatch) => {
		dispatch({
			type: 'FETCH_TODOS',
			payload: moveDoneTasksToEnd(data),
		})
	}
}
