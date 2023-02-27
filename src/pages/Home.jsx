import GroupItem from "../components/GroupItem/GroupItem"
import React from "react";
import GroupTable from "../components/GroupTable/GroupTable";

const Home = ({items, tableItems}) => {
    // console.log(tableItems);
    // const [groupItem, setGroupItem] = React.useState([]);
    const [toggleState, setToggleState] = React.useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <div className="contentWrapper">
            <div className="groupList">
                {items.map(el => <GroupItem id={el.id} toggleState={toggleState} toggleTab={() => toggleTab(el.id)} key={el.id} name={el.groupName}/>)}
            </div>
            {tableItems.map(el => <GroupTable id={el.id} toggleState={toggleState} key={el.id}/>)}
        </div>
    )
}

export default Home;