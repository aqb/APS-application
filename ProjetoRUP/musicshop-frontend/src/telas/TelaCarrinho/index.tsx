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
import { criarPedido, finalizarPedido } from "../../services/pedido";

const TelaCarrinho: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState<Carrinho | null>(null);
  const navigate = useNavigate();

  const [numeroCartao, setNumeroCartao] = useState("");
  const [cvvCartao, setCvvCartao] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [nomeTitular, setNomeTitular] = useState("");
  const [cpfTitular, setCpfTitular] = useState("");
  const bandeira = () => {
    return numeroCartao[0] === "0" ? "beeceptor" : "mastercard";
  };

  const toast = useToast();

  const validaArgumentosPedido = () => {
    if (numeroCartao && cvvCartao && vencimento && nomeTitular && cpfTitular) {
      return true;
    }
    return false;
  };

  const valorTotal = () => {
    return (
      carrinho?.itens.reduce(
        (prev, curr) => prev + curr.produto.valor * curr.quantidade,
        0
      ) || 0
    );
  };

  const getInfoPagamentCartao = (): InfoPagamentoCartao => {
    return {
      numeroCartao,
      cvvCartao,
      vencimento: new Date(vencimento),
      nomeTitular,
      cpfTitular,
      bandeira: bandeira(),
      valorPagamento: valorTotal()
    };
  };

  const realizarPedido = async () => {
    if (validaArgumentosPedido()) {
      try {
        const pedido = await criarPedido();
        const infoPagamento = getInfoPagamentCartao();
        await finalizarPedido(pedido.id, infoPagamento, "cartao");
        toast({
          title: "Pedido realizado com sucesso!",
          description: "Obrigado por comprar com o MusicShop.",
          status: "success",
          duration: 4000,
          isClosable: true
        });
        navigate(`/pedido/${pedido.id}`);
      } catch (error: any) {
        toast({
          title: "Erro ao finalizar pedido.",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true
        });
      }
    } else {
      toast({
        title: "Erro ao finalizar pedido.",
        description: "Preencha todos os campos.",
        status: "error",
        duration: 4000,
        isClosable: true
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
                {valorTotal().toLocaleString("pt-br", {
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
                          <FormLabel>Nome Impresso no Cartão</FormLabel>
                          <Input
                            type="text"
                            value={nomeTitular}
                            onChange={e => setNomeTitular(e.target.value)}
                            placeholder="Nome"
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Número do Cartão</FormLabel>
                          <Input
                            type="text"
                            value={numeroCartao}
                            onChange={e => setNumeroCartao(e.target.value)}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                          />
                        </FormControl>
                        <SimpleGrid columns={2} spacing="2">
                          <FormControl isRequired>
                            <FormLabel>CVV</FormLabel>
                            <Input
                              type="text"
                              value={cvvCartao}
                              onChange={e => setCvvCartao(e.target.value)}
                              placeholder="CVV"
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Data de Vencimento</FormLabel>
                            <Input
                              type="Date"
                              value={vencimento}
                              onChange={e => setVencimento(e.target.value)}
                              placeholder="MM/AA"
                            />
                          </FormControl>
                        </SimpleGrid>
                        <FormControl isRequired>
                          <FormLabel>CPF</FormLabel>
                          <Input
                            type="text"
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
                            onClick={() => realizarPedido()}
                          >
                            Finalizar Pedido
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
