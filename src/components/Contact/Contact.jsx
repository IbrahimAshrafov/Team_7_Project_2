import React from 'react'

function Contact() {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

  const [message, setMessage] = React.useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage("Please fill in all the fields!");
      return;
    }

    try {
        const response = await fetch("http://localhost:3001/messages", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });
      
        if (response.ok) {
          setMessage("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          throw new Error("Failed to send the message!");
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to send the message!");
      }
    };


  return (
    <div className="p-4 mx-auto max-w-xl bg-white font-[sans-serif]">
            <h1 className="text-3xl text-gray-800 font-extrabold text-center">Contact us</h1>
            <form className="mt-8 space-y-4">
                <input required name='name' type='text' placeholder='Name' value={formData.name} onChange={handleChange}
                    className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                <input required name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange}
                    className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                <input required name='subject' type='text' placeholder='Subject' value={formData.subject} onChange={handleChange}
                    className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                <textarea required name='message' placeholder='Message' rows="6" value={formData.message} onChange={handleChange}
                    className="w-full rounded-md px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm pt-3 outline-blue-500"></textarea>
                <button type='button' onClick={handleSubmit}
                    className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full">Send</button>
            </form>


            {message && (
            <p className="mt-4 text-center text-sm text-gray-700">
              {message}
            </p>
          )}
        </div>
  )
}

export default Contact