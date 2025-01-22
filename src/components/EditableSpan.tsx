import {ChangeEvent, type KeyboardEvent, useState} from 'react';

type Props = {
    title: string
    changeItemName: (newTitle: string) => void
}

export const EditableSpan = ({title, changeItemName} : Props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [itemTitle, setItemTitle] = useState(title)

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }
    const turnOffEditMode = () => {
        setIsEditMode(false)
        changeItemName(itemTitle)
    }
    const changeTitleOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            turnOffEditMode()
        }
    }

    return (
        isEditMode
            ? <input
                autoFocus
                value={itemTitle}
                onChange={setLocalTitleHandler}
                onBlur={turnOffEditMode}
                onKeyDown={changeTitleOnEnter}
            />
            : <span onDoubleClick={turnOnEditMode}>{title}</span>
    )
};