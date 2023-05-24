/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import { IoIosAdd } from 'react-icons/io'
import { connect } from 'react-redux'
import { TodoStatus } from '../Constants'
import {
	addTodo,
	deleteTodo,
	fetchTodos,
	updateTodo,
} from '../actions/TodoActions'

const TodoList = (props) => {
	
	const [sortedTasks, setSortedTasks] = useState([])

	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		status: TodoStatus.PENDING,
		date: '',
	})
	const [error, setError] = useState('')
	const [show, setShow] = useState(false)
	const [update, setUpdate] = useState(false)

	const handleClose = () => {
		setError('')
		setNewTask({
			title: '',
			description: '',
			status: TodoStatus.PENDING,
			date: '',
		})
		setUpdate(false)
		setShow(false)
	}
	const handleShow = (taskId) => {
		if (!isNaN(taskId)) {
			setUpdate(true)
			let task = props.todos.find((t) => t.id === taskId)
			if (task !== undefined) {
				setNewTask(task)
			}
		} else {
			setUpdate(false)
		}
		setShow(true)
	}

	useEffect(() => {
		props.fetchTodos()
	}, [])

	useEffect(() => {
		if (props.todos.length > 0) {
			setSortedTasks(props.todos)
		}
	}, [props.todos])

	const handleChange = (e) => {
		const { name, value } = e.target
		setNewTask((prevTask) => ({
			...prevTask,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		if (newTask.title.length === 0) {
			setError('Title is required')
			return false
		}
		setError('')
		if (update === false) {
			props.addTodo({
				id: Date.now(),
				title: newTask.title,
				description: newTask.description,
				status: newTask.status,
				date: new Date().toLocaleString(),
			})
			
		} else {
			const updatedValues = {
				title: newTask.title,
				description: newTask.description,
				status: newTask.status,
				date: new Date().toLocaleString(),
			}
			const updatedTasks = props.todos.map((task) => {
				if (task.id === newTask.id) {
					return {
						...task,
						...updatedValues,
					}
				}
				return task
			})
			const taskIndex = updatedTasks.findIndex((task) => task.id === newTask.id);
				if (taskIndex !== -1) {
				const updatedTask = updatedTasks[taskIndex];
				updatedTasks.splice(taskIndex, 1);

				if (updatedTask.status === 'Done') {
					updatedTasks.push(updatedTask);
				}

				if (updatedTask.status === 'ToDo') {
					updatedTasks.unshift(updatedTask);
				}
			}
			props.updateTodo(updatedTasks)
			console.log('props.todos', props.todos)
		}
		handleClose()
	}

	const handleDelete = (id) => {
		props.deleteTodo(id)
	}

	return (
		<div>
			<Container>
				<Navbar className="d-flex justify-content-between">
					<Navbar.Brand href="#" className="display-3 fw-bold">
						ToDo App
					</Navbar.Brand>
					<form onSubmit={handleSubmit}>
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Add Task</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<div className="text-danger">{error}</div>
								<FloatingLabel
									size="lg"
									className="mb-3"
									controlId="floatingInput"
									label="Title *"
								>
									<Form.Control
										onChange={handleChange}
										value={newTask.title ?? ''}
										type="text"
										name="title"
										required
										placeholder="Title"
									/>
								</FloatingLabel>
								<FloatingLabel
									controlId="floatingTextarea2"
									label="Description"
									className="mb-3"
								>
									<Form.Control
										as="textarea"
										name="description"
										onChange={handleChange}
										value={newTask.description ?? ''}
										placeholder="Leave a comment here"
										style={{ height: '100px' }}
									/>
								</FloatingLabel>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button
									variant="primary"
									type="submit"
									onClick={() => {
										handleSubmit()
									}}
								>
									Save Changes
								</Button>
							</Modal.Footer>
						</Modal>

						<Button variant="outline-info" onClick={handleShow}>
							Add Todo <IoIosAdd />
						</Button>
					</form>
				</Navbar>
			</Container>
			<Container className="h-100">
				<Row xs={1} md={1} lg={1} className="h-100">
					<Col className="p-2 h-100">
						<div className="bg-light border rounded">
							<div className="bg-light px-3 py-2">Todo</div>
							{sortedTasks?.map((task, index) => (
								<div key={index} className="p-2">
									<Card
										className={`border-top border-5  shadow ${task.status === 'Done'
											? 'task-done border-secondary'
											: 'border-warning'
											}`}
										onClick={() => {
											handleShow(task.id)
										}}
									>
										<Card.Body className="p-1">
											<Card.Title
												className={`border-bottom border-light border-3  ${task.status === 'Done' ? 'task-done' : ''
													}`}
											>
												{task.title}
											</Card.Title>
											<Card.Text className="small border-bottom border-light border-3">
												{task.description.substring(0, 500)}
											</Card.Text>
											<Card.Text className="small text-muted">
												{task.date}
											</Card.Text>
										</Card.Body>
									</Card>
								</div>
							))}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos,
	}
}

export default connect(mapStateToProps, {
	addTodo,
	deleteTodo,
	fetchTodos,
	updateTodo,
})(TodoList)
