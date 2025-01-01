import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/Home/Home';
import { useState, createContext } from 'react';


export const RenderContext = createContext()

function App() {


  const [rerender, setRerender] = useState(0)


  return (
    <RenderContext.Provider value={{ rerender, setRerender }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </RenderContext.Provider>
  );  
}

export default App;
