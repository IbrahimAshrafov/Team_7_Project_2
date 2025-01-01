import { useContext } from 'react'
import './Card.css'
import Swal from 'sweetalert2';
import { RenderContext } from '../../App';
import { Link } from 'react-router';



function Card(props) {



    const { rerender, setRerender } = useContext(RenderContext);



    const deleteHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3001/recipes/${props.id}`, { method: 'DELETE' })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    setRerender(rerender + 1);
                  })
                  .catch((error) => console.log(error));
            }
        });
    };



  return (
    <div
    className="card bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)] rounded-lg font-[sans-serif] overflow-hidden"
  >
    <div className="p-6">
      <h3 className="text-lg font-semibold">{props.title}</h3>
      <p className="my-4 text-sm text-gray-500 leading-relaxed">{props.description}</p>
      <Link to={`/recipes/${props.id}`}
        className="mt-4 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-500 hover:bg-blue-700"
      >
        View
      </Link>
      <div className='flex justify-between mt-5'>
        <div className="flex gap-2 controls ">
            <Link to={`/recipes/edit/${props.id}`} className='text-white bg-green-500 hover:bg-green-700 px-2 py-1 rounded-lg'>Edit</Link>
            <button onClick={deleteHandler} className='text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded-lg'>Delete</button>
        </div>
        <p className='text-sm bg-blue-400 px-2 py-1 rounded text-white'>{props.difficulty}</p>
      </div>
    </div>
  </div>
  )
}

export default Card