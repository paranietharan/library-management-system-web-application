import React, { useState, useEffect } from 'react';
import styles from './style/ToDoListPageStyle.module.css';
import UserNavBar from '../Components/UserNavBar';
import ToDoItem from '../Components/ToDoItem';
import httpCommon from '../service/http-common';
import getUserID from '../service/GetUserID';

function ToDoListPage() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', targetDate: '' });
    const [filter, setFilter] = useState('all'); // 'all', 'active', or 'completed'
    const [showDone, setShowDone] = useState(false);
    const [userId, setuserId] = useState(null);

    useEffect(() => {
        const userID = getUserID();
        setuserId(userID);
        fetchTodos(userID);
    }, []);

    const fetchTodos = (userID) => {
        console.log("Fetch todo from user: " + userID);
        httpCommon.get(`/todo/get/user?userId=${userID}`)
            .then(response => setTodos(response.data))
            .catch(error => console.log(error));
    };

    const createTodo = (e) => {
        e.preventDefault();
        httpCommon.post(`/todo/create/${userId}`, newTodo)
            .then(() => {
                setNewTodo({ title: '', description: '', targetDate: '' });
                fetchTodos(userId);
            })
            .catch(error => console.log(error));
    };

    const deleteTodo = (id) => {
        httpCommon.delete(`/todo/delete/${id}`)
            .then(() => fetchTodos(userId))
            .catch(error => console.log(error));
    };

    const toggleTodoStatus = (id) => {
        const todoToToggle = todos.find(todo => todo.id === id);
        if (todoToToggle) {
            const newStatus = !todoToToggle.completed;
            httpCommon.put(`/todo/${newStatus ? 'mark' : 'unmark'}/${id}`)
                .then(() => fetchTodos(userId))
                .catch(error => console.log(error));
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.done;
        if (filter === 'completed') return todo.done;
        return true;
    });


    return (
        <>
            <UserNavBar />
            <div className={styles.todoListPage}>
                <div className={styles.content}>
                    <h1 className={styles.title}>My Tasks</h1>

                    <form className={styles.form} onSubmit={createTodo}>
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={newTodo.title}
                            onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Add details"
                            value={newTodo.description}
                            onChange={e => setNewTodo({ ...newTodo, description: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newTodo.targetDate}
                            onChange={e => setNewTodo({ ...newTodo, targetDate: e.target.value })}
                            required
                        />
                        <button type="submit">Add Task</button>
                    </form>

                    <div className={styles.filters}>
                        <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>All</button>
                        <button onClick={() => setFilter('active')} className={filter === 'active' ? styles.active : ''}>Active</button>
                        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? styles.active : ''}>Completed</button>
                    </div>

                    <div className={styles.todoList}>
                        {filteredTodos.map(todo => (
                            <ToDoItem
                                key={todo.id}
                                todo={todo}
                                onDelete={deleteTodo}
                                onToggleStatus={toggleTodoStatus}
                                userId={userId}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDoListPage;