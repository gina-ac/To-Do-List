import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { isEditable } from '@testing-library/user-event/dist/utils';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    const addTodo = todo => {
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}]);
        console.log(todos)
    }
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
        console.log('completed')
    }
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
        console.log('editing')
    }
    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id != id))
        console.log('deleted')
    }
    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
        console.log('edited')
    }

  return (
    <div className='TodoWrapper'>
        <h1>To-Do List</h1>
        <TodoForm addTodo={addTodo}/>
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm key={index} editTodo={editTask} task={todo} />
            ) : (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} editTodo={editTodo} deleteTodo={deleteTodo}/>
            )
        ))}
    </div>
  )
}