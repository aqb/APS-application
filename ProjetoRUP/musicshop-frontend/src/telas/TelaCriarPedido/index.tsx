import { useState } from "react";

import {
  Flex,
  Box,
  useColorModeValue,
  SimpleGrid,
  Button,
  IconButton,
  Text,
  Divider,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Spacer
} from "@chakra-ui/react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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

const TelaCriarPedido: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
        left="4"
      />

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

      <Flex
        direction="column"
        w="4xl"
        rounded={"lg"}
        bg="white"
        boxShadow={"lg"}
        p={8}
      >
        <Flex pb="8">
          <Text fontSize="3xl" fontWeight="bold">
            Carrinho
          </Text>
        </Flex>
        <Flex direction="column" alignItems="center">
          <Flex
            maxHeight="lg"
            overflow="auto"
            direction="column"
            justifyContent="start"
            borderWidth="1px"
            w="100%"
            borderRadius={"lg"}
          >
            {produtos.map((produto, index) => (
              <Flex key={index} direction="column">
                <Flex bg="white" py="4" px="8" alignItems="center" w="100%">
                  <Flex w="100%" alignItems={"center"}>
                    <Flex direction="column">
                      <Text fontSize="2xl">{produto.nome}</Text>
                      <Text>{produto.descricao}</Text>
                    </Flex>
                    <Spacer />
                    <Text>
                      {produto.valor.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </Text>
                  </Flex>
                </Flex>
                <Divider />
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex pt="4" pr="4" justifyContent={"end"}>
          <Text fontSize="xl" fontWeight="bold">
            {"Valor total:"}
          </Text>
          <Text fontSize="xl">
            {produtos
              .map(item => item.valor)
              .reduce((prev, curr) => prev + curr, 0)
              .toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL"
              })}
          </Text>
        </Flex>
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Flex
            alignItems="center"
            justifyContent="center"
            direction="column"
            p="6"
            w="md"
          >
            <Text fontSize="xl">Escolha o método de pagamento</Text>
            <Flex
              w="100%"
              pt="10"
              alignItems={"center"}
              justifyContent="center"
            >
              <Tabs>
                <TabList>
                  <Tab>Mercado Pago</Tab>
                  <Tab isDisabled>Cartão</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500"
                      }}
                    >
                      Pagar com Mercado Pago
                      <Flex ml="2">
                        <FaShoppingCart />
                      </Flex>
                    </Button>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TelaCriarPedido;
