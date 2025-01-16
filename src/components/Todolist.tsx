import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from '../App';
import {TodolistHeader} from './TodolistHeader';
import {FilterButtons} from './FilterButtons';
import {Button} from './Button';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType

    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void

    changeTodoListFilter: (nextFilter: FilterType, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}
export const Todolist = ({todolistId, tasks, title, filter, removeTask, changeTodoListFilter, addTask, changeTaskStatus,deleteTodolist }: TodolistPropsType) => {

    // const taskInputRef = useRef<HTMLInputElement>(null);

    // деструктуризация
    // const {title, tasks} = props

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<boolean>(false);

    // условный рендеринг
    const taskList = tasks.length === 0
        ? <span>Empty</span>
        : <ul>
            {
                tasks.map((el) => {
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(el.id, e.currentTarget.checked, todolistId)
                    const removeTaskHandler = () => removeTask(el.id, todolistId)
                    return (
                        <li key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <span className={el.isDone ? "task-done" : "task"}>{el.title}</span>
                            <Button title={'X'} onClickHandler={removeTaskHandler} />
                        </li>
                    )
                })
            }
        </ul>

    const isAddTaskPossible = taskTitle.length <= 15

    const addTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if(trimmedTitle) {
            addTask(trimmedTitle, todolistId)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((taskTitle.length && isAddTaskPossible) && e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    return (
        <div className="todolist">
            <TodolistHeader title={title} />
            <Button title="X"
                    onClickHandler={deleteTodolistHandler}
                    classes={'delete-todolist-btn'}
            />
            <div>
                <input value={taskTitle}
                       onChange={setLocalTitleHandler}
                       onKeyDown={onKeyDownAddTaskHandler}
                       className={error ? 'inputError' : ''}
                />

                <Button title="+"
                        onClickHandler={addTaskHandler}
                        isDisabled={!taskTitle.length || !isAddTaskPossible}
                />
            </div>
            {!isAddTaskPossible && <div>Task title is too long</div>}
            {!taskTitle.length && <div>Enter task title (max 15 chars)</div>}
            {error && <div style={{color: "red"}}>Task title is required</div>}
            {/*<AddTaskForm addTask={addTask}/>*/}
            {taskList}
            <FilterButtons filter={filter}
                           todolistId={todolistId}
                           changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
};