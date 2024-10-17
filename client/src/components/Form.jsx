import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Form = () => {
    const [data, setData] = useState({ rollNo: '' });
    const [studentDetails, setStudentDetails] = useState({ name: '', fatherName: '', marks: '', status: false })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const [testData, setTestData] = useState('')
    const [toggle, setToggle] = useState(false)
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")
        const urlApi = `${import.meta.env.VITE_BACKEND_URI}/api/student/result`
        console.log("this is urls",urlApi)
        await axios({
            method: 'post',
            url: urlApi,
            data: data,
            withCredentials: true
        }).then((response) => {
            setStudentDetails(response.data.data)
            localStorage.setItem('studentDetails', JSON.stringify(response.data.data));
            toast.success(response.data.message);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleToggle = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        const savedStudentDetails = localStorage.getItem('studentDetails');
        if (savedStudentDetails) {
            setStudentDetails(JSON.parse(savedStudentDetails)); // Restore from localStorage
        }
    }, [])

    useEffect(() => {
       const handleTest = async() => {
        try {
            await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URI}`,
                withCredentials: true
            }).then((response) => {
                toast.success('SuccessFull Salahudin Keep It Up')
                console.log(response)
                setTestData(response.data)
            })
        } catch (error) {
            console.log(error)
        }
       }
       handleTest()
    }, [])

    return (
        <section class="text-gray-400 bg-gray-900 body-font h-screen">
            <div class="container mx-auto flex flex-col items-center justify-center h-full px-5 py-24">

                {/* Right Form Section */}
                <div class="w-full lg:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col items-center mb-10">
                    <h2 class="text-white text-lg font-medium title-font mb-5">Check For Result</h2>
                    <div className='flex justify-center items-center flex-col gap-6'>
                        {
                            toggle && (
                                <h3>{testData}</h3>
                            )
                        }
                        <button onClick={handleToggle} className={`max-w-40 h-12 bg-red-700 rounded px-5 ${toggle ? 'bg-green-600' : 'bg-red-700'  } `}>Test Me</button>
                    </div>
                    <form onSubmit={handleSubmit} class="relative mb-4 flex flex-col gap-4 w-full">
                        <label for="rollNo" class="leading-7 text-sm text-gray-400">Roll Number</label>
                        <input
                            type="text"
                            id="rollNo"
                            name="rollNo"
                            value={data.rollNo}
                            onChange={handleChange}
                            class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <button type='submit' class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Submit Roll No</button>
                    </form>
                    <p class="text-xs mt-3">Make sure to enter a correct roll number!</p>
                </div>

                {/* Left Section */}
                <div class="lg:w-1/2 w-full flex flex-col items-center">
                    <div class="flex border-2 rounded-lg border-gray-800 p-8 sm:flex-row flex-col items-center justify-center">

                        <div class="grid grid-cols-4 gap-2">
                            <div className='flex flex-col gap-1'>
                                <h2 class="text-white text-lg title-font font-medium mb-3 px-8 border-b-[1px]">Name</h2>
                                <h2 class="text-white text-lg title-font font-medium mb-3 px-8 border-r-[1px]">{studentDetails.name}</h2>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h2 class="text-white text-lg title-font font-medium mb-3 px-8 border-b-[1px]">Father</h2>
                                <h2 class="text-white text-lg title-font font-medium mb-3 px-8 border-r-[1px]">{studentDetails.fatherName}</h2>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h2 class="text-white text-lg title-font font-medium mb-3 px-8 border-b-[1px]">Marks</h2>
                                <h2 class="text-white text-lg title-font font-medium mb-3 px-8 border-r-[1px]">{studentDetails.marks}</h2>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h2 class="text-white text-lg title-font font-medium mb-3 px-8 border-b-[1px]">Status</h2>
                                <h2 class="text-white text-lg title-font font-medium mb-3 px-8 border-r-[1px]">{studentDetails.status ? (<div className='text-green-500'>Passed</div>) : (<div className='text-red-500'>Failed</div>)}</h2>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Form;
