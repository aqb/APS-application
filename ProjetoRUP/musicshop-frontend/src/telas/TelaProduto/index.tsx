import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  List,
  Text,
  Stack,
  Image,
  Button,
  VStack,
  Spinner,
  Heading,
  ListItem,
  Container,
  IconButton,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Input,
  HStack,
  useToast
} from "@chakra-ui/react";
import { FaCartPlus, FaHome } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

import { Produto } from "../../modelos/Produto";
import { adicionarAoCarrinho } from "../../services/carrinho";
import { getProduto } from "../../services/produto";

const TelaProduto: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const navigate = useNavigate();
  const { produtoId } = useParams();
  const toast = useToast();

  useEffect(() => {
    getProduto(produtoId || "").then(({ produto }) => {
      setProduto(produto);
      setLoading(false);
    });
  }, []);
  const imgGenerica =
    "https://i0.wp.com/www.sabra.org.br/site/wp-content/uploads/2020/04/instrumentos-musicais-voce-sabe-quais-sao-os-mais-tocados-no-mundo-20191202180617.jpg.jpg?fit=800%2C600&ssl=1";

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    setQuantidade(Math.max(quantidade - 1, 1));
  };

  const addToCarrinho = () => {
    if (produto) {
      adicionarAoCarrinho(produto.id, quantidade)
        .then(() => {
          toast({
            title: "Produto adicionado ao carrinho",
            status: "success",
            duration: 4000
          });
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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {loading ? (
        <Flex w="screen" h="screen" align="center" justify="center">
          <Spinner color="blue.400" size="lg" />
        </Flex>
      ) : (
        <Flex
          minH={"screen"}
          w="screen"
          align={"center"}
          justify={"center"}
          bg="gray.50"
        >
          <IconButton
            aria-label="logout"
            icon={<RiLogoutBoxLine />}
            onClick={() => logout()}
            bg="transparent"
            fontSize={24}
            position="absolute"
            top="4"
            right="4"
          />
          <IconButton
            aria-label="Login database"
            icon={<FaHome />}
            bg="transparent"
            fontSize={24}
            onClick={() => navigate("../home")}
            position="absolute"
            top="4"
            left="4"
          />
          <Container bg="gray.50" maxW="3xl" p={8}>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={imgGenerica}
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
              <Flex dir="row" alignItems="center" justify="center">
                <HStack maxW="full" h="full" paddingRight="4">
                  <Button
                    onClick={() => diminuirQuantidade()}
                    size="lg"
                    py={"7"}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantidade}
                    onChange={event =>
                      setQuantidade(parseInt(event.target.value))
                    }
                    min={1}
                    size="lg"
                    py={"7"}
                    textAlign="center"
                  />
                  <Button
                    onClick={() => aumentarQuantidade()}
                    size="lg"
                    py={"7"}
                  >
                    +
                  </Button>
                </HStack>
                <Button
                  w={"full"}
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
                  onClick={() => addToCarrinho()}
                  leftIcon={<FaCartPlus />}
                >
                  Adicionar ao carrinho
                </Button>
              </Flex>
            </Stack>
          </Container>
        </Flex>
      )}
    </>
  );
};

export default TelaProduto;
