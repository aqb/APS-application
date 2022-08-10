import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem
} from "@chakra-ui/react";
import { RiShoppingCart2Line } from "react-icons/ri";

const produto = {
  nome: "Guitarra",
  valor: 1000,
  id: "0",
  descricao: "Guitarra elétrica.",
  imagem:
    "https://images.unsplash.com/photo-1613423085580-d1b9e13e27b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
};

export default function TelaProduto() {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
        h="full"
        w="full"
      >
        <Stack spacing={{ base: 6, md: 10 }} justify="space-between">
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {produto.nome}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {produto.valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL"
              })}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"2xl"}
              fontWeight={"300"}
            >
              {produto.descricao}
            </Text>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg"
            }}
            leftIcon={<RiShoppingCart2Line />}
          >
            Adicionar ao Carrinho
          </Button>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={produto.imagem}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
