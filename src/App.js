import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/Home/Home';
import Recipes from './components/Recipe/Recipes';
import CreateRecipe from './components/Recipe/CreateRecipe';
import RecipeDetail from './components/Recipe/RecipeDetail';
import { useState, createContext } from 'react';


export const RenderContext = createContext()

function App() {


  const [rerender, setRerender] = useState(0)


  return (
    <RenderContext.Provider value={{ rerender, setRerender }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/add" element={<CreateRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/edit/:id" element={<CreateRecipe />} />
      </Routes>
    </BrowserRouter>
    </RenderContext.Provider>
  );  
}

export default App;
