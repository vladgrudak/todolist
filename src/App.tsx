import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type filterType = "all" | "completed" | "active"

function App() {

    //BLL
    const todolistTitles = ['Что помыть', 'Title2', 'Title3']

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "Помыть посуду", isDone: true},
            {id: 2, title: "Помыть попу", isDone: false},
            {id: 3, title: "Помыть собаку", isDone: false}
        ]
    )

    const removeTask = (taskId: number) => {
        const nextState = tasks.filter((task) => task.id !== taskId)
        setTasks(nextState)
    }

    // UI

    // Вопросы: организация кода - можно ли оставлять IF в подвешенном состоянии на странице? Это норм?
    // Обязательно ли создавать отдельную переменную для хранения нового State или чаще его пишут напрямую в setTasks? Или зависит от случая к случаю? Как сделать лучше в нашем варианте?

    const [filter, setFilter] = useState<filterType>("all")

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
            <Todolist title={todolistTitles[0]} tasks={filteredTasks} removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}

export default App;
