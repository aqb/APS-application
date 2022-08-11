import { useEffect, useState } from "react";

import {
  Box,
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
  List,
  ListItem,
  Spinner
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Produto } from "../../modelos/Produto";
import { getProduto } from "../../services/produto";

const TelaProduto: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [produto, setProduto] = useState<Produto | null>(null);
  const { produtoId } = useParams();
  useEffect(() => {
    getProduto(produtoId || "").then(({ produto }) => {
      setProduto(produto);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Flex w="screen" h="screen" align="center" justify="center">
          <Spinner color="blue.400" size="lg" />
        </Flex>
      ) : (
        <Flex
          minH={"100vh"}
          w="100vw"
          align={"center"}
          justify={"center"}
          bg="gray.50"
        >
          <Container bg="gray.50" maxW="3xl" p={8}>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={
                "https://a-static.mlcdn.com.br/1500x1500/violao-eletrico-aco-profissional-strinberg-sa200c-sunbusrt/playaudio/12439/233d97ff56d58a9e0f78d2f0667ede1d.jpg"
              }
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {produto?.nome}
              </Heading>
              <Text color="gray.900" fontWeight={300} fontSize={"2xl"}>
                {produto?.valor.toLocaleString("pt-br", {
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
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  {produto?.descricao}
                </Text>
                <Text fontSize={"lg"}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                  maxime modi nam officiis porro, quae, quisquam quos
                  reprehenderit velit? Natus, totam.
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Características
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Lorem</ListItem>
                    <ListItem>ipsum</ListItem>
                    <ListItem>dolor</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>sit</ListItem>
                    <ListItem>amet</ListItem>
                    <ListItem>music</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Button
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                h="14"
                fontSize="20"
                textTransform={"uppercase"}
              >
                Adicionar ao carrinho
              </Button>
            </Stack>
          </Container>
        </Flex>
      )}
    </>
  );
};

export default TelaProduto;
