import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button'

type Props = {
    addItem: (title: string) => void
}


export const CreateItemForm = ({addItem}: Props) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const isAddItemPossible = itemTitle.length <= 15

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if(trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setItemTitle('')
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((itemTitle.length && isAddItemPossible) && e.key === 'Enter') {
            addTaskHandler()
        }
    }
    
    return (
        <div>
            <input value={itemTitle}
                   onChange={setLocalTitleHandler}
                   onKeyDown={onKeyDownAddTaskHandler}
                   className={error ? 'inputError' : ''}
            />

            <Button title="+"
                    onClickHandler={addTaskHandler}
                    isDisabled={!itemTitle.length || !isAddItemPossible}
            />
            {error && <div style={{color: "red"}}>Title is required</div>}
        </div>
    );
};