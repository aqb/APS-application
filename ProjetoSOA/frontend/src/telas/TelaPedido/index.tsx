import { useEffect, useState } from "react";

import { Flex, HStack, IconButton, Spinner, useToast } from "@chakra-ui/react";
import {
  RiHome4Line,
  RiLogoutBoxLine,
  RiShoppingBag3Line,
  RiShoppingCart2Line
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

import CardPedido from "../../components/Pedido/CardPedido";
import Pedido from "../../modelos/Pedido/Pedido";
import { getPedido } from "../../services/pedido";

const TelaPedido: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const { pedidoId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getPedido(pedidoId || "")
      .then(pedido => {
        setPedido(pedido);
        setLoading(false);
      })
      .catch(() => {
        toast({
          title: "Pedido não encontrado.",
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

          <Flex
            h="auto"
            w="full"
            justify="center"
            rounded={"lg"}
            bg="white"
            boxShadow={"lg"}
            p={8}
            m="8"
          >
            <CardPedido pedido={pedido} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default TelaPedido;
