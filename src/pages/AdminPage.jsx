import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Card from "../components/Card";
import AddUserBtn from "../components/AddUserBtn";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import RegistrationModal from "../components/RegistrationModal";

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userStatus } = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const removeCard = (id) => {
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
  }
  const fetchUsers = async () => {
    try {
      const {data} = await axios.get('/admin/users');
      setUsers(data);
    }catch(error) {
      if(error.responce.status === 401) {
        navigate("/");
      }
      toast.error("Сталася помилка.");
    }
  }
  useEffect(() => {
    if (userStatus !== "ADMIN") {
      navigate("/");
    }
    fetchUsers();
  }, [navigate, userStatus])
  
  return (
    <>
      <button onClick={() => navigate('/')} className="adminButton outline">
        Back
      </button>
      <div className="container">
        <div className="content">
          {users.map((user) => 
            <Card remove={removeCard} name={user.login} key={user.id} id={user.id} status={user.status} />
          )}
          <AddUserBtn click={() => setIsModal(true)} />
          {isModal && <RegistrationModal fetchUsers={fetchUsers} onClose={() => setIsModal(false)} />}
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default AdminPage;