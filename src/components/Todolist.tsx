import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from '../App';
import {TodolistHeader} from './TodolistHeader';
import {FilterButtons} from './FilterButtons';
import {Button} from './Button';
import {CreateItemForm} from './CreateItemForm';
import { EditableSpan } from './EditableSpan';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType

    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

    changeTodoListFilter: (nextFilter: FilterType, todolistId: string) => void
    changeTodoListTitle: (newTitle: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}
export const Todolist = (
    {
        todolistId,
        tasks,
        title,
        filter,

        removeTask,
        addTask,
        changeTaskStatus,
        changeTaskTitle,

        deleteTodolist,
        changeTodoListFilter,
        changeTodoListTitle
    }: TodolistPropsType) => {

    // const taskInputRef = useRef<HTMLInputElement>(null);

    // условный рендеринг
    const taskList = tasks.length === 0
        ? <span>Empty</span>
        : <ul>
            {
                tasks.map((el) => {
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(el.id, e.currentTarget.checked, todolistId)
                    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(el.id, newTitle, todolistId)
                    const removeTaskHandler = () => removeTask(el.id, todolistId)
                    return (
                        <li key={el.id} className={el.isDone ? 'task-done' : 'task'}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <EditableSpan title={el.title} changeItemName={changeTaskTitleHandler} />
                            <Button title={'X'} onClickHandler={removeTaskHandler}/>
                        </li>
                    )
                })
            }
        </ul>

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    const addTasksHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const changeTitleHandler = (newTitle: string) => {
        changeTodoListTitle(newTitle, todolistId)
    }

    return (
        <div className="todolist">
            <EditableSpan title={title} changeItemName={changeTitleHandler} />
            <Button title="X"
                    onClickHandler={deleteTodolistHandler}
                    classes={'delete-todolist-btn'}
            />

            <CreateItemForm addItem={addTasksHandler}/>
            {taskList}
            <FilterButtons filter={filter}
                           todolistId={todolistId}
                           changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
};