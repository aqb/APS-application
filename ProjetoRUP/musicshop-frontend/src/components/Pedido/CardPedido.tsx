import { Divider, Flex, Text, VStack } from "@chakra-ui/react";

import { Pedido } from "../../modelos/Pedido";
import CardItemPedido from "./CardItemPedido";

interface CardPedidoProps {
  pedido: Pedido | null;
}

const CardPedido: React.FC<CardPedidoProps> = ({ pedido }) => {
  return (
    <Flex w="full" direction="column">
      <Flex pb="8">
        <VStack align="start">
          <Text fontSize="3xl" fontWeight="bold">
            Pedido
          </Text>
          <Text fontSize="lg" fontWeight="semibold" color="gray.400">
            {pedido?.id}
          </Text>
        </VStack>
      </Flex>
      <Divider mb="4" />
      <Flex direction="column" alignItems="center">
        <Flex
          maxHeight="lg"
          overflow="auto"
          direction="column"
          justifyContent="start"
          w="full"
          borderRadius={"lg"}
        >
          {pedido?.itens.map((item, index) => (
            <Flex key={index} direction="column">
              <Flex bg="white" py="4" pr="6" alignItems="center" w="100%">
                <CardItemPedido
                  produtoId={item.produto.id}
                  quantidade={item.quantidade}
                  valor={item.valor}
                ></CardItemPedido>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardPedido;
