import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type filterType = "all" | "completed" | "active"

function App() {

    //BLL
    const todolistTitles = ['Что помыть', 'Title2', 'Title3']
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "Помыть посуду", isDone: false},
            {id: v1(), title: "Помыть попу", isDone: false},
            {id: v1(), title: "Помыть собаку", isDone: false}
        ]
    )
    const [filter, setFilter] = useState<filterType>("all")

    const removeTask = (taskId: string) => {
        const nextState = tasks.filter((task) => task.id !== taskId)
        setTasks(nextState)
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const nextState: Array<TaskType> = [newTask, ...tasks]
        setTasks(nextState)
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? { ...t, isDone: newStatus } : t)
        setTasks(nextState)
    }

    // UI
    let filteredTasks: Array<TaskType> = tasks

    const changeTodoListFilter = (nextFilter: filterType) => {
        setFilter(nextFilter)
    }

    if (filter === "active") {
        filteredTasks = tasks.filter((t) => !t.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter((t) => t.isDone)
    }


    return (
        <div className="App">
            <Todolist title={todolistTitles[0]}
                      tasks={filteredTasks}
                      filter={filter}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
