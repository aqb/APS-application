import { useState } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useToast
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { cadastro } from "../../services/cadastro";

const TelaCadastro: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCPF] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const efetuarCadastro = () => {
    if (email !== "" && senha !== "" && cpf !== "") {
      cadastro(cpf, email, senha)
        .then(() => {
          toast({
            title: "Cadastro realizado com sucesso!",
            status: "success",
            duration: 4000
          });
          navigate("/login");
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
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
      <Stack spacing={8} mx={"auto"} maxW={"full"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Cadastro
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8} w="lg">
          <Stack spacing={4}>
            <FormControl id="cpf" w="full" isRequired>
              <FormLabel fontSize="20">CPF</FormLabel>
              <Input
                type="text"
                value={cpf}
                onChange={event => setCPF(event.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                h="14"
                onClick={() => efetuarCadastro()}
              >
                Cadastrar
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Já possui uma conta?{" "}
                <Link href="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default TelaCadastro;
