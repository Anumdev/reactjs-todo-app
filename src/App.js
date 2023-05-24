import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import Store from './Store'
import TodoList from './components/TodoList'
const App = () => {
	return (
		<Provider store={Store}>
			{/* <Header /> */}
			<TodoList />
		</Provider>
	)
}

export default App
