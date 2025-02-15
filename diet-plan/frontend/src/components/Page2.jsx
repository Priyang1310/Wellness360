import React from 'react'
import { useNavigate } from 'react-router-dom'

const Page2 = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='h-screen flex justify-center items-center bg-orange-100'>
                <div className='flex bg-red-500 w-full h-[400px] justify-between items-center gap-4'>
                    <div className='flex flex-col justify-evenly items-center bg-yellow-500 w-1/3 h-full'>
                        {/* <h1 className='text-5xl font-bold'>Page 2</h1> */}
                        {/* <button className='px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300'>Try Ai Diet</button> */}
                        <button
                            onClick={() => navigate("/ai-diet-plan")}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                        >
                            Try Ai Diet
                        </button>
                        {/* <p className='text-xl'>This is page 2</p> */}
                    </div>
                    <div className='flex flex-col justify-center items-center bg-blue-500 w-2/3'>
                        <h1 className='text-5xl font-bold'>Page 2</h1>
                        <p className='text-xl'>This is page 2</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page2

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Page2 = () => {
//   const navigate = useNavigate(); // Initialize navigation

//   return (
//     <div className="h-screen flex justify-center items-center bg-orange-100">
//       <div className="flex bg-red-500 w-full h-[400px] justify-between items-center gap-4">
//         <div className="flex flex-col justify-evenly items-center bg-yellow-500 w-1/3 h-full">
//           <button
//             onClick={() => navigate("/ai-diet-plan")}
//             className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
//           >
//             Try Ai Diet
//           </button>
//         </div>
//         <div className="flex flex-col justify-center items-center bg-blue-500 w-2/3">
//           <h1 className="text-5xl font-bold">Page 2</h1>
//           <p className="text-xl">This is page 2</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page2;
