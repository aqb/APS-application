import { useState } from "react";

import {
  Flex,
  Box,
  useColorModeValue,
  SimpleGrid,
  Button,
  Text,
  Divider
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaShoppingCart } from "react-icons/fa";

const produtos = [
  {
    nome: "Guitarra",
    valor: "1000",
    id: "0",
    descricao: "Guitarra elétrica"
  },
  {
    nome: "Violão",
    valor: "1500",
    id: "1",
    descricao: "Violão de abeto"
  },
  {
    nome: "Cavaquinho",
    valor: "500",
    id: "2",
    descricao: "Cavaquinho para pagode"
  },
  {
    nome: "Bateria",
    valor: "800",
    id: "3",
    descricao: "Bateria jogo completo"
  },
  {
    nome: "Microfone",
    valor: "300",
    id: "4",
    descricao: "Microfone com cabo"
  },
  {
    nome: "Amplificador",
    valor: "900",
    id: "5",
    descricao: "Amplificador bivolt"
  }
];

export default function TelaCriarPedido() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <SimpleGrid columns={2}>
          <Flex maxHeight="lg" overflow="auto" direction="column">
            {produtos.map((produto, index) => (
              <Flex
                key={index}
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                m="4"
                py="4"
                px="8"
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <Text fontSize="2xl">{produto.nome}</Text>
                <Text>{produto.descricao}</Text>
                <Divider />
                <Text>Valor: R$ {produto.valor}</Text>
              </Flex>
            ))}
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500"
              }}
            >
              Criar pedido
              <Flex ml="2">
                <FaShoppingCart />
              </Flex>
            </Button>
          </Flex>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
