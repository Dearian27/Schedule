import TableItem from "./TableItem/TableItem";

const GroupTable = ({toggleState, id}) => {
    return (
        <div className={ toggleState === id ? 'groupTable activeTable' : 'groupTable'}>
           <TableItem />
           <TableItem />
           <TableItem />
           <TableItem />
           <TableItem />
           <TableItem />
        </div>
    )
}

export default GroupTable;