import React, { useState } from "react";
import Header from "../Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import ClassroomImage from "/src/assets/Classroom.svg";
import Plant2 from "/src/assets/Plant2.svg";
import Plant from "/src/assets/Plant.svg";
import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react";
import LiveClassSection from "./LiveClassSection.jsx";
import MentorSection from "./MentorSection.jsx";
import Contact from "../Contact/Contact.jsx";
import Footer from "../../Footer/Footer.jsx";

const Landing = () => {
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/Search/${subject}`);
  };

  const [LClass, setLClass] = useState(false);
  const [EMentor, setEMentor] = useState(false);

  const handeleLClass = () => {
    setLClass(true);
    setEMentor(false);
  };

  const handleEMentor = () => {
    setLClass(false);
    setEMentor(true);
  };
  return (
    <>
      <Header />
      {/* top */}
      <div className="h-[70vh] flex gap-10 mt-10vh bg-slate-600">
        <div className="p-[25px] w-[50%] pt-28">
          <h1 className="text-6xl text-left text-white font-serif p-8 pt-1">
            Discover, Learn, Succeed! <br />
            Unlock endless possibilities with{" "}
            <span className="font-semibold text-amber-400 font-serif text-5xl">
              Academix
            </span>
          </h1>
          <div className="flex items-center bg-white h-14 w-3/5 mt-10 ml-10 rounded-md ">
            <img
              src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5"
              className="w-10 bg-white h-5 my-2 mx-2"
              alt=""
            />
            <input
              type="text"
              className="flex-grow h-10 mx-4 my-1"
              placeholder="Ex: Physics ..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <button
              className="w-[85px] bg-blue-800 mx-4 rounded-xl text-white font-bold"
              onClick={handleSearch}
            >
              Find Teacher
            </button>
          </div>
        </div>
        <div className="p-25">
          <img src={ClassroomImage} width={500} className="pt-28" alt="" />
        </div>
      </div>

      {/* Features */}
      <div className="bg-slate-900">
        <div class="w-full h-auto flex flex-wrap flex-col items-center">
          <p class="text-indigo-800 font-bold text-3xl md:text-4xl text-center mt-4">
            "Pure Hardwork, No Shortcuts!"
          </p>
          <div class="w-36 h-1 border-b-4 border-yellow-400 mt-2 rounded-2xl md:mt-4 mb-12"></div>
        </div>
        <div className="card">
          <div>
            <Flex
              w="full"
              alignItems="center"
              justifyContent="space-around"
              p={5}
              pt={6}
            >
              {/* Expert Mentor Box */}
              <Box
                w="xs"
                h="xm"
                bg="blue.200"
                _dark={{
                  bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                mx="auto"
                onClick={handleEMentor}
                cursor={"pointer"}
              >
                <Box pt={4}>
                  <Image
                    w="50%"
                    h={20}
                    fit="cover"
                    mx="auto"
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/622a85ea75414daadf6055613c074c5280b95444"
                    alt="avatar"
                  />
                </Box>
                <Box py={5} textAlign="center">
                  <Link
                    display="block"
                    fontSize="2xl"
                    color="gray.800"
                    fontWeight="bold"
                    mb={2}
                  >
                    Expert Mentor
                  </Link>
                  <chakra.span
                    fontSize="sm"
                    color="gray.700"
                    px={4}
                    display="block"
                  >
                    Our expert mentors are the cornerstone of our educational
                    approach. With a wealth of knowledge, they support our
                    students on their journey to success.
                  </chakra.span>
                </Box>
              </Box>

              {/* High Quality Live Class Box */}
              <Box
                w="xs"
                h="xm"
                bg="blue.200"
                _dark={{
                  bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                mx="auto"
                onClick={handeleLClass}
                cursor={"pointer"}
              >
                <Box pt={4}>
                  <Image
                    w="50%"
                    h={20}
                    fit="cover"
                    mx="auto"
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/1478ee1b2a35123ded761b65c3ed2ceaece0d20f"
                    alt="avatar"
                  />
                </Box>
                <Box py={5} textAlign="center">
                  <Link
                    display="block"
                    fontSize="2xl"
                    color="gray.800"
                    fontWeight="bold"
                    mb={2}
                  >
                    High Quality Live Class
                  </Link>
                  <chakra.span
                    fontSize="sm"
                    color="gray.700"
                    px={4}
                    pt={5}
                    display="block"
                  >
                    We deliver high-quality live classes to our students,
                    providing interactive learning experiences led by
                    experienced instructors.
                  </chakra.span>
                </Box>
              </Box>

              {/* 24/7 Live Support Box */}
              <Box
                w="xs"
                h="xm"
                bg="blue.200"
                _dark={{
                  bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                mx="auto"
                onClick={() => {
                  navigate("/contact");
                }}
                cursor={"pointer"}
              >
                <Box pt={4}>
                  <Image
                    w="50%"
                    h={20}
                    fit="cover"
                    mx="auto"
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/c412120e39b2095486c76978d4cd0bea88fd883b"
                    alt="avatar"
                  />
                </Box>
                <Box py={5} textAlign="center">
                  <Link
                    display="block"
                    fontSize="2xl"
                    color="gray.800"
                    fontWeight="bold"
                    mb={2}
                  >
                    24/7 Live Support
                  </Link>
                  <chakra.span
                    fontSize="sm"
                    color="gray.700"
                    px={4}
                    display="block"
                  >
                    We offer our students 24/7 live support. Whether it's a
                    question or a challenge at midnight, our dedicated team is
                    here to provide guidance and assistance.
                  </chakra.span>
                </Box>
              </Box>
            </Flex>
          </div>
          make the size of the card equal for all three and also some padding
          from top
        </div>
        {LClass && <LiveClassSection />}
        {EMentor && <MentorSection />}
      </div>

      {/* Courses */}

      <div className="bg-slate-600">
        <div class="w-full h-auto flex flex-wrap flex-col items-center">
          <p class="text-black font-semibold text-3xl md:text-4xl text-center mt-4">
            Find Your Subject
          </p>
          <div class="w-36 h-1 border-b-4 border-white-400 mt-2 rounded-2xl md:mt-4 mb-12"></div>
        </div>

        <div className="card">
          <div>
            <Flex
              bg="#475569"
              _dark={{
                bg: "#3e3e3e",
              }}
              p={50}
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                w="2xs" // Decreased box width
                bg="#1e293b"
                _dark={{
                  bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                mx="auto"
              >
                <div className="flex justify-center">
                  <Image
                    w="3xs" // Smaller image width
                    h={36} // Smaller image height
                    fit="contain"
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2"
                    alt="avatar"
                  />
                </div>
                <Box py={3} textAlign="center">
                  <Link
                    display="block"
                    fontSize="lg" // Reduced font size
                    color="white"
                    _dark={{
                      color: "white",
                    }}
                    fontWeight="bold"
                  >
                    Physics
                  </Link>
                </Box>
              </Box>
              <Box
                w="2xs" // Decreased box width
                bg="#1e293b"
                _dark={{
                  bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                mx="auto"
              >
                <div className="flex justify-center">
                  <Image
                    w="3xs" // Smaller image width
                    h={36} // Smaller image height
                    fit="contain"
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95"
                    alt="avatar"
                  />
                </div>
                <Box py={3} textAlign="center">
                  <Link
                    display="block"
                    fontSize="lg" // Reduced font size
                    color="white"
                    _dark={{
                      color: "white",
                    }}
                    fontWeight="bold"
                  >
                    Chemistry
                  </Link>
                </Box>
              </Box>
              <Box
                w="2xs" // Decreased box width
                bg="#1e293b"
                _dark={{
                  bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                mx="auto"
              >
                <div className="flex justify-center">
                  <Image
                    w="3xs" // Smaller image width
                    h={36} // Smaller image height
                    fit="contain"
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555"
                    alt="avatar"
                  />
                </div>
                <Box py={3} textAlign="center">
                  <Link
                    display="block"
                    fontSize="lg" // Reduced font size
                    color="white"
                    _dark={{
                      color: "white",
                    }}
                    fontWeight="bold"
                  >
                    Biology
                  </Link>
                </Box>
              </Box>
              <Box
                w="2xs" // Decreased box width
                bg="#1e293b"
                _dark={{
                  bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                mx="auto"
              >
                <div className="flex justify-center">
                  <Image
                    w="3xs" // Smaller image width
                    h={36} // Smaller image height
                    fit="contain"
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664"
                    alt="avatar"
                  />
                </div>
                <Box py={3} textAlign="center">
                  <Link
                    display="block"
                    fontSize="lg" // Reduced font size
                    color="white"
                    _dark={{
                      color: "white",
                    }}
                    fontWeight="bold"
                  >
                    Math
                  </Link>
                </Box>
              </Box>
              <Box
                w="2xs" // Decreased box width
                bg="#1e293b"
                _dark={{
                  bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                mx="auto"
              >
                <div className="flex justify-center">
                  <Image
                    w="3xs" // Smaller image width
                    h={36} // Smaller image height
                    fit="contain"
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272"
                    alt="avatar"
                  />
                </div>
                <Box py={3} textAlign="center">
                  <Link
                    display="block"
                    fontSize="lg" // Reduced font size
                    color="white"
                    _dark={{
                      color: "white",
                    }}
                    fontWeight="bold"
                  >
                    Computer
                  </Link>
                </Box>
              </Box>
            </Flex>
            ;
          </div>
        </div>
      </div>

      {/* About Us */}
      <div className="bg-slate-900 pr-2 ">
        <div class="w-full h-auto flex flex-wrap flex-col items-center">
          <p class="text-white font-sans text-3xl md:text-4xl text-center mt-4">
            About Us
          </p>
          <div class="w-36 h-1 border-b-4 border-white-400 mt-2 rounded-2xl md:mt-4 mb-12"></div>
        </div>
        <div className="pr-2 flex items-center justify-center gap-20">
          <div className="left-svg">
            <img src={Plant2} width={300} alt="" className="p-6" />
          </div>
          <p className="text-white p-[50px] font-sans">
            Welcome to Academix, your comprehensive online learning destination!
            At Academix, we believe in making high-quality education accessible
            to everyone, everywhere. Our platform is designed for students,
            professionals, and lifelong learners who want to expand their
            knowledge and skills in various subjects at their own pace.
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2 font-semibold">
              Our Mission
            </h1>
            Our mission at Academix is to empower individuals by providing
            top-tier learning resources, interactive courses, and expert
            guidance in a range of fields. We strive to bridge the gap between
            traditional education and modern technology, making learning
            accessible, engaging, and effective.
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2 font-semibold">
              Our Vision
            </h1>
            We envision a world where anyone can access the knowledge and skills
            they need to thrive. Through Academix, we aim to build a global
            learning community that supports and motivates each other on the
            journey to success.
          </p>
          <div className="right-svg">
            <img src={Plant} width={400} alt="" className="px-6"/>
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <div className="contact-us">
        <Contact/>
      </div>

      {/* Footer */}
      <div className="footer">
        <Footer/>
      </div>
    </>
  );
};

export default Landing;
