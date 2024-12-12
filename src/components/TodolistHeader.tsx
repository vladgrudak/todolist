type TodolistHeaderPropsType = {
    title: string
}
export const TodolistHeader = ({title}: TodolistHeaderPropsType) => {
    return (
        <h3>{title}</h3>
    );
};