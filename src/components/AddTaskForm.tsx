import React from 'react';
import {Button} from './Button';


type AddFormPropsType = {
    title?: string
}
export const AddTaskForm = (props: AddFormPropsType) => {
    return (
        <div>
            <input value={props.title} />
            <Button title="+"/>
        </div>
    );
};