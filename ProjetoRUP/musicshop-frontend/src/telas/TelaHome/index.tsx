import { useEffect, useState } from "react";

import {
  Box,
  Input,
  Stack,
  Heading,
  Container,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Flex,
  Spinner,
  IconButton,
  InputRightElement,
  Button
} from "@chakra-ui/react";
import { RiLogoutBoxLine, RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import CardProduto from "../../components/CardProduto";
import { ItemEstoque } from "../../modelos/Estoque";
import { getEstoque } from "../../services/estoque";

const TelaHome: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [estoque, setEstoque] = useState<ItemEstoque[] | null>(null);
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

  return (
    <>
      {loading ? (
        <Flex w="screen" h="screen" align="center" justify="center">
          <Spinner color="blue.400" size="lg" />
        </Flex>
      ) : (
        <Box p={4}>
          <Flex justifyContent="flex-end">
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
