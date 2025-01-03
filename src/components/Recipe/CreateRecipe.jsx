import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";

function CreateRecipe() {

    const [data, setData] = useState({
        title: "",
        description: "",
        ingredients: [],
        preparation: [],
        tags: ['asdfadf', 'asdfasdf'],
        difficulty: "Easy",
    })


    const navigate = useNavigate()

    const { id } = useParams()


    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === 'title') {
            setData((prevState) => ({ ...prevState, title: value }));
          }
        if (name === 'description') {
            setData((prevState) => ({ ...prevState, description: value }));
        }
        if (name === 'difficulty') {
            setData((prevState) => ({ ...prevState, difficulty: value }));
        }
        if (name.startsWith('tag')) {
            const index = parseInt(name.split('-')[1], 10) - 1 ; 
            // console.log(index)
            setData((prevState) => {
                const newTags = [...prevState.tags];
                if (index < newTags.length) {
                newTags[index] = value;
                } else if (value.trim() !== '') {
                newTags.push(value);
                }
                return { ...prevState, tags: newTags };
            });
          }
          
        if (name.startsWith('ingredient')) {
            const index = parseInt(name.split('-')[1], 10) - 1;
            setData((prevState) => {
                const newIngredients = [...prevState.ingredients];
                if (index < newIngredients.length) {
                newIngredients[index] = value;
                } else if (value.trim() !== '') {
                newIngredients.push(value);
                }
                return { ...prevState, ingredients: newIngredients };
            });
        }
        if (name.startsWith('prep')) {
            const index = parseInt(name.split('-')[1], 10) - 1;
            setData((prevState) => {
                const newPrepSteps = [...prevState.preparation];
                if (index < newPrepSteps.length) {
                newPrepSteps[index] = value;
                } else if (value.trim() !== '') {
                newPrepSteps.push(value);
                }
                return { ...prevState, preparation: newPrepSteps };
            });
        }
          
    }


    const createTag = (e, value='') => {
        if (e) e.preventDefault();
        const div = document.querySelector('.tag-div');

        const childCount = div.children.length + 1;

        const newDiv = document.createElement('div');
        newDiv.id = `dtag-${childCount}`;
        newDiv.className = 'flex';

        const input = document.createElement('input');
        input.className = 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';
        input.name = `tag-${childCount}`;
        input.type = 'text';
        input.placeholder = 'Enter a tag';
        input.addEventListener('input', handleInput);
        input.value = value;

        const button = document.createElement('button');
        button.className = 'bg-red-500 hover:bg-red-700 text-white px-3 mb-3 text-xl rounded';
        button.innerHTML = 'x';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(newDiv.id.split('-')[1], 10) - 1;
            setData(data => ({ ...data, tags: data.tags.filter((item, i) => i !== index) }));
            div.removeChild(newDiv);
        });

        newDiv.appendChild(input);
        newDiv.appendChild(button);

        div.appendChild(newDiv);

    }

    const createIngredient = (e, value='') => {
        if (e) e.preventDefault();
        const div = document.querySelector('.ingredient-div');

        const childCount = div.children.length + 1;

        const newDiv = document.createElement('div');
        newDiv.id = `dingredient-${childCount}`;
        newDiv.className = 'flex';

        const input = document.createElement('input');
        input.className = 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';
        input.name = `ingredient-${childCount}`;
        input.type = 'text';
        input.placeholder = 'Enter a ingredient';
        input.addEventListener('input', handleInput);
        input.value = value;

        const button = document.createElement('button');
        button.className = 'bg-red-500 hover:bg-red-700 text-white px-3 mb-3 text-xl rounded';
        button.innerHTML = 'x';
        button.addEventListener('click', (e) => {
            const index = parseInt(newDiv.id.split('-')[1], 10) - 1;
            setData(data => ({ ...data, ingredients: data.ingredients.filter((item, i) => i !== index) }));
            e.preventDefault();
            div.removeChild(newDiv);
        });

        newDiv.appendChild(input);
        newDiv.appendChild(button);

        div.appendChild(newDiv);

    }

    const createPrep = (e, value='') => {
        if (e) e.preventDefault();
        const div = document.querySelector('.prepStep-div');

        const childCount = div.children.length + 1;

        const newDiv = document.createElement('div');
        newDiv.id = `dprep-${childCount}`;
        newDiv.className = 'flex';

        const input = document.createElement('input');
        input.className = 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white';
        input.name = `prep-${childCount}`;
        input.type = 'text';
        input.placeholder = 'Enter a step';
        input.addEventListener('input', handleInput);
        input.value = value;

        const button = document.createElement('button');
        button.className = 'bg-red-500 hover:bg-red-700 text-white px-3 mb-3 text-xl rounded';
        button.innerHTML = 'x';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(newDiv.id.split('-')[1], 10) - 1;
            setData(data => ({ ...data, preparation: data.preparation.filter((item, i) => i !== index) }));
            div.removeChild(newDiv);
        });

        newDiv.appendChild(input);
        newDiv.appendChild(button);

        div.appendChild(newDiv);

    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            ...data,
            lastUpdated: new Date().toISOString(),
          };
        fetch('http://localhost:3001/recipes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
          })
            .then((response) => {response.json(); navigate('/recipes')})
            .then((data) => console.log('Recipe created:', data))
            .catch((error) => console.error('Error creating recipe:', error));

    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const newRecipe = {
            ...data,
            lastUpdated: new Date().toISOString(),
          };
        fetch(`http://localhost:3001/recipes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
          })
            .then((response) => {response.json(); navigate('/recipes')})
            .then((data) => console.log('Recipe updated:', data))
            .catch((error) => console.error('Error updating recipe:', error));
    }





    const mounted = useRef(false);
    useEffect(() => {
      if (!mounted.current) {
        if (id) {
            fetch(`http://localhost:3001/recipes/${id}`)
            .then(res => res.json())
            .then(d => {
                setData({
                    title: d.title,
                    description: d.description,
                    ingredients: d.ingredients,
                    preparation: d.preparation,
                    tags: d.tags,
                    difficulty: d.difficulty,
                })
                for (let i of d.tags) {
                    createTag(null, i);
                }
                for (let i of d.ingredients) {
                    createIngredient(null, i);
                }
                for (let i of d.preparation) {
                    createPrep(null, i);
                }
            })
            .catch(err => console.log(err))
        }
        else {
            createTag();
            createIngredient();
            createPrep();
        }
        mounted.current = true;
      }
    }, [])



  return (
    <>
      <form className="m-auto pt-5 max-w-lg px-3 md:px-0">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Recipe Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="title"
              id="title"
              type="text"
              placeholder="Enter a title"
              onChange={handleInput}    
              value={data.title}       
               />

          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                name="description"
                id="description"
                placeholder="Enter a description"
                onChange={handleInput}
                value={data.description}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="difficulty"
            >
              Difficulty
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="difficulty"
                defaultValue={'Easy'}
                name="difficulty"
                onChange={handleInput}
                value={data.difficulty}
              >
                <option value={'Easy'}>Easy</option>
                <option value={'Medium'}>Medium</option>
                <option value={'Hard'}>Hard</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="tags"
            >
              Tags
            </label>
            <div className="tag-div flex flex-col gap-2">
                

            </div>

        </div>
        <button onClick={createTag} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add Tag</button>

        <div className="w-full mt-5 mb-6 md:mb-0">
        <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="ingredients"
        >
            Ingredients
        </label>
        <div className="ingredient-div flex flex-col gap-2">
            

        </div>

        </div>
        <button onClick={createIngredient} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add Ingredient</button>

        <div className="w-full mt-5 mb-6 md:mb-0">
        <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="preps"
        >
            Preparation
        </label>
        <div className="prepStep-div flex flex-col gap-2">
           

        </div>

        </div>
        <button onClick={createPrep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add Step</button>


        <div className="w-full flex justify-center my-6 ">
            {id ? (
                <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Update Recipe</button>
            ) : (
                <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Recipe</button>
            )}
        </div>

      </form>
    </>
  );
}

export default CreateRecipe;
