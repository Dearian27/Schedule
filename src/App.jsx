import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import { HashRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import AdminPage from "./pages/AdminPage";
import './index.scss';

const App = () => {
  return (
  <HashRouter>
      <Provider store={store}>
      <div className="wrapper">
        <Header />
        <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/admin" element={<AdminPage />}/>
        </Routes>
      </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
