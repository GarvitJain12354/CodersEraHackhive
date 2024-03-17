// "use client";
// // import { checkUser } from "@/store/Action/Auth";
// // import { clearError, clearMsg } from "@/store/Reducer/AuthReducer";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { toast } from "react-toastify";

// const Nav = () => {
//   //   const [hover, sethover] = useState(false);
//   //   useEffect(() => {
//   //     gsap.registerPlugin(ScrollTrigger);
//   //     gsap.to(".nav", {
//   //       scrollTrigger: {
//   //         trigger: "#page1",
//   //         start: "10% 0%",
//   //         end: "30% 0%",
//   //         scrub: 0.3,
//   //       },
//   //       backgroundColor: "white",
//   //       color: "black",
//   //       onComplete: () => {
//   //         sethover(true);
//   //       },
//   //     });
//   //     gsap.to(".navLine", {
//   //       scrollTrigger: {
//   //         trigger: "#page1",
//   //         start: "10% 0%",
//   //         end: "30% 0%",
//   //         scrub: 0.3,
//   //       },
//   //       backgroundColor: "gray",
//   //     });
//   //   }, [hover]);
// //   const { isAuthenticated,error,message } = useSelector((state) => state.Auth);
// //   const dispatch = useDispatch();
// //   useEffect(() => {
// //     dispatch(checkUser());
// //   }, []);
// // useEffect(() => {
// //   if(error){
// //     toast.error(error);
// //     dispatch(clearError())
// //   }
// //   if(message){
// //     toast.success(message);
// //     dispatch(clearMsg())
// //   }
// // }, [isAuthenticated,error])
//   return (
//     <div className="nav  w-full flex flex-col items-center justify-center   bg-transparent fixed top-0  left-0 z-5 text-black transition-all duration-300 cursor-pointer">
//       <div className="w-full flex items-center justify-between py-4 px-10 relative">
//         <div className="flex items-center justify-center gap-2 w-fit">
//           <i className="ri-search-line"></i>
//           <input
//             placeholder="What are you looking for?"
//             className="outline-none border-none w-fit placeholder:text-sm p-2 py-1 bg-transparent placeholder:font-bold"
//           />
//         </div>
//         <img
//           className="h-16 w-10 object-cover"
//           src="/DWEISER_Logo.png"
//           alt=""
//         />
//         <div className="flex items-center justify-center gap-5 text-xl">
//           <Link href={"/account/login"}>
//             <i className="icon ri-mail-line"></i>
//           </Link>
//           <Link href={"/account/login"}>
//             <i className="icon ri-user-line"></i>
//           </Link>
//           <div className="indicator">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//               />
//             </svg>
//             <span className="badge badge-sm indicator-item bg-black text-white border-none">
//               8
//             </span>
//           </div>
//         </div>
//         <div
//         //   style={{ backgroundColor: hover ? "gray" : "white" }}
//           className="navLine w-[90%] h-[1px] absolute bg-[gray] bg-opacity-40 bottom-0 left-1/2 -translate-x-1/2"
//         ></div>
//       </div>
//       <div className="flex w-fit gap-6  p-4" style={{ fontWeight: "500" }}>
//         <Link href={"/"} className="text">Home</Link>
//         <Link href={"/"} className="text">Shop All</Link>
//         <Link  href={"/"} className="text">Men</Link>
//         <Link href={"/"} className="text">Women</Link>
//         <Link href={"/"} className="text">Sale</Link>
//         <Link href={"/"} className="text">Rich Cotton</Link>
//         <Link href={"/"} className="text">Get in Touch!</Link>
//       </div>
//     </div>
//   );
// };

// export default Nav;
"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Nav = () => {
  const [navbarColor, setNavbarColor] = useState("transparent");

    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          if (scrollY > 100) {
            setNavbarColor("white");
          } else {
            setNavbarColor("transparent");
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
  return (
   <div style={{backgroundColor:navbarColor,color:`${navbarColor === "white" ? "black" : "white"}`}} className="w-full transition-all duration-300 fixed top-0 left-1/2 -translate-x-1/2 h-[10vh] flex items-center justify-between z-50 p-5 py-10 text-lg text-white font-normal  font-[poppins]">
  <div className="flex">
    <img src="/logo.jpeg" className='object-contain h-10 w-60 rounded-lg' alt="" />

    </div>  
    <div className=" gap-4 flex items-center">
        <Link className="text" href={"/"}>
            Home
        </Link>
        <Link className="text" href={""}>
           Route Planner
        </Link>
        <Link className="text" href={""}>
            Route Radar
        </Link>
     <Link href={"/login"}>
     <button className="px-5 py-1 border-2 border-black rounded-full">
            SigIn
        </button>
     </Link>
    </div>
   </div>
  )
}

export default Nav