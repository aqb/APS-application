import { useEffect, useState } from "react";

import {
  Flex,
  Button,
  IconButton,
  Text,
  Divider,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Spacer,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useToast
} from "@chakra-ui/react";
import {
  RiShoppingCart2Line,
  RiLogoutBoxLine,
  RiHome4Line
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { Carrinho } from "../../modelos/Carrinho";
import { InfoPagamentoCartao } from "../../modelos/InfoPagamentoCartao";
import { getCarrinho } from "../../services/carrinho";
import { finalizarPedido } from "../../services/pedido";

const TelaCarrinho: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState<Carrinho | null>(null);
  const navigate = useNavigate();

  const [numeroCartao, setNumeroCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  const [vencimento, setVencimento] = useState(new Date());
  const [nomeTitular, setNomeTitular] = useState("");
  const [cpfTitular, setCpfTitular] = useState("");
  const toast = useToast();
  const bandeira = () => {
    return numeroCartao[0] === "0" ? "beeceptor" : "mastercard";
  };

  const validaPedido = () => {
    console.log("valida pedido");
    if (numeroCartao && cvvCartao && vencimento && nomeTitular && cpfTitular) {
      return true;
    }

    return false;
  };

  const montarPedido = () => {
    const tmpPedido: InfoPagamentoCartao = {
      numeroCartao,
      cvvCartao,
      vencimento,
      nomeTitular,
      cpfTitular,
      bandeira: bandeira()
    };
    return tmpPedido;
  };

  const realizarPagamentoPedido = () => {
    if (validaPedido()) {
      const novoPedido = montarPedido();
      finalizarPedido(novoPedido, "cartao")
        .then(() => {
          toast({
            title: "Pagamento enviado com sucesso",
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

  useEffect(() => {
    getCarrinho().then(carrinho => {
      setCarrinho(carrinho);
      setLoading(false);
    });
  }, []);

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
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
          <IconButton
            aria-label="Login database"
            icon={<RiHome4Line />}
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
                {carrinho?.itens.map((item, index) => (
                  <Flex key={index} direction="column">
                    <Flex bg="white" py="4" px="8" alignItems="center" w="100%">
                      <Flex w="100%" alignItems={"center"}>
                        <Flex direction="column">
                          <Text fontSize="2xl">{item.produto.nome}</Text>
                          <Text>{item.produto.descricao}</Text>
                        </Flex>
                        <Spacer />
                        <Text>
                          {`${item.quantidade}x` +
                            item.produto.valor.toLocaleString("pt-br", {
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
                {carrinho?.itens
                  .reduce(
                    (prev, curr) => prev + curr.produto.valor * curr.quantidade,
                    0
                  )
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
                      <Tab>Cartão</Tab>
                      <Tab isDisabled>Mercado Pago</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <FormControl isRequired>
                          <FormLabel>Nome impresso no cartão</FormLabel>
                          <Input
                            type="String"
                            value={nomeTitular}
                            onChange={e => setNomeTitular(e.target.value)}
                            placeholder="Nome"
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Número do cartão</FormLabel>
                          <Input
                            type="String"
                            value={numeroCartao}
                            onChange={e => setNumeroCartao(e.target.value)}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                          />
                        </FormControl>
                        <SimpleGrid columns={2} spacing="2">
                          <FormControl isRequired>
                            <FormLabel>CVV</FormLabel>
                            <Input
                              type="String"
                              value={cvvCartao}
                              onChange={e => setCvvCartao(e.target.value)}
                              placeholder="CVV"
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Data de validade</FormLabel>
                            <Input
                              type="date-local"
                              value={vencimento?.toString()}
                              onChange={e =>
                                setVencimento(new Date(e.target.value))
                              }
                              placeholder="MM/AA"
                            />
                          </FormControl>
                        </SimpleGrid>
                        <FormControl isRequired>
                          <FormLabel>CPF</FormLabel>
                          <Input
                            type="String"
                            value={cpfTitular}
                            onChange={e => setCpfTitular(e.target.value)}
                            placeholder="123.456.789-10"
                          />
                        </FormControl>
                        <Flex pt="6" justifyContent="center">
                          <Button
                            loadingText="Submitting"
                            size="lg"
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                              bg: "blue.500"
                            }}
                            onClick={() => realizarPagamentoPedido()}
                          >
                            Finalizar pedido
                            <Flex ml="2">
                              <RiShoppingCart2Line />
                            </Flex>
                          </Button>
                        </Flex>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default TelaCarrinho;
