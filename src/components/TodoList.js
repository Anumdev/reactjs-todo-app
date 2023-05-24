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
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { connect } from 'react-redux'
import { TodoStatus } from '../Constants'
import DeleteConfirmation from './modals/DeleteConfirmation'

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
	const [modalShow, setModalShow] = useState(false)
	const [idToDelete, setIdToDelete] = useState('')

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
			props.updateTodo(updatedTasks)
		}
		handleClose()
	}

	const handleDelete = () => {
		if (idToDelete) {
			props.deleteTodo(idToDelete)
		}
		setModalShow(false)
	}

	const updateTasks = (updatedTasks, taskId) => {
		const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);
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
		return updatedTasks
	}

	const handleUpdateTaskStatus = (e, taskId) => {
		const { checked } = e.target
		const updatedTasks = sortedTasks.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					status: checked ? 'Done' : 'ToDo',
				}
			}
			return task
		})
		props.updateTodo(updateTasks(updatedTasks, taskId))
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
										className={`border-start px-2 border-5  shadow ${task.status === 'Done'
												? 'task-done border-secondary'
												: 'border-info'
											}`}
									>
										<Card.Body className="p-1 d-flex justify-content-between align-items-center">
											<div className="flex-grow-1 pe-5">
												<Card.Title
													className={`border-bottom border-light border-3 py-2  ${task.status === 'Done' ? 'task-done' : ''
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
											</div>
											<div>
												<Button
													variant="warning"
													className={`mb-2 ${task.status === 'Done' ? 'd-none' : ''
														}`}
													onClick={() => {
														handleShow(task.id)
													}}
												>
													<FaEdit />
												</Button>
												<div className={`check-container ${task.status === 'Done' ? 'd-none' : ''
													}`}>
													<label
														className="checkbox-label"
													>
														<input
															type="checkbox"
															checked={task.status === 'Done'}
															name={task.status}
															onChange={(e) => handleUpdateTaskStatus(e, task.id)}
															id={`reverse-checkbox-${task.id}`}
														/>
														<span className="check"></span>
													</label>
												</div>
												<Button
													variant="danger"
													className={`mb-2 ${task.status === 'ToDo' ? 'd-none' : ''
														}`}
													onClick={
														() => {
															setModalShow(true)
															setIdToDelete(task.id)
														}
													}
												>
													<FaTrash />
												</Button>
											</div>

										</Card.Body>
									</Card>
								</div>
							))}
						</div>
					</Col>
				</Row>
			</Container>
			<DeleteConfirmation
				show={modalShow}
				onHide={() => setModalShow(false)}
				onDelete={handleDelete}
			/>
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