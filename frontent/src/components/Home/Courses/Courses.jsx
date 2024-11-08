import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import Header from "../Header/Header";
import Footer from "../../Footer/Footer";

const Courses = () => {
  return (
    <>
      <Header/>
      <div className="bg-slate-600 ">
        <div class="w-full h-auto flex flex-wrap flex-col items-center">
          <p class="text-white font-sans text-3xl md:text-4xl text-center mt-4">
            Find Your Subject
          </p>
          <div class="w-36 h-1 border-b-4 border-white-400 mt-2 rounded-2xl md:mt-4 mb-12"></div>
        </div>
        
        <div className="card">
          <div >
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
          </div>
        </div>
        <div className="h-20 w-full bg-slate-600"></div>
        <Footer/>
      </div>
      
    </>
  );
};

export default Courses;
