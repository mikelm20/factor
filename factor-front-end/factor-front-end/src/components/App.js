import React from "react";
import Header from "./Header"
import '../styles/App.css';
import Routes from './Routes';
import { BrowserRouter as Router} from 'react-router-dom';
import Footer from "../components/Footer";

function App() {

  const [auth, setAuth] = React.useState(false);

  const user = window.localStorage.getItem("owner");
  
  React.useEffect(() => {
    if(user){
      setAuth(true);
    }
  }, [user]);
  

  const login = (value) =>{
    setAuth(value);
  }

  return (
      <div className="App">
        <Router>
          <div className="App-header">
            <Header/>
          </div>
          <div className="App-body">
            <Routes login={login} auth={auth}/>
          </div>
          <div className="App-footer">
            <Footer login={login} auth={auth}/>
          </div>
        </Router>
      </div>
  );
}

export default App;
