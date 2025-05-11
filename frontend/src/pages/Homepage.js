import {
  Box,
  Container,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Center,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import hifiLogo from "../assets/hifi1.png";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { ChatState } from "../Context/ChatProvider";
import API from "../config/axios";

const Homepage = () => {
  const navigate = useNavigate();
  const { setUser } = ChatState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container
      maxW="xl"
      centerContent
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      pt={{ base: 12, md: 20 }}
      pb={10}
    >
      {/* Logo Section */}
      <Center mb={{ base: 4, md: 6 }}>
        <img src={hifiLogo} alt="Hifi Chat Logo" style={{ width: "250px" }} />
      </Center>

      {/* Login/Signup Tabs */}
      <Box
        bg="white"
        w={{ base: "100%", sm: "90%", md: "400px" }}
        p={6}
        borderRadius="lg"
        boxShadow="2xl"
      >
        <Tabs variant="soft-rounded" colorScheme="purple" isFitted>
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>

          <TabPanels>
            {/* LOGIN TAB */}
            <TabPanel>
              <Login />
              <Flex align="center" my={4}>
                <Divider />
                <Text px={2} color="gray.500" fontSize="sm">
                  OR
                </Text>
                <Divider />
              </Flex>
              <Flex justify="center" mt={4}>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const { credential } = credentialResponse;
                      const { data } = await API.post(
                        "/api/user/google-login",
                        { token: credential }
                      );

                      localStorage.setItem("userInfo", JSON.stringify(data));
                      setUser(data);
                      navigate("/chats");
                    } catch (error) {
                      console.error("Google Login Backend Error:", error);
                    }
                  }}
                  onError={() => {
                    console.log("Google Login Failed");
                  }}
                />
              </Flex>
            </TabPanel>

            {/* SIGNUP TAB */}
            <TabPanel>
              <Flex justify="center" mb={4}>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const { credential } = credentialResponse;
                      const { data } = await API.post(
                        "/api/user/google-login",
                        { token: credential }
                      );

                      localStorage.setItem("userInfo", JSON.stringify(data));
                      setUser(data);
                      navigate("/chats");
                    } catch (error) {
                      console.error("Google Login Backend Error:", error);
                    }
                  }}
                  onError={() => {
                    console.log("Google Login Failed");
                  }}
                />
              </Flex>
              <Flex align="center" my={4}>
                <Divider />
                <Text px={2} color="gray.500" fontSize="sm">
                  OR
                </Text>
                <Divider />
              </Flex>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
