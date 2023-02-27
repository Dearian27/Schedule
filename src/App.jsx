import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";

let data =  {
  isAuth: true
}

let groupList = [
  { id: 1, groupName: 'Назва групи'},
  { id: 2, groupName: 'Назва групи'},
  { id: 3, groupName: 'Назва групи'},
  { id: 4, groupName: 'Назва групи'},
  { id: 5, groupName: 'Назва групи'},
  { id: 6, groupName: 'Назва групи'},
  { id: 7, groupName: 'Назва групи'},
  { id: 8, groupName: 'Назва групи'},
]

let groupTableContent = [
  { id: 1},
  { id: 2},
  { id: 3},
  { id: 4},
  { id: 5},
  { id: 6},
  { id: 7},
  { id: 8},
]

const App = () => {

  let backgroundUrl = data.isAuth ? 'img/background2.png' : 'img/background1.png';

  return (
  <div style={{backgroundImage: `url(${backgroundUrl})`}} className="wrapper" >
      <Header />
      {!data.isAuth && <Login />}
      <Home items={groupList} tableItems={groupTableContent}/>
    </div>
  );
}

export default App;
