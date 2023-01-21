import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Register from './pages/Register/Register';
import Authenticate from './pages/Authenticate/Authenticate';
import { Children } from 'react';

const isAuth = true

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
      <Route path='/'element={<Home />} />
      <Route path='/register'element={<Register />} />
      <GuestRoute path='/authenticate'element={<Authenticate />} />
      </Routes>
    </Router>
  );
}

const GuestRoute = ({children, ...rest}) => {

  return (
    <Route {...rest} render={({location})=> {
      return isAuth ? (
      <Navigate to={
        {
          pathname: '/rooms',
          state: {from: location},
        }
      }/>
      ) :
      (children)
    }}/>
  )
}
export default App;
