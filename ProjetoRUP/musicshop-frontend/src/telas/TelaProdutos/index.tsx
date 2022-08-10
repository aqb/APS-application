import { Flex, Box, useColorModeValue, Text, Divider } from "@chakra-ui/react";

const produtos = [
  {
    nome: "Guitarra",
    valor: 1000,
    id: "0",
    descricao: "Guitarra elétrica"
  },
  {
    nome: "Violão",
    valor: 1500,
    id: "1",
    descricao: "Violão de abeto"
  },
  {
    nome: "Cavaquinho",
    valor: 500,
    id: "2",
    descricao: "Cavaquinho para pagode"
  },
  {
    nome: "Bateria",
    valor: 800,
    id: "3",
    descricao: "Bateria jogo completo"
  },
  {
    nome: "Microfone",
    valor: 300,
    id: "4",
    descricao: "Microfone com cabo"
  },
  {
    nome: "Amplificador",
    valor: 900,
    id: "5",
    descricao: "Amplificador bivolt"
  }
];

export default function TelaProdutos() {
  return (
    <Flex
      p="8"
      h="full"
      w="full"
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
        <Flex direction="column" alignItems="center">
          <Flex>
            <Text fontSize="2xl" fontWeight="bold">
              Produtos
            </Text>
          </Flex>
          {produtos.map((produto, index) => (
            <Flex
              key={index}
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              m="4"
              py="4"
              px="8"
              alignItems="center"
              direction="column"
            >
              <Text fontSize="2xl">{produto.nome}</Text>
              <Text>{produto.descricao}</Text>
              <Divider />
              <Text>
                Valor:{" "}
                {produto.valor.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL"
                })}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
