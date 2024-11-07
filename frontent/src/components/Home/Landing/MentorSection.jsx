import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";

const MentorSection = () => {
  return (
    <div className="flex items-center justify-center mt-7 gap-5">
      <div className="bg-[#0E3A59] m-2 p-5 rounded-3xl overflow-hidden flex flex-col items-center justify-center">
        <img
          className=" rounded-full"
          src="https://media.istockphoto.com/id/1310210662/photo/portrait-of-indian-woman-as-a-teacher-in-sari-standing-isolated-over-white-background-stock.jpg?s=612x612&w=0&k=20&c=EMI42nCFpak1c4JSFvwfN0Qllyxt19dlihYEXAdnCXY="
          alt=""
          width={200}
        />

        <div className="flex items-center justify-start  gap-2">
          <CgProfile />
          <p className="text-white">Prof. Dina Sharma</p>
        </div>
        <div className="flex items-center gap-2">
          <FaSchool />
          <p className="text-white">Galaxy University</p>
        </div>
        <div className="flex items-center gap-2">
          <IoSchoolSharp />
          <p className="text-white">Ph.D. in Astrophysics</p>
        </div>
      </div>
      <div className="bg-[#0E3A59] m-2 p-5 rounded-3xl overflow-hidden flex flex-col items-center justify-center">
        <img
          className=" rounded-full"
          src="https://media.istockphoto.com/id/1324558913/photo/confident-young-man-in-casual-green-shirt-looking-away-standing-with-crossed-arms-isolated-on.jpg?s=612x612&w=0&k=20&c=NOrKRrUuxvePKijL9sFBHlDwHESv7Van68-hoS-_4hQ="
          alt=""
          width={200}
        />

        <div className="flex items-center justify-start gap-2">
          <CgProfile />
          <p className="text-white">Dr. Anand Mishra</p>
        </div>
        <div className="flex items-center gap-2">
          <FaSchool />
          <p className="text-white">Maharishi University</p>
        </div>
        <div className="flex items-center gap-2">
          <IoSchoolSharp />
          <p className="text-white">Ph.D. in Quantum Physics</p>
        </div>
      </div>
      <div className="bg-[#0E3A59] m-2 p-5 rounded-3xl overflow-hidden flex flex-col items-center justify-center">
        <img
          className=" rounded-full"
          src="https://media.istockphoto.com/id/1663458254/photo/portrait-of-beautiful-indian-woman-in-sari.jpg?s=612x612&w=0&k=20&c=raeTJOEyA4sFX_GwrgboXt9ZxtAZ8RkFuljPJnL9sCU="
          alt=""
          width={200}
        />

        <div className="flex items-center justify-start gap-2">
          <CgProfile />
          <p className="text-white">Prof. Sunita Patel</p>
        </div>
        <div className="flex items-center gap-2">
          <FaSchool />
          <p className="text-white">Ramanujan Institute</p>
        </div>
        <div className="flex items-center gap-2">
          <IoSchoolSharp />
          <p className="text-white">D.Phil. in Number Theory</p>
        </div>
      </div>
    </div>
  );
};

export default MentorSection;
