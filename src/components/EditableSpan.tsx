import {ChangeEvent, useState} from 'react';

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

    return (
        isEditMode
            ? <input
                autoFocus
                value={itemTitle}
                onChange={setLocalTitleHandler}
                onBlur={turnOffEditMode}
            />
            : <span onDoubleClick={turnOnEditMode}>{title}</span>
    )
};