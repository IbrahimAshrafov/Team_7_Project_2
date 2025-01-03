import { useState, useEffect } from 'react'
import { useParams } from 'react-router';

function RecipeDetail() {

    const [detail, setDetail] = useState({});
    const { id } = useParams();


    useEffect(() => {
        fetch(`http://localhost:3001/recipes/${id}`)
        .then(res => res.json())
        .then(data => setDetail(data))
        .catch(err => console.log(err))
    }, [id])



  return (
    <>
    
        <div className=' mt-5 flex justify-center'>
            <div className='w-3/4 md:w-1/2 flex flex-col items-center gap-4 '>
                <h1 className='text-4xl font-bold text-center'>{detail?.title}</h1>
                <p className='text-center'>{detail?.description}</p>

                <div className='mt-5'>
                    <h2 className='text-2xl font-bold text-center pb-3'>Ingredients:</h2>
                    <ul>
                        {detail?.ingredients?.map((ingredient, index) => (
                            <li key={index}>• {ingredient}</li>
                        ))}
                    </ul>
                </div>

                
                <div className='mt-5'>
                    <h2 className='text-2xl font-bold text-center pb-3'>Preparation Steps:</h2>
                    <ol>
                        {detail?.preparation?.map((prep, index) => (
                            <li key={index}>{index + 1}. {prep}</li>
                        ))}
                    </ol>
                </div>



                <div className='mt-5'>
                    <h2 className='text-2xl font-bold text-center pb-3'>Tags:</h2>
                    <ul className='flex gap-4'>
                        {detail?.tags?.map((tag, index) => (
                            <li key={index}>{tag}</li>
                        ))}
                    </ul>
                </div>

                <div className='mt-5 text-center'>
                    <h2 className='text-2xl font-bold pb-3'>Last Updated Date:</h2>
                            <p>{new Date(detail?.lastUpdated).toLocaleDateString()}</p>
                </div>


            </div>

        </div>
    </>
  )
}

export default RecipeDetail