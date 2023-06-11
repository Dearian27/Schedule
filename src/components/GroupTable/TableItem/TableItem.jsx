import { useDispatch, useSelector } from "react-redux";
import { changeShedule } from "../../../redux/features/sheduleSlice";

const TableItem = ({day, change}) => {
	const dispatch = useDispatch();
	const { shedule } = useSelector(state => state.shedule);
	const inputChange = (event, index) => {
		let value = event.target.value;
		change();
		const regex = /[{}"]/;
    if(value.match(regex)) {
			value = value.replaceAll(/"/, "");
    }
		dispatch(changeShedule({day, value, index}));
	}
	return (
		<form className="tableItem" name="">
			<span className="day">{day}</span>
			<input value={shedule?.[day]?.["1"]} 
					onChange={(event) => inputChange(event, "1")} 
					type='text' name='pair1'
			/>
			<input value={shedule?.[day]?.["2"]} 
					onChange={(event) => inputChange(event, "2")} 
					type='text' name='pair2'
			/>
			<input value={shedule?.[day]?.["3"]} 
				onChange={(event) => inputChange(event, "3")} 
				type='text' name='pair3'
			/>
			<input value={shedule?.[day]?.["4"]} 
				onChange={(event) => inputChange(event, "4")} 
				type='text' name='pair4'
			/>
			<input value={shedule?.[day]?.["5"]} 
				onChange={(event) => inputChange(event, "5")} 
				type='text' name='pair5'
			/>
			{/* <input value={shedule?.[day]?.["6"]} 
				onChange={(event) => inputChange(event, "6")} 
				type='text' name='pair6'
			/> */}
		</form>
	)
}

export default TableItem;