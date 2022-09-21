# APS-application 

## Equipe

 - Alexandre de Queiroz Burle (aqb)
 - Matheus Vinicius Teotonio do Nascimento Andrade (mvtna)
 - Rodrigo Almeida Bezerra Duarte (rabd)

## Proposta

MusicShop consiste em uma aplicação web de uma loja voltada especificamente para o ramo de instrumentos musicais. Sendo assim, a aplicação tem como finalidade expor instrumentos e acessórios musicais com o intuito de melhorar o contato do comprador com produtos de qualidade. No ambiente em questão será possível adicionar produtos em seu carrinho e finalizar a compra. Teremos agentes externos para o pagamento final, possibilitando a utilização de cartão de crédito, Pix e boleto bancário.

## Entregas
Cada entrega está disponível neste repositório, separadas por tags. Cada entrega/tag e seus respectivos materiais são apresentados abaixo:

### [Entrega 1](https://github.com/aqb/APS-application/tree/Entrega1)
- [Documento do escopo do projeto e casos de uso.](https://docs.google.com/document/d/1_DZXVH7pzyDsEdeVyLxzi6QRWSpJ6UmYsToJ0kxytdc/edit?usp=sharing)

### [Entrega 2](https://github.com/aqb/APS-application/tree/Entrega2)
- [Diagramas de Sequência](https://github.com/aqb/APS-application/tree/Entrega2/ProjetoRUP/astah-diagrams/Diagramas%20de%20Sequ%C3%AAncia.asta)
- [Diagramas de Classe de Análise](https://github.com/aqb/APS-application/tree/Entrega2/ProjetoRUP/astah-diagrams/Diagramas%20de%20Classe%20de%20Analise.asta)
- [Arquitetura](https://github.com/aqb/APS-application/tree/Entrega2/ProjetoRUP/astah-diagrams/Arquitetura.asta)
- [Dependência entre Pacotes](https://github.com/aqb/APS-application/tree/Entrega2/ProjetoRUP/astah-diagrams/Dependencia%20entre%20Pacotes.asta)
- [Projeto Login e Criar Pedido](https://github.com/aqb/APS-application/tree/Entrega2/ProjetoRUP/astah-diagrams/Projeto%20Login%20e%20Pedido.asta)
- [Apresentação](https://docs.google.com/presentation/d/1mVOVYEK0QZLuI0w8PZxjf3pn-2vcBap5/edit#slide=id.g14282295767_0_63) 

### [Entrega 2.1 - Correções e Feedbacks](https://github.com/aqb/APS-application/tree/Entrega2.1)
- UML
    - [x] Em Cadastrar Conta, a tela pode montar o objeto, o mesmo seria validado e depois incluído;
    - [x] A listagem dos itens na tela deve ser um método da própria tela e não do cliente;
    - [x] Em Realizar Pedido, é preciso devolver o status do carrinho e do estoque caso uma transação não possa ocorrer;
    - [x] Colocar uma factory referente ao pagamento;
    - [x] No diagrama de pacotes, separar Carrinho, Produto e Estoque.

- Implementação: 
    - [x] Lógica de negócio no presenter ➡️ mover para o controlador.<br/>Essa alteração envolveu a criação da Factory Method para Pagamento comentada na Arquitetura UML.

- Extra
    - [x] `ItemCarrinho` e `ItemEstoque` = `Item`. `ItemPedido` herda de `Item`. `Item` contém um `Produto`.
    - [x] `Carrinho` contém `Cliente` ao invés do inverso;
    - [x] `Pedido` contém `Cliente` ao invés de apenas o `id`;
    - [x] O Diagrama de Sequência do Caso de Uso Realizar Pedido, o qual envolve a criação do pedido no backend e a inicialização do pagamento;
    - [x] A checagem da bandeira do cartão é feita ainda no frontend, verificando se a mesma é aceita pela aplicação antes de realizar a requisição para o backend do sistema.

Além disso, as pastas do projeto em código estão condizentes com os pacotes definidos no Diagrama de Dependência de Pacotes.

### [Entrega 3](https://github.com/aqb/APS-application/tree/Entrega3)
- [Modelo de Informação do Negócio](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Modelo%20de%20Informação%20do%20Negocio.asta)
- [Modelo Navegacional](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Modelo%20Navegacional%20-%20Flowchart.asta)
- [Protótipo de Interface Gráfica](https://www.figma.com/file/F4005TuUMmH1sLfCkoRF14/wireframTelas?node-id=0%3A1)

- [Arquitetura dos Serviços](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Arquitetura%20dos%20Servi%C3%A7os.asta)
- [Modelo de Interação dos Serviços](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Modelo%20de%20Interação%20dos%20Serviços.asta)
- [Modelo de Informação Refinado](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Modelo%20de%20Informação%20Refinado.asta)
- [Diagrama de Componentes dos Serviços](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Diagrama%20de%20Componentes%20dos%20Serviços%20-%20Nível%20de%20Análise.asta)
- [Diagrama de Componentes do Sistema](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Componentes%20do%20Sistema.asta)

- [Projeto Detalhado de Telas Front-end](https://www.figma.com/file/F4005TuUMmH1sLfCkoRF14/wireframTelas?node-id=0%3A1)
- [Projeto Detalhado Serviço Carrinho](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Projeto%20Detalhado%20-%20Serviço%20Carrinho.asta)
- [Projeto Detalhado Serviço Conta](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Projeto%20Detalhado%20-%20Serviço%20Conta.asta)
- [Projeto Detalhado Serviço Estoque](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Projeto%20Detalhado%20-%20Serviço%20Estoque.asta)
- [Projeto Detalhado Serviço Pedido](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/astah-diagrams/Projeto%20Detalhado%20-%20Serviço%20Pedido.asta)

- [Implementação de Microserviços](https://github.com/aqb/APS-application/tree/Entrega3/ProjetoSOA/backend)

- [Apresentação do Projeto](https://docs.google.com/presentation/d/11fP19hVO2UfDPkMHSxTCxYn-DJwGNbJa/edit?usp=sharing&ouid=114869885420205725413&rtpof=true&sd=true)


