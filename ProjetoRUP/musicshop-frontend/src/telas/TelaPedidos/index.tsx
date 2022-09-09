import { useEffect, useState } from "react";

import {
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import {
  RiHome4Line,
  RiLogoutBoxLine,
  RiShoppingCart2Line
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import CardPedido from "../../components/Pedido/CardPedido";
import { Pedido } from "../../modelos/Pedido";
import { getPedidos } from "../../services/pedido";

const TelaPedidos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getPedidos()
      .then(pedidos => {
        setPedidos(pedidos);
        setLoading(false);
      })
      .catch(() => {
        toast({
          title: "Pedidos não encontrados.",
          status: "error",
          duration: 4000,
          isClosable: true
        });
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {loading ? (
        <Flex w="100vw" h="100vh" align="center" justify="center">
          <Spinner color="blue.400" size="lg" />
        </Flex>
      ) : (
        <Flex
          w="100vw"
          h="100vh"
          align="center"
          justify="center"
          p="8"
          bgColor="gray.100"
        >
          <Flex justifyContent="flex-end" bgColor="gray.100">
            <HStack position="absolute" top="4" right="4">
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
            <IconButton
              aria-label="home"
              icon={<RiHome4Line />}
              bg="transparent"
              fontSize={24}
              onClick={() => navigate("../home")}
              position="absolute"
              top="4"
              left="4"
            />
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {pedidos?.map((pedido, index) => (
              <Flex
                h="auto"
                w="full"
                justify="center"
                rounded={"lg"}
                bg="white"
                boxShadow={"lg"}
                p={8}
                m="8"
                key={index}
                onClick={() => navigate(`/pedidos/${pedido.id}`)}
              >
                <CardPedido pedido={pedido} />
              </Flex>
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </>
  );
};

export default TelaPedidos;
