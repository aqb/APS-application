import {
  Box,
  Input,
  Stack,
  Heading,
  Container,
  SimpleGrid,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

import CardProduto from "../../components/CardProduto";

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

export default function TelaHome() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>MusicShop</Heading>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Qual instrumento você está procurando?"
          />
        </InputGroup>
      </Stack>
      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {produtos.map((produto, index) => (
            <CardProduto produto={produto} key={index} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
