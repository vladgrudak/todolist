import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'completed' | 'active'

function App() {

    //BLL
    const todolistTitles = ['Что помыть', 'Кого побрить', 'Title3']

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: todolistTitles[0], filter: 'all'},
        {id: todolistId2, title: todolistTitles[1], filter: 'completed'}
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Помыть посуду', isDone: false},
            {id: v1(), title: 'Помыть попу', isDone: false},
            {id: v1(), title: 'Помыть собаку', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Побрить кота', isDone: true},
            {id: v1(), title: 'Побрить папу', isDone: false},
            {id: v1(), title: 'Побрить лоха', isDone: false}
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId)
        })
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus} : t)
        })
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }


    // UI
    const changeTodoListFilter = (nextFilter: FilterType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: nextFilter} : tl))
    }

    const todolistsAll = todolists.map(tl => {

        let filteredTasks: Array<TaskType> = tasks[tl.id]
        if (tl.filter === 'active') {
            filteredTasks = tasks[tl.id].filter((t) => !t.isDone)
        }
        if (tl.filter === 'completed') {
            filteredTasks = tasks[tl.id].filter((t) => t.isDone)
        }

        return <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}

            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}

            changeTodoListFilter={changeTodoListFilter}
            deleteTodolist={deleteTodolist}
        />

    })


    return (
        <div className="App">
            {todolistsAll}
        </div>
    );
}

export default App;
