import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from '../App';
import {FilterButtons} from './FilterButtons';
import {CreateItemForm} from './CreateItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {getListItemSx} from '../Todolist.styles'

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
        ? <span>The list is empty</span>
        : <List>
            {
                tasks.map((el) => {
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(el.id, e.currentTarget.checked, todolistId)
                    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(el.id, newTitle, todolistId)
                    const removeTaskHandler = () => removeTask(el.id, todolistId)
                    return (
                        <ListItem key={el.id}
                                  sx={getListItemSx(el.isDone)}>
                            <div>
                                <Checkbox
                                    checked={el.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan title={el.title} changeItemName={changeTaskTitleHandler}/>
                            </div>
                            <IconButton onClick={removeTaskHandler}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                    )
                })
            }
        </List>

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    const addTasksHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodoListTitle(newTitle, todolistId)
    }

    return (
        <div className="todolist">
            <div className="container">
                <h3>
                    <EditableSpan title={title} changeItemName={changeTodolistTitleHandler}/>
                </h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm addItem={addTasksHandler}/>
            {taskList}
            <FilterButtons filter={filter}
                           todolistId={todolistId}
                           changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
};