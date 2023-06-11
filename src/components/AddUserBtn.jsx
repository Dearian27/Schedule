import { useState } from 'react';
import { ReactComponent as PLusIcon } from  '../assets/plus.svg';

const AddUserBtn = ({click}) => {
  const [hover, setHover] = useState(false);
  return (
    // <div 
    //   className="card" onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)} 
    //   style={{borderColor: `${hover ? "#1eff69" : "#5e5e5e"}`, padding: "10px 30px", justifyContent: "center"}}
    // >
      <PLusIcon 
        onClick={() => click()}
        onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}
        style={{fill: `${hover ? "#1eff69" : "#5e5e5e"}`, transition: "0.5s ease-in-out", height: "40px", width: "40px"}}
        alt="delete"
      />
    // </div>
  )
}

export default AddUserBtn;