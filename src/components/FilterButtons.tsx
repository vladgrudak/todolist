import {Button} from "./Button";
import {FilterType} from "../App";

type FilterButtonsPropsType = {
    changeTodoListFilter: (nextFilter: FilterType, todolistId: string) => void
    todolistId: string
    filter?: FilterType
}

export const FilterButtons = ({changeTodoListFilter, filter, todolistId}: FilterButtonsPropsType) => {
    return (
        <div>
            <Button
                classes={filter === 'all' ? 'filter-btn-active': ''}
                title='All'
                onClickHandler={() => changeTodoListFilter('all', todolistId)}
            />
            <Button
                classes={filter === 'active' ? 'filter-btn-active': ''}
                title='Active'
                onClickHandler={() => changeTodoListFilter('active', todolistId)}
            />
            <Button
                classes={filter === 'completed' ? 'filter-btn-active': ''}
                title='Completed'
                onClickHandler={() => changeTodoListFilter('completed', todolistId)}
            />
        </div>
    );
};