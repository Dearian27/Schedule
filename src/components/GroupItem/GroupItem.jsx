const GroupItem = ({toggleTab, name, toggleState, id}) => {
    return (
        <div onClick={toggleTab} className={toggleState === id ? "groupItem activeItem" : "groupItem"}>
            {name} 
        </div>
    )
}

export default GroupItem