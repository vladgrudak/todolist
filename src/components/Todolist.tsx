import React from 'react';
import {filterType, TaskType} from "../App";
import {TodolistHeader} from "./TodolistHeader";
import {AddTaskForm} from "./AddTaskForm";
import {FilterButtons} from "./FilterButtons";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTodoListFilter: (nextFilter: filterType) => void
}
export const Todolist = ({title, tasks, removeTask, changeTodoListFilter}: TodolistPropsType) => {

    // деструктуризация
    // const {title, tasks} = props

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
                            <Button title={'X'} onClickHandler={() => removeTask(el.id)} />
                        </li>
                    )
                })
            }
        </ul>


    return (
        <div className='todolist'>
            <TodolistHeader title={title}/>
            <AddTaskForm/>
            {taskList}
            <FilterButtons changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
};