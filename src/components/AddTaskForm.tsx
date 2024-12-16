import React from 'react';
import {Button} from './Button';


type AddFormPropsType = {
    title?: string
    addTask: (title: string) => void
}
export const AddTaskForm = (props: AddFormPropsType) => {
    return (
        <div>
            <input value={props.title} />
            <Button title="+" onClickHandler={() => props.addTask("Empty")}/>
        </div>
    );
};