import { useEffect, useState } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

import { login } from "../../services/login";

const TelaLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const isLoggedIn = localStorage.getItem("token") !== null;
  if (isLoggedIn) {
    return <Navigate to={"/home"} />;
  }

  const efetuarLogin = () => {
    if (email !== "" && senha !== "") {
      login(email, senha)
        .then(({ token }) => {
          localStorage.setItem("token", token);
          navigate("/home");
        })
        .catch(error => {
          toast({
            title: error.response.data.message,
            status: "error",
            duration: 4000
          });
        });
    }
  };

  return (
    <Flex
      maxW="100vw"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"full"}
        py={12}
        px={6}
        align={"center"}
        justify={"center"}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Entre na sua conta</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w="lg"
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel fontSize="20">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontSize="20">Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={event => setSenha(event.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    size="sm"
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Lembrar</Checkbox>
                <Link color={"blue.400"}>Esqueceu a senha?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                h="14"
                fontSize="20"
                onClick={() => efetuarLogin()}
              >
                Entrar
              </Button>
              <Stack pt={6}>
                <Text align={"center"}>
                  Não possui uma conta?{" "}
                  <Link href="/cadastro" color={"blue.400"}>
                    Cadastrar
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default TelaLogin;
