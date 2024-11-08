import React from "react";
import Mail from "/src/assets/Meet-the-team.svg";
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
  Textarea,
} from "@chakra-ui/react";
import Header from "../Home/Header/Header";

const Signup = () => {
  return (
    <div>
      <Header/>
      <div className="bg-slate-600">
        <div class="w-full h-auto flex flex-wrap flex-col items-center">
          <p class="text-white font-sans text-3xl md:text-4xl text-center mt-4">
            Contact Us
          </p>
          <div class="w-36 h-1 border-b-4 border-yellow-400 mt-2 rounded-2xl md:mt-4 mb-12"></div>
        </div>
        <div className="flex gap-10 mt-10 h-[71vh]">
          <div className="p-[15px] w-1/2 pl-10 mb-14 -mt-12">
            <img src={Mail} width={700} alt="" />
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
              >
                <Center
                  pb={0}
                  color="white"
                  _dark={{
                    color: "gray.600",
                  }}
                >
                  <chakra.p fontSize={"2xl"}>Start talking now</chakra.p>
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
                    <VisuallyHidden>First Name</VisuallyHidden>
                    <Input
                      mt={0}
                      type="text"
                      placeholder="First Name"
                      fontSize="lg"
                      p={6}
                      align="start" // Aligns text to the start
                      color={"white"}
                      border="1px solid" // Add border
                      borderColor="white" // Set border color for light mode
                      _dark={{
                        borderColor: "gray.700", // Set border color for dark mode
                      }}
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
                    />
                  </Flex>
                  <Flex mt={4}>
                    {" "}
                    {/* Adds space between Email Address and Message */}
                    <VisuallyHidden>Message</VisuallyHidden>
                    <Textarea
                      mt={0}
                      placeholder="Message"
                      fontSize="lg"
                      p={6} // Adjust padding for the Textarea
                      align="start" // Aligns text to the start
                      height="120px" // Adds height to make it larger
                      resize="none" // Prevents resizing if needed
                      border="1px solid" // Add border
                      borderColor="white" // Set border color for light mode
                      _dark={{
                        borderColor: "gray.700", // Set border color for dark mode
                      }}
                    />
                  </Flex>
                  <Button
                    colorScheme="normal"
                    w="full"
                    type="submit"
                    py={4}
                    fontSize="lg"
                    bg="blue.600"
                    mt={4}
                  >
                    Send A Message
                  </Button>
                </SimpleGrid>
              </Box>
            </GridItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
