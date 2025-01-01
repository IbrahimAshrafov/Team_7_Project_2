import { useState, useEffect} from 'react'
import { useContext, useRef } from 'react';
import { RenderContext } from '../../App';
import { Link } from 'react-router';
import Card from './Card';


function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const { rerender } = useContext(RenderContext);
    const search = useRef();
    const [difficultyOrder, setDifficultyOrder] = useState({
        'Easy': 1,
        'Medium': 2,
        'Hard': 3
      });

    const [filterDiff, setFilterDiff] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/recipes")
        .then((res) => res.json())
        .then((data) => {
            setRecipes(data);
        })

    }, [rerender]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/recipes')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => item.title.toLowerCase().includes(search.current.value.toLowerCase()));
            setRecipes(filteredData);
        });
    }

    const handleSort = (sortValue) => {
        console.log(sortValue)
        if (sortValue === 'date') {
          setRecipes([...recipes].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)));
        } else if (sortValue === 'title') {
          setRecipes([...recipes].sort((a, b) => a.title.localeCompare(b.title)));
        } 
        else if (sortValue === 'difficulty') {
            setRecipes([...recipes].sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]));
          }
      };



  return (
    <>
    <div className="bg-gray-300 w-full py-5 px-3 flex flex-col gap-3 items-center md:flex-row md:gap-0 justify-between">

    <div className="md:w-1/3">
        <Link to={'/recipes/add'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Recipe</Link>
    </div>
    <div className="md:w-1/3">
    <div className="w-full max-w-sm min-w-[200px]">
        <div className="relative">
            <input
            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-blue-400 hover:border-slabluete-300 shadow-sm focus:shadow"
            placeholder="Search..."
            ref={search} 
            />
            <button
            className="absolute top-1 right-1 flex items-center rounded bg-blue-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow active:bg-blue-700 hover:bg-blue-700 active:shadow-none"
            type="button"
            onClick={handleSearch}
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
            </svg>
        
            Search
            </button> 
        </div>
    </div>
    </div>
    <div className="flex gap-3 md:w-1/3">
        <select onChange={(e) => handleSort(e.target.value)} className=' block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-3 ' defaultValue={'date'} name="sort" id="">
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="difficulty">Sort by Difficulty</option>
        </select>
        <select onChange={(e) => setFilterDiff(e.target.value)} className=' block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-3 ' defaultValue={''} name="sort" id="">
            <option value="">Filter by difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
    </div>

    </div>

    <div className="flex flex-wrap gap-2 justify-center mt-5">
        {recipes.filter((recipe) => filterDiff === '' || recipe.difficulty === filterDiff).map((recipe) => (
            <Card key={recipe.id} {...recipe} />
        ))}
        </div>

    </>
  )
}

export default Recipes