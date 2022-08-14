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
  Box,
  useToast,
  Image
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
  const imgGenerica =
    "https://i0.wp.com/www.sabra.org.br/site/wp-content/uploads/2020/04/instrumentos-musicais-voce-sabe-quais-sao-os-mais-tocados-no-mundo-20191202180617.jpg.jpg?fit=800%2C600&ssl=1";

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

  const getInfoPagamentCartao = (): InfoPagamentoCartao => {
    return {
      numeroCartao,
      cvvCartao,
      vencimento: new Date(vencimento),
      nomeTitular,
      cpfTitular,
      bandeira: bandeira()
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
          <Flex align="start">
            <Flex
              w="2xl"
              rounded={"lg"}
              bg="white"
              boxShadow={"lg"}
              p={8}
              mr="6"
            >
              <Flex w="100%" direction="column">
                <Flex pb="8">
                  <Text fontSize="3xl" fontWeight="bold">
                    Carrinho
                  </Text>
                </Flex>
                <Divider mb="4" />
                <Flex direction="column" alignItems="center">
                  <Flex
                    maxHeight="lg"
                    overflow="auto"
                    direction="column"
                    justifyContent="start"
                    w="100%"
                    borderRadius={"lg"}
                  >
                    {carrinho?.itens.map((item, index) => (
                      <Flex key={index} direction="column">
                        <Flex
                          bg="white"
                          py="4"
                          pr="6"
                          alignItems="center"
                          w="100%"
                        >
                          <Flex
                            maxH="120px"
                            maxW="120px"
                            pr="6"
                            justifyContent="end"
                            position="relative"
                          >
                            <Image
                              borderRadius="xl"
                              src={imgGenerica}
                              alt="instrumento"
                            />
                            <Flex
                              w="30px"
                              h="30px"
                              borderRadius="full"
                              bg="white"
                              justifyContent="center"
                              alignItems="center"
                              mt="-3"
                              mr="-3"
                              position="absolute"
                              borderWidth="1px"
                            >
                              <Text>{item.quantidade}</Text>
                            </Flex>
                          </Flex>
                          <Spacer />
                          <Flex w="100%" alignItems={"center"}>
                            <Flex direction="column">
                              <Text fontSize="xl" fontWeight="bold">
                                {item.produto.nome}
                              </Text>
                              <Text>{item.produto.descricao}</Text>
                            </Flex>
                            <Spacer />
                            <Text>
                              {(
                                item.quantidade * item.produto.valor
                              ).toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL"
                              })}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                  <Divider mt="4" />
                </Flex>
                <Spacer />
                <Flex pt="4" pr="4">
                  <Text fontSize="xl" fontWeight="500">
                    {"Valor Total"}
                  </Text>
                  <Spacer />
                  <Text fontSize="2xl">
                    {carrinho?.itens
                      .reduce(
                        (prev, curr) =>
                          prev + curr.produto.valor * curr.quantidade,
                        0
                      )
                      .toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL"
                      })}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex w="lg" rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
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
                          <FormControl pt="3" isRequired>
                            <FormLabel>Nome Impresso no Cartão</FormLabel>
                            <Input
                              type="text"
                              value={nomeTitular}
                              onChange={e => setNomeTitular(e.target.value)}
                              placeholder="Nome"
                            />
                          </FormControl>
                          <FormControl pt="3" isRequired>
                            <FormLabel>Número do Cartão</FormLabel>
                            <Input
                              type="text"
                              value={numeroCartao}
                              onChange={e => setNumeroCartao(e.target.value)}
                              placeholder="XXXX-XXXX-XXXX-XXXX"
                            />
                          </FormControl>
                          <SimpleGrid columns={2} spacing="2">
                            <FormControl pt="3" isRequired>
                              <FormLabel>CVV</FormLabel>
                              <Input
                                type="text"
                                value={cvvCartao}
                                onChange={e => setCvvCartao(e.target.value)}
                                placeholder="CVV"
                              />
                            </FormControl>
                            <FormControl pt="3" isRequired>
                              <FormLabel>Data de Vencimento</FormLabel>
                              <Input
                                type="Date"
                                value={vencimento}
                                onChange={e => setVencimento(e.target.value)}
                                placeholder="MM/AA"
                              />
                            </FormControl>
                          </SimpleGrid>
                          <FormControl pt="3" isRequired>
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
                              w="100%"
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
        </Flex>
      )}
    </>
  );
};

export default TelaCarrinho;
