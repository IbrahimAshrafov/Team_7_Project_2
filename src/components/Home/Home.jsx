import { useState, useEffect } from 'react'
import Card from '../Recipe/Card';
import { Link } from 'react-router';

function Home() {

    const [featured, setFeatured] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3001/recipes")
          .then((res) => res.json())
          .then((data) => {
            let sortedData = data.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            sortedData = sortedData.slice(0, 3);
            setFeatured(sortedData);
          })
          .catch((err) => console.log(err));
    }, []);

  return (
    <>
    <div className="h-[40vh] bg-cover"
    style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/03/32/75/39/360_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg')" }}>
        <div className=' h-full flex justify-center items-center flex-col text-center bg-gray-900 bg-opacity-50'>
            <h1 className="text-5xl font-bold mb-4 text-white">Welcome!</h1>
            <p className="text-lg text-white mb-8">In this recipe website, you can find a wide range of delicious recipes for all occasions.</p>
            <Link to="/recipes" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
            </Link>
        </div>
    </div>

    <div>
        <h1 className="text-4xl font-bold my-4 px-4">Popular Recipes</h1>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {featured.map((recipe) => (
            <Card key={recipe.id} {...recipe} />
          ))}
        </div>
    </div>


    <div className='mx-6 min-h-[30vh]'>
        <h2 className='text-4xl font-bold my-4'>Our Projects</h2>
        <p className='text-lg'>This is the second project of Web and Mobile I course, recipe manager application. Here you can find various recipes and manage them.</p> <br />
        <p className='text-lg font-semibold'>Here is the project we made for the first assignment:</p>
        <p className='text-lg inline-block bg-slate-200 rounded-md pl-4 pr-2'>• Auto Form Filler Extension →</p> <a className='text-blue-500' href="https://github.com/ralizada16092/chrome-auto-form-filler.git">Click Here</a>
    </div>

    </>
  )
}

export default Home