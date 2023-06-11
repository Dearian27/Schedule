import React, { useState } from 'react';
import {ReactComponent as CrossIcon} from '../assets/cross.svg';
import Select from 'react-select'
import { toast } from 'react-toastify';
import axios from '../utils/axios';

const options = [
  { value: 'authorized', label: 'Учитель' },
  { value: 'ADMIN', label: 'Адміністратор' },
]

const RegistrationModal = ({ fetchUsers, onClose }) => {
  const [status, setStatus] = useState({});
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const handleStatusChange = (option) => {
    setStatus(option);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(name.length < 2 && name.length > 100) {
      toast.error("Довжина логіна має бути від 2 до 100 символів.")
      return;
    }
    if(name.length < 2 && name.length > 100) {
      toast.error("Довжина пароля має бути від 2 до 100 символів.")
      return;
    }
    const regex = /[{}"]/;
    if(name.match(regex) || password.match(regex)) {
      toast.error("Не дозволено використовувати символи: \", {, }.")
      return;
    }
    try {
      await axios.put(
        "/admin/new",
        { 
          login: name, 
          password: password,
          status: status.value
        }
      );
      toast.success("Користувача додано успішно.");
      setStatus('');
      await fetchUsers();
      onClose();
    }catch(error) {
      if(error.status === 400) {
        toast.error("Такий користувач уже існує");
        return;
      }
      toast.error("Щось пішло не так");
    }
  };

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={handleSubmit}>
        <CrossIcon className="close" onClick={onClose} />
        <h1 className='title'>Реєстрація</h1>

          <input value={name} onChange={(event) => setName(event.target.value)} placeholder='Username' className='input' type="text" />
          <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Password' className='input' type="password" />
          <Select 
            value={status} onChange={handleStatusChange}
            className='statusSelect' options={options}
          />
          <button className='submit' type="submit" disabled={!status && password && name}>
            Зареєструвати
          </button>
      </form>
      <style jsx>{`
        .modal {
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
          position: relative;
          background-color: #fefefe;
          padding: 15px 20px 25px 20px;
          border: 1px solid #888;
          border-radius: 15px;
          width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .input {
          font-size: 18px;
          box-sizing: border-box;
          width: 320px;
          padding: 10px;
          border-style: none;
          border: 2px solid #CCCCCC;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .input:focus {
          outline: none;
        }
        .title {
          width: calc(100% - 100px);
          text-align: center;
          margin-bottom: 20px;
        }
        .close {
          top: 10px;
          right: 10px;
          position: absolute;
          height: 30px;
          width: 30px;
          color: #aaa;
          cursor: pointer;
        }
        .statusSelect {
          width: 320px;
        }
        .submit {
          border-style: none;
          border: 1px solid #000000;
          margin: 20px 0px 10px 0px;
          font-size: 16px;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: 600;
          background-color: inherit;
          transition: 0.4s ease;
        }
        .submit:disabled {
          border: 1px solid #CCCCCC;
        }
      `}</style>
    </div>
  );
};

export default RegistrationModal;
