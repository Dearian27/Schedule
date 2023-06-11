import { useState } from 'react';
import { ReactComponent as DeleteIcon } from  '../assets/delete.svg';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Card = ({name, id, status, remove}) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const deleteUser = async() => {
    try {
      const res = await axios.delete(`admin/users/${id}`);
      console.log(res);
      remove(id);
    }catch(error) {
      if(error.response.status === 400) {
        navigate("/");
      }
      toast.error("Щось пішло не так");
    }
  }

  return (
    <div className="card" style={{borderColor: `${hover ? "#ff7171" : "#5e5e5e"}`, color: `${hover ? "#ff7171" : "#5e5e5e"}`}}>
      <div className="options">
      <span style={{width: "50%"}}>id: {id}</span>
      <span style={{width: "50%"}}>name: {name}</span>
      </div>
      {(status !== "ADMIN" && status !== "BOT") &&
      <DeleteIcon onClick={() => deleteUser()}
        style={{fill: `${hover ? "#ff7171" : "#5e5e5e"}`, height: "24px", width: "24px", transition: "0.5s ease-in-out", justifySelf: "center"}}
        onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)} alt="delete" />
      }
    </div>
  )
}

export default Card;