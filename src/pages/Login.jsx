import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Triangle } from 'react-loader-spinner'
import { useState } from "react";
import { setAuth, setUserStatus } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import loginImg from '../assets/img1.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = async (e) => {
    e.preventDefault();
    if(!password || !username) {
      toast.error("Впишіть дані!");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/login', {
        login: username,
        password: password,
      })
      setIsLoading(false);
      if (response.data["token"]) {
        window.localStorage.setItem('token', response.data["token"])
        dispatch(setAuth(true));
        dispatch(setUserStatus(response.data.status));
        navigate('/');
      } else {
        toast.error("Сервер не відповідає.");
      }
    }catch(err) {
      setIsLoading(false);
      if(err?.response?.status === 401) {
        toast.error("Пароль чи ім'я користувача введені невірно!");
        return;
      }
      toast.error("Щось пішло не так!");
      console.log(err);
    }
  }

    return (
      <>
        <div className="loginForm">
          <form onSubmit={submitForm}>
            <h1>Увійти</h1>
            <div className="loginFields">
              <img src={loginImg} alt="img" />
              <div className="loginInputs">
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="login" placeholder="Username" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <button type="submit">Увійти</button>
          </form>
          {isLoading &&
            <div style={{position: "fixed", bottom: "60px", right: "60px"}}>
              <Triangle
                height="60"
                width="60"
                color="#3B6BBD"
                ariaLabel="triangle-loading"
                wrapperStyle={{ justifyContent: "center" }}
                visible={true}
              />
            </div>
          }
        </div>
      <ToastContainer position="bottom-center" />
    </>
    )
  }

export default Login;