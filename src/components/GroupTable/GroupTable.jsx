import { useState } from "react";
import TableItem from "./TableItem/TableItem";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultShedule, setStartShedule } from "../../redux/features/sheduleSlice";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const GroupTable = () => {
  const { user } = useSelector(state => state.user);
  const { groupId, shedule } = useSelector(state => state.shedule);
  const dispatch = useDispatch();
  const [btnsDis, setBtnsDis] = useState(true);
  const isChange = () => {
    setBtnsDis(false);
  }
  console.log(user)
  const resetShedule = () => {
    setBtnsDis(true);
    dispatch(setDefaultShedule());
  }
  const updateShedule = async () => {
    setBtnsDis(true);
    try {
      await axios.put('/groups', {
        groupsDTO: {id: groupId},
        week: shedule
      });
      dispatch(setStartShedule(shedule));
      setBtnsDis(true);
      toast.success("Розклад оновлено.");
    }catch(error) {
      toast.error("Щось пішло не так.");
    }
  }

  return (
    <div style={{display: 'block'}}>
      <div className='groupTable' style={{gap: "40px"}}>
        <TableItem change={isChange} day="Понеділок" />
        <TableItem change={isChange} day="Вівторок" />
        <TableItem change={isChange} day="Середа" />
        <TableItem change={isChange} day="Четвер" />
        <TableItem change={isChange} day="П`ятниця" />
        <TableItem change={isChange} day="Субота" />
      </div>
      <div className="buttons">
      <button onClick={() => resetShedule()} disabled={btnsDis} className="button outline">
        Відхилити
      </button>
      <button onClick={() => updateShedule()} disabled={btnsDis} className="button">
        Зберегти
      </button>
      </div>
    </div>
  )
}

export default GroupTable;