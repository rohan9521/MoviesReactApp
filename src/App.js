
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Movies from './components/Movies';

function App() {
  return (
    <>
      <Navbar/>
      <Banner/>
      <Movies/>
    </>
  );
}

export default App;
