import { useEffect, useState } from "react";

import { Flex, Image, Spacer, Text } from "@chakra-ui/react";

import Produto from "../../modelos/Produto/Produto";
import { getProduto } from "../../services/produto";

interface CardItemPedidoProps {
  produtoId: string;
  quantidade: number;
  valor: number;
}

const CardItemPedido: React.FC<CardItemPedidoProps> = ({
  produtoId,
  quantidade,
  valor
}) => {
  const [produto, setProduto] = useState<Produto | null>(null);

  useEffect(() => {
    getProduto(produtoId)
      .then(({ produto }) => {
        setProduto(produto);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const imgGenerica =
    "https://i0.wp.com/www.sabra.org.br/site/wp-content/uploads/2020/04/instrumentos-musicais-voce-sabe-quais-sao-os-mais-tocados-no-mundo-20191202180617.jpg.jpg?fit=800%2C600&ssl=1";

  return (
    <Flex bg="white" py="4" pr="6" alignItems="center" w="100%">
      <Flex
        maxH="120px"
        maxW="120px"
        pr="6"
        justifyContent="end"
        position="relative"
      >
        <Image borderRadius="xl" src={imgGenerica} alt="instrumento" />
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
          <Text>{quantidade}</Text>
        </Flex>
      </Flex>
      <Spacer />
      <Flex w="100%" alignItems={"center"}>
        <Flex direction="column">
          <Text fontSize="xl" fontWeight="bold">
            {produto?.nome}
          </Text>
          <Text>{produto?.descricao}</Text>
        </Flex>
        <Spacer />
        <Text>
          {(quantidade * valor).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          })}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardItemPedido;
