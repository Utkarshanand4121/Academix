import React, { useState } from "react";
import {
  chakra,
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  VisuallyHidden,
  Input,
  GridItem,
} from "@chakra-ui/react";
import Header from "../Home/Header/Header";
import RadioBtn from "../RadioBtn/RadioBtn";
import Images from "/src/assets/Grammar-correction.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!username.trim()) {
      newErrors.Username = "Username is required";
      toast("Username is required");
    }

    if (!email.trim()) {
      newErrors.Email = "Email is required";
      toast("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.Email = "Invalid email format";
      toast("Invalid email format");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.Password = "Invalid password";
      toast("Invalid Password");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // sending data to the backend
    const data = {
      username: username,
      password: password,
      email: email,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/v1/${userType}/signup `, {
        method: "POST",
        // mode: "cors",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast("Signup Successfull");
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else if(response.status === 400) {
        setErrors(responseData.errors || {});
      } else {
        toast("Signup error");
        console.error("Signup failed with status code: ", response.status);
      }
    } catch (error) {
      setErrors(error.message);
    }
  };
  return (
    <div>
      <Header />
      <div className="bg-slate-600">
        <div class="w-full h-auto flex flex-wrap flex-col items-center">
          <p class="text-white font-sans text-3xl md:text-4xl text-center mt-4 h-11"></p>
          <div class="w-36 h-1 mt-2 rounded-2xl md:mt-4 mb-12"></div>
        </div>
        <div className="flex gap-10 mt-10 h-[71vh]">
          <div className="p-[15px] w-1/2 pl-10 mb-14 -mt-12">
            <img src={Images} width={700} alt="" />
          </div>
          <div>
            <GridItem
              colSpan={{
                base: "auto",
                md: 4,
              }}
              pl={16}
            >
              <Box
                as="form"
                mb={6}
                rounded="lg"
                shadow="xl"
                p={16}
                bg={"#042439"}
                onSubmit={handleSubmit}
              >
                <Center
                  pb={0}
                  color="white"
                  _dark={{
                    color: "gray.600",
                  }}
                >
                  <chakra.p fontSize={"2xl"}>SignUp</chakra.p>
                </Center>
                <SimpleGrid
                  columns={1}
                  px={8}
                  py={6}
                  spacing={8} // Increased spacing between fields
                  borderBottom="solid 1px"
                  color="white"
                  _dark={{
                    color: "gray.700",
                  }}
                >
                  <Flex>
                    <VisuallyHidden>Username</VisuallyHidden>
                    <Input
                      mt={0}
                      type="text"
                      placeholder="Username"
                      fontSize="lg"
                      p={6}
                      align="start" // Aligns text to the start
                      color={"white"}
                      border="1px solid" // Add border
                      borderColor="white" // Set border color for light mode
                      _dark={{
                        borderColor: "gray.700", // Set border color for dark mode
                      }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Flex>
                  <Flex mt={4}>
                    {" "}
                    {/* Adds space between First Name and Email Address */}
                    <VisuallyHidden>Email Address</VisuallyHidden>
                    <Input
                      mt={0}
                      type="email"
                      placeholder="Email Address"
                      fontSize="lg"
                      p={6}
                      align="start" // Aligns text to the start
                      border="1px solid" // Add border
                      borderColor="white" // Set border color for light mode
                      _dark={{
                        borderColor: "gray.700", // Set border color for dark mode
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Flex>
                  <Flex mt={4}>
                    {" "}
                    {/* Adds space between First Name and Email Address */}
                    <VisuallyHidden>Password</VisuallyHidden>
                    <Input
                      mt={0}
                      type="password"
                      placeholder="Password"
                      fontSize="lg"
                      p={6}
                      align="start" // Aligns text to the start
                      border="1px solid" // Add border
                      borderColor="white" // Set border color for light mode
                      _dark={{
                        borderColor: "gray.700", // Set border color for dark mode
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Flex>
                  <div className="m-5 ml-10 ">
                    <RadioBtn userType={userType} setUserType={setUserType} />
                  </div>
                  <div className="signupage">
                    <span>Already have an account? </span>
                    <button
                      onClick={() => navigate("/login")}
                      className="text-green-400"
                    >
                      Login
                    </button>
                  </div>
                  <Button
                    colorScheme="normal"
                    w="full"
                    type="submit"
                    py={4}
                    fontSize="lg"
                    bg="blue.600"
                    mt={4}
                  >
                    SignUp
                  </Button>
                </SimpleGrid>
              </Box>
            </GridItem>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;
