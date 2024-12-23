import {Button} from "./Button";
import {filterType} from "../App";

type FilterButtonsPropsType = {
    changeTodoListFilter: (nextFilter: filterType) => void
    filter?: filterType
}

export const FilterButtons = ({changeTodoListFilter, filter}: FilterButtonsPropsType) => {
    return (
        <div>
            <Button
                classes={filter === 'all' ? 'filter-btn-active': ''}
                title='All'
                onClickHandler={() => changeTodoListFilter('all')}
            />
            <Button
                classes={filter === 'active' ? 'filter-btn-active': ''}
                title='Active'
                onClickHandler={() => changeTodoListFilter('active')}
            />
            <Button
                classes={filter === 'completed' ? 'filter-btn-active': ''}
                title='Completed'
                onClickHandler={() => changeTodoListFilter('completed')}
            />
        </div>
    );
};