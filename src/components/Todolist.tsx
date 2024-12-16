import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterType, TaskType} from '../App';
import {TodolistHeader} from './TodolistHeader';
import {AddTaskForm} from './AddTaskForm';
import {FilterButtons} from './FilterButtons';
import {Button} from './Button';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (nextFilter: filterType) => void
}
export const Todolist = ({title, tasks, removeTask, changeTodoListFilter, addTask}: TodolistPropsType) => {

    // const taskInputRef = useRef<HTMLInputElement>(null);

    // деструктуризация
    // const {title, tasks} = props

    const [taskTitle, setTaskTitle] = useState('');

    // условный рендеринг
    const taskList = tasks.length === 0
        ? <span>Empty</span>
        : <ul>
            {
                tasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title} </span>
                            <Button title={'X'} onClickHandler={() => removeTask(el.id)}/>
                        </li>
                    )
                })
            }
        </ul>

    const isAddTaskPossible = taskTitle.length <= 15

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

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
                />

                <Button title="+" onClickHandler={addTaskHandler}
                        isDisabled={!taskTitle.length || !isAddTaskPossible}
                />
            </div>
            {!isAddTaskPossible && <div>Stop it</div>}
            <AddTaskForm addTask={addTask}/>
            {taskList}
            <FilterButtons changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
};