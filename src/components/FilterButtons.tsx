import Button from '@mui/material/Button';
import {FilterType} from "../App";
import Box from '@mui/material/Box';
import {containerSx} from '../FilterButtons.styles'

type FilterButtonsPropsType = {
    changeTodoListFilter: (nextFilter: FilterType, todolistId: string) => void
    todolistId: string
    filter?: FilterType
}

export const FilterButtons = ({changeTodoListFilter, filter, todolistId}: FilterButtonsPropsType) => {
    return (
        <Box sx={containerSx}>
            <Button
                variant={'contained'}
                color={filter === 'all' ? 'primary': 'secondary'}
                onClick={() => changeTodoListFilter('all', todolistId)}
            >All</Button>
            <Button
                variant={'contained'}
                color={filter === 'active' ? 'primary': 'secondary'}
                onClick={() => changeTodoListFilter('active', todolistId)}
            >Active</Button>
            <Button
                variant={'contained'}
                color={filter === 'completed' ? 'primary': 'secondary'}
                onClick={() => changeTodoListFilter('completed', todolistId)}
            >Completed</Button>
        </Box>
    );
};