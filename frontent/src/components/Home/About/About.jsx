import React from "react";
import Plant2 from "/src/assets/Plant2.svg";
import Plant from "/src/assets/Plant.svg";
import Header from "../Header/Header";
import Footer from "../../Footer/Footer";

const About = () => {
  return (
    <div className="about">
      <Header />
      <div className="bg-slate-900 pr-2 ">
        <div class="w-full h-auto flex flex-wrap flex-col items-center">
          <p class="text-white font-sans text-3xl md:text-4xl text-center mt-4">
            About Us
          </p>
          <div class="w-36 h-1 border-b-4 border-white-400 mt-2 rounded-2xl md:mt-4 mb-12"></div>
        </div>
        <div className="pr-2 flex items-center justify-center gap-20">
          <div className="left-svg">
            <img src={Plant2} width={300} alt="" className="p-4" />
          </div>
          <p className="text-white p-[50px] font-sans">
            Welcome to Academix, your comprehensive online learning destination!
            At Academix, we believe in making high-quality education accessible
            to everyone, everywhere. Our platform is designed for students,
            professionals, and lifelong learners who want to expand their
            knowledge and skills in various subjects at their own pace.
            <br />
            <br />
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2 font-semibold">
              Our Mission
            </h1>
            <br />
            Our mission at Academix is to empower individuals by providing
            top-tier learning resources, interactive courses, and expert
            guidance in a range of fields. We strive to bridge the gap between
            traditional education and modern technology, making learning
            accessible, engaging, and effective.
            <br /><br />
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2 font-semibold">
              Our Vision
            </h1>
            <br />
            We envision a world where anyone can access the knowledge and skills
            they need to thrive. Through Academix, we aim to build a global
            learning community that supports and motivates each other on the
            journey to success.
          </p>
          <div className="right-svg">
            <img src={Plant} width={400} alt="" className="px-4" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
