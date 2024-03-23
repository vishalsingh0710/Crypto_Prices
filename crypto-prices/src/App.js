import './App.css';
import CoinsPage from './Pages/CoinsPage';
import HomePage from './Pages/HomePage';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: '100vh'
  }
}));

function App() {
  const classes = useStyles(); 

  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/coins/:id' element={<CoinsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
