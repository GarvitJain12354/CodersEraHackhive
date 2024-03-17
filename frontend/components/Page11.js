"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import deliver from "@/public/location.gif";
import styles from "./styles.module.css";
import { gsap } from "gsap";
import arrow from "@/public/arrow.svg";
import { ScrollTrigger } from "gsap/all";
import LocomotiveScroll from "locomotive-scroll";
const Page11 = () => {
  const slider = useRef(null);
  const firstText = useRef(null);
  const secondText = useRef(null);
  let direction = -1;
  let xPercent = 0;
  useEffect(() => {
    const locomotivescroll = new LocomotiveScroll();
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 1,

        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);
  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent });
    gsap.set(secondText.current, { xPercent });

    xPercent += direction * 0.1;
    requestAnimationFrame(animate);
  };
  return (
    <>
      <div
        id={styles.page1}
        className="h-screen w-full bg-red-500 overflow-hidden relative"
        style={{ backgroundColor: "#999d9e" }}
      >
        <img
          src="/boy.png"
          className="h-[70%] w-1/2 object-contain  max-sm:object-cover scale-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          alt=""
        />
        <div
          className="b bg-black w-1/5 h-32 px-6 gap-6 absolute text-white  z-20 rounded-full flex items-center justify-end"
          style={{ transform: "translate(0%,-50%)", left: "-5%", top: "45%" }}
        >
          <h3>
            World <br /> Wide
          </h3>
          <div
            className="h-20 w-20 rounded-full relative "
            style={{ backgroundColor: "#999d9e" }}
          >
            <div className={styles.globe}>
              <div className={styles.globewrap}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circlehor}></div>
                <div className={styles.circlehormiddle}></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col z-30 absolute text-white gap-3 "
          data-scroll
          data-scroll-speed="0.2"
          style={{ right: "5%", top: "35%" }}
        >
          <Image src={arrow} alt="arrow" className="h-8 w-8"></Image>
          <h3 className="text-5xl">
            Plan <br />
             My Route
          </h3>
        </div>
        <div
          ref={slider}
          className="slider z-30  w-screen flex items-end jusitfy-end  whitespace-nowrap absolute  text-white bottom-0 font-normal"
          style={{ fontSize: "15vw", bottom: "-3%" }}
        >
          <h1 ref={firstText}> - Route Crafters</h1>
          <h1 ref={secondText}> - Route Crafters</h1>
        </div>
      </div>
    </>
  );
};

export default Page11;
