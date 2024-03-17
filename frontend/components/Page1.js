import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Page1 = () => {
  const [t1, sett1] = useState("Route Crafters");
  const t2 = "Plan My Route";
  const t1Ref = useRef(null);
  useEffect(() => {
    gsap.to("#t1 span", {
      opacity: 1,
      stagger: 0.05,
      y: 0,
    });
  }, []);

  return (
    <div className="w-full gap-4 h-screen flex flex-col items-center relative  justify-center bg-[url('https://images.unsplash.com/photo-1523724581292-f6c3a950b7ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] object-contain" >
      <h1  id="t1" className="text-9xl font-[gilroy] font-bold text-white relative z-40">
        {t1?.split("")?.map((i, index) => (
          <span className="opacity-0 translate-y-20" key={index}>
            {i}
          </span>
        ))}
      </h1>

      <h1 id="t1" className="text-9xl font-[gilroy] font-bold text-white relative z-40">
        {t2?.split("")?.map((i, index) => (
          <span className="opacity-0 translate-y-20" key={index}>{i}</span>
        ))}
      </h1>
<div id="blur" className="w-full h-full "></div>
      {/* <img src="/location.gif" className="absolute right-10 bottom-10" alt="" /> */}
      {/* <img src="/boy.png" className="absolute left-10 bottom-0" alt="" /> */}
    </div>
  );
};

export default Page1;
