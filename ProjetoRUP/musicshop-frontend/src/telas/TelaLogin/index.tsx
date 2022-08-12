import { useState } from "react";

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
  IconButton
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function TelaLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
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
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
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
}
