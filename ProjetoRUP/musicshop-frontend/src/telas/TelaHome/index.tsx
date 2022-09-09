import { useEffect, useState } from "react";

import {
  Box,
  Input,
  Stack,
  Heading,
  Container,
  SimpleGrid,
  InputGroup,
  Flex,
  Spinner,
  IconButton,
  InputRightElement,
  Button,
  HStack
} from "@chakra-ui/react";
import {
  RiLogoutBoxLine,
  RiSearchLine,
  RiShoppingBag3Line,
  RiShoppingCart2Line
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import CardProduto from "../../components/Estoque/CardProduto";
import { Item } from "../../modelos/Item";
import { getEstoque } from "../../services/estoque";

const TelaHome: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [estoque, setEstoque] = useState<Item[] | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getEstoque().then(itens => {
      setEstoque(itens);
      setLoading(false);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const pesquisarProduto = () => {
    getEstoque(search).then(itens => {
      setEstoque(itens);
      setLoading(false);
    });
  };

  const pedidos = () => {
    navigate("/pedidos");
  };

  return (
    <>
      {loading ? (
        <Flex w="100vw" h="100vh" align="center" justify="center">
          <Spinner color="blue.400" size="lg" />
        </Flex>
      ) : (
        <Box p={4} bgColor="gray.100" h="100vh">
          <Flex justifyContent="flex-end">
            <HStack position="absolute" top="4" right="4">
              <IconButton
                aria-label="pedidos"
                icon={<RiShoppingBag3Line />}
                onClick={() => pedidos()}
                bg="transparent"
                fontSize={24}
              />
              <IconButton
                aria-label="cart"
                icon={<RiShoppingCart2Line />}
                onClick={() => navigate("/carrinho")}
                bg="transparent"
                fontSize={24}
              />
              <IconButton
                aria-label="logout"
                icon={<RiLogoutBoxLine />}
                onClick={() => logout()}
                bg="transparent"
                fontSize={24}
              />
            </HStack>
          </Flex>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={"3xl"}>MusicShop</Heading>
            <InputGroup>
              <Input
                type="text"
                placeholder="Qual instrumento você está procurando?"
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
              <InputRightElement h={"full"}>
                <Button
                  size="sm"
                  variant={"ghost"}
                  onClick={() => pesquisarProduto()}
                >
                  <RiSearchLine />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Container maxW={"6xl"} mt={10}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {estoque?.map((item, index) => (
                <CardProduto produto={item.produto} key={index} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default TelaHome;
