import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box';

type Props = {
    addItem: (title: string) => void
}


export const CreateItemForm = ({addItem}: Props) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const isAddItemPossible = itemTitle.length <= 15

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setItemTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError('Title is required!')
        }
        setItemTitle('')
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((itemTitle.length && isAddItemPossible) && e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
                sx={{minWidth: '240px'}}
                label={'Enter a title'}
                variant={'outlined'}
                value={itemTitle}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={setLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskHandler}
            />
            <IconButton onClick={addTaskHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
        </Box>
    );
};