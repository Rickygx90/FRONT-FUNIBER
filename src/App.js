import { useEffect, useState } from 'react'
import { Title } from './components/Title'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import './App.css'

const domain = 'http://127.0.0.1:8000/api/tasks'

function App() {
	const [todos, setTodos] = useState([])
	const [activeFilter, setActiveFilter] = useState('all')

	const addTodo = async (title) => {
		await fetch(`${domain}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title }),
		})
		fetchTasksAndFilter()
	}

	const handleSetComplete = async (id) => {
		await fetch(`${domain}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		fetchTasksAndFilter()
	}

	const handleClearComplete = async () => {
		const completedList = todos
			.filter((todo) => todo.completed === 1)
			.map((todo) => todo.id)
		console.log(completedList)
		await fetch(`${domain}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completedList }),
		})
		fetchTasksAndFilter()
	}

	const handleDelete = async (id) => {
		await fetch(`${domain}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		fetchTasksAndFilter()
	}

	const showAllTodos = () => {
		setActiveFilter('all')
	}

	const showActiveTodos = () => {
		setActiveFilter('active')
	}

	const showCompletedTodos = () => {
		setActiveFilter('completed')
	}

	const fetchTasksAndFilter = async () => {
		const res = await fetch(`${domain}`, {
			method: 'GET',
		})
		const data = await res.json()
		if (activeFilter === 'all') {
			setTodos(data)
		} else if (activeFilter === 'active') {
			const activeTodos = data.filter((data) => data.completed === 0)
			setTodos(activeTodos)
		} else if (activeFilter === 'completed') {
			const completedTodos = data.filter((data) => data.completed === 1)
			setTodos(completedTodos)
		}
	}

	useEffect(() => {
		fetchTasksAndFilter()
	}, [activeFilter])

	return (
		<div className='bg-gray-900 min-h-screen font-inter h-full text-gray-100 flex items-center justify-center py-20 px-5'>
			<div className='container flex flex-col max-w-xl'>
				<Title />
				<TodoInput addTodo={addTodo} />
				<TodoList
					activeFilter={activeFilter}
					todos={todos}
					showAllTodos={showAllTodos}
					showActiveTodos={showActiveTodos}
					showCompletedTodos={showCompletedTodos}
					handleSetComplete={handleSetComplete}
					handleDelete={handleDelete}
					handleClearComplete={handleClearComplete}
				/>
			</div>
		</div>
	)
}

export default App
