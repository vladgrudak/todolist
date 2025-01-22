type TodolistHeaderPropsType = {
    title: string
}
export const TodolistHeader = ({title}: TodolistHeaderPropsType) => {
    return (
        <h3 className={'todolist-header'}>{title}</h3>
    );
}