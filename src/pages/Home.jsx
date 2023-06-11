import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupItem from "../components/GroupItem/GroupItem"
import GroupTable from "../components/GroupTable/GroupTable";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import { setAuth } from "../redux/features/userSlice";
import { setGroupId, setShedule } from "../redux/features/sheduleSlice";

const Home = () => {
  const { userStatus } = useSelector(state => state.user);
  const { shedule } = useSelector(state => state.shedule);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const { isAuth } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isSheduleLoading, setIsSheduleLoading] = useState(false);
  const [toggleState, setToggleState] = React.useState(0);
  const [groups, setGroups] = useState([]);
  
  const toggleTab = async(name, id) => {
    setToggleState(id); 
    try {
      setIsSheduleLoading(true);
      const response = await axios.get(`/groups/${id}`);
      dispatch(setShedule(response.data));
      dispatch(setGroupId(id));
      setIsActive(true);
      setIsSheduleLoading(false);
    }catch(err) {
      setIsSheduleLoading(false);
      toast.error("Something went wrong!");
      console.log(err);
    }
  }
  useEffect(() => {
    if(!isAuth) {
      navigate("/login");
    }
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/groups`);
        console.log(res);
        setGroups(res.data);
        setIsLoading(false);
      }
      catch(error) {
        setIsLoading(false);
        if(error?.response?.status === 401) {
          dispatch(setAuth(false));
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        console.log(error);
      }
    }
    fetchGroups();
  }, [isAuth, navigate, dispatch]);

  return (
    <>
      {userStatus === "ADMIN" &&
        <button onClick={() => navigate('/admin')} className="adminButton">
          Admin
        </button>
      }
      <div className="contentWrapper">
        <div className="groupList">
          {groups.map(el =>
            <GroupItem id={el.id} key={el.id}
            toggleState={toggleState} toggleTab={() => toggleTab(el.groupName, el.id)}
            name={el.groupName}/>
          )}
        </div>
        {isSheduleLoading ?
          <Triangle
            height="60"
            width="60"
            color="#3B6BBD"
            ariaLabel="triangle-loading"
            wrapperStyle={{ justifyContent: "center" }}
            visible={true}
          />
          : shedule && isActive &&
          <GroupTable key={shedule.id}/>
        }
      </div>
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
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default Home;