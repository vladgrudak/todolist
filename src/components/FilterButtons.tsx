import {Button} from "./Button";
import {filterType} from "../App";

type FilterButtonsPropsType = {
    changeTodoListFilter: (nextFilter: filterType) => void
}

export const FilterButtons = ({changeTodoListFilter}: FilterButtonsPropsType) => {
    return (
        <div>
            <Button title='All' onClickHandler={() => changeTodoListFilter('all')}/>
            <Button title='Active' onClickHandler={() => changeTodoListFilter('active')}/>
            <Button title='Completed' onClickHandler={() => changeTodoListFilter('completed')}/>
        </div>
    );
};