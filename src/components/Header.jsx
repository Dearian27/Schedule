import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';

const Header = () => {
  const { isAuth } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate('/login');
  }

  return (
    <div className="logo">
      <img src={Logo} alt="logo" width={230} height={213}/>
      {isAuth &&
      <button className="btn" onClick={handleLogOut}>
        Вийти
      </button>
      }
    </div>
  )
}

export default Header