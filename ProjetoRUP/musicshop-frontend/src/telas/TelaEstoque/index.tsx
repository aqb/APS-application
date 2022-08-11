import { useEffect, useState } from "react";

import {
  Flex,
  Box,
  useColorModeValue,
  Text,
  Divider,
  Container,
  Spinner
} from "@chakra-ui/react";

import { ItemEstoque } from "../../modelos/Estoque";
import { getEstoque } from "../../services/estoque";

const TelaEstoque: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [estoque, setEstoque] = useState<ItemEstoque[] | null>(null);

  useEffect(() => {
    getEstoque().then(itens => {
      setEstoque(itens);
      setLoading(false);
    });
  }, []);

  return (
    <Container maxW={"7xl"}>
      {loading ? (
        <Box>
          <Spinner color="blue.400" />
        </Box>
      ) : (
        <Flex
          p="8"
          h="full"
          w="full"
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Flex direction="column" alignItems="center">
              <Flex>
                <Text fontSize="2xl" fontWeight="bold">
                  Produtos
                </Text>
              </Flex>
              {estoque?.map((item, index) => (
                <Flex
                  key={index}
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  m="4"
                  py="4"
                  px="8"
                  alignItems="center"
                  direction="column"
                >
                  <Text fontSize="2xl">{item.produto.nome}</Text>
                  <Text>{item.produto.descricao}</Text>
                  <Divider />
                  <Text>
                    Valor:{" "}
                    {item.produto.valor.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default TelaEstoque;
