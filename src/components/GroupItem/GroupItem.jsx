const GroupItem = ({toggleTab, name, toggleState, id}) => {
    return (
        <div onClick={toggleTab} className={toggleState === id ? "groupItem activeItem" : "groupItem"}>
            <p>{name}</p>
        </div>
    )
}

export default GroupItem