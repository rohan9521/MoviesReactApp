
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Favourites from './components/Favourites';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Routes>

          <Route path='/' element={
            <>
              <Banner />
              <Movies />
            </>
          }>
          </Route>

          <Route path='/favourites' Component={Favourites} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
