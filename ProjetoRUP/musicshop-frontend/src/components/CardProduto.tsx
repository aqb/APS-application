import { Box, Button, Text, Image, Flex, Grid } from "@chakra-ui/react";

interface CardProdutoProps {
  nome: string;
  valor: number;
  id: string;
  descricao: string;
}

export default function CardProduto({
  produto
}: {
  produto: CardProdutoProps;
}) {
  const imgGenerica =
    "https://i0.wp.com/www.sabra.org.br/site/wp-content/uploads/2020/04/instrumentos-musicais-voce-sabe-quais-sao-os-mais-tocados-no-mundo-20191202180617.jpg.jpg?fit=800%2C600&ssl=1";
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imgGenerica} alt="instrumento" />
      <Box p="6">
        <Grid>
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="xl">{produto.nome}</Text>
            <Text fontSize="md">R${produto.valor}</Text>
          </Flex>
          <Button colorScheme="teal" size="md">
            Ver detalhes
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}
