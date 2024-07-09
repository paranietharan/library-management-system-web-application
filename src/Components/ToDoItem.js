import React, { useState } from 'react';
import styles from './style/ToDoItemStyle.module.css';
import httpCommon from '../service/http-common';

function ToDoItem({ todo, onDelete, onToggleStatus, userId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(todo);

    const updateTodo = () => {
        httpCommon.put(`/todo/${userId}/update/${todo.id}`, editedTodo)
            .then(() => {
                setIsEditing(false);
                // Refresh the todo list after update
                onToggleStatus(todo.id);
            })
            .catch(error => console.log(error));
    };

    const handleToggleStatus = () => {
        onToggleStatus(todo.id);
    };

    if (isEditing) {
        return (
            <div className={`${styles.todoItem} ${styles.editing}`}>
                <input
                    type="text"
                    value={editedTodo.title}
                    onChange={e => setEditedTodo({ ...editedTodo, title: e.target.value })}
                />
                <input
                    type="text"
                    value={editedTodo.description}
                    onChange={e => setEditedTodo({ ...editedTodo, description: e.target.value })}
                />
                <input
                    type="date"
                    value={editedTodo.targetDate}
                    onChange={e => setEditedTodo({ ...editedTodo, targetDate: e.target.value })}
                />
                <div className={styles.actions}>
                    <button onClick={updateTodo} className={styles.saveButton}>Save</button>
                    <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.todoItem} ${todo.done ? styles.completed : ''}`}>
            <div className={styles.todoContent}>
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={handleToggleStatus}
                    className={styles.checkbox}
                />
                <div className={styles.todoDetails}>
                    <h3 className={styles.title}>{todo.title}</h3>
                    <p className={styles.description}>{todo.description}</p>
                    <p className={styles.targetDate}>{todo.targetDate}</p>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
                <button onClick={() => onDelete(todo.id)} className={styles.deleteButton}>Delete</button>
            </div>
        </div>
    );
}

export default ToDoItem;