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
  IconButton,
  Text,
  useColorModeValue,
  Link
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TelaCadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
      <IconButton
        aria-label="Login database"
        icon={<FaHome />}
        bg="transparent"
        fontSize={24}
        onClick={() => navigate("../home")}
        position="absolute"
        top="4"
        right="4"
      />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Cadastro
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8} w="lg">
          <Stack spacing={4}>
            <FormControl id="cpf" w="full">
              <FormLabel fontSize="20">CPF</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel fontSize="20">Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontSize="20">Senha</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
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
}
