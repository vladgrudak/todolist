import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterType, TaskType} from '../App';
import {TodolistHeader} from './TodolistHeader';
import {FilterButtons} from './FilterButtons';
import {Button} from './Button';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: filterType
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (nextFilter: filterType) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
}
export const Todolist = ({title, tasks, removeTask, changeTodoListFilter, addTask, changeTaskStatus, filter}: TodolistPropsType) => {

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
                    const ChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(el.id, e.currentTarget.checked)
                    return (
                        <li key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={ChangeTaskStatusHandler}
                            />
                            <span className={el.isDone ? "task-done" : "task"}>{el.title}</span>
                            <Button title={'X'} onClickHandler={() => removeTask(el.id)} />
                        </li>
                    )
                })
            }
        </ul>

    const isAddTaskPossible = taskTitle.length <= 15

    const addTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if(trimmedTitle) {
            addTask(trimmedTitle)
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

    return (
        <div className="todolist">
            <TodolistHeader title={title}/>
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
                           changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
};