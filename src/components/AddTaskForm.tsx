import React from "react";
import {Button} from "./Button";


type AddFormPropsType = {
    title: string
}
export const AddTaskForm = () => {
    return (
        <div>
            <input/>
            <Button title='+' />
        </div>
    );
};