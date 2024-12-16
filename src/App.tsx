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
    console.log(v1());

    //BLL
    const todolistTitles = ['Что помыть', 'Title2', 'Title3']

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "Помыть посуду", isDone: true},
            {id: v1(), title: "Помыть попу", isDone: false},
            {id: v1(), title: "Помыть собаку", isDone: false}
        ]
    )

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
            <Todolist title={todolistTitles[0]}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
