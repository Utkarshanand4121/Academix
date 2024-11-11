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
import { useNavigate } from "react-router-dom";
import HR from "/src/assets/HR.svg";
import { toast, ToastContainer } from "react-toastify";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast("Invalid email format");
    }

    if (!password.trim()) {
      toast("Password is required");
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/${userType}/login `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (responseData.message != "Logged in") {
        toast(responseData.message);
      }

      const userId = responseData.data.user._id;
      if (response.ok) {
        console.log("Login Successful");
        toast("Logged Successfull");
        if (responseData.data.user.isApproved === "pending") {
          if (
            responseData.data.user.studentDetails ||
            responseData.data.user.teacherDetails
          ) {
            navigate("/pending");
          } else {
            if (userType === "student") {
              navigate(`/studentDocument/${userId}`);
            } else if (userType === "teacher") {
              navigate(`/teacherDocument/${userId}`);
            }
          }
        } else if (responseData.data.user.isApproved === "approved") {
          if (userType === "student") {
            navigate(`/student/Dashboard/${userId}/search`);
          } else if (userType === "teacher") {
            navigate(`/teacher/Dashboard/${userId}/Home`);
          }
        } else if (responseData.data.user.isApproved === "reupload") {
          if (userType === "student") {
            navigate(`/rejected/student/${userId}`);
          } else if (userType === "teacher") {
            navigate(`/rejected/teacher/${userId}`);
          }
        } else {
          toast("You are not allowed");
        }
      } else if (response.status === 401) {
        toast("Incorrect Password");
      } else if (response.status === 400) {
        toast("User does not exist");
      } else if (response.status === 403) {
        toast("Login failed");
      } else if (response.status === 422) {
        toast("Email is incorrect");
      } else {
        toast("Something went wrong while login");
      }
    } catch (error) {
      toast(error.message);
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
            <img src={HR} width={700} alt="" />
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
                  <chakra.p fontSize={"2xl"}>Login</chakra.p>
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
                  <Flex mt={4}>
                    {" "}
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
                    <span>Don't have an account? </span>
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-green-400"
                    >
                      Signup
                    </button>
                  </div>
                  <br />
                  <Button
                    colorScheme="normal"
                    w="full"
                    type="submit"
                    py={4}
                    fontSize="lg"
                    bg="blue.600"
                    mt={4}
                  >
                    Login
                  </Button>
                </SimpleGrid>
              </Box>
            </GridItem>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default login;
