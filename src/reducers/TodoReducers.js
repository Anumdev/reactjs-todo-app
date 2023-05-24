const initialState = {
	todos: [],
}

const TodoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [action.payload, ...state.todos],
			}
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			}
		case 'FETCH_TODOS':
			return {
				...state,
				todos: action.payload,
			}
		case 'UPDATE_TODO':
			return {
				...state,
				todos: action.payload,
			}
		default:
			return state
	}
}

export default TodoReducer
