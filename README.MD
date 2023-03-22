# Introdução 🚀

A eficiência no fornecimento de energia elétrica é essencial para uma cidade inteligente e sustentável. Visando oferecer um serviço de qualidade para a população, a prefeitura de uma cidade resolveu adotar uma infraestrutura de IoT para monitorar o consumo de energia elétrica em tempo real e promover o uso consciente dos recursos.

Para atingir esse objetivo, a prefeitura e a concessionária de abastecimento lançaram um edital que busca empreendedores de tecnologia especializados em IoT para apresentar soluções que permitam a coleta e análise dos dados de consumo de energia elétrica em larga escala.

Nesse contexto, nossa startup foi convidada a apresentar um protótipo que utiliza tecnologias de IoT para coletar, processar e apresentar os dados de consumo de energia elétrica de forma simples e acessível. Nosso sistema permitirá que cada cliente tenha um controle mais preciso sobre seu consumo de energia elétrica, podendo monitorá-lo em tempo real e identificar possíveis gargalos que gerem desperdícios e gastos excessivos.

Neste relatório, apresentaremos um protótipo desenvolvido por uma startup fictícia que visa solucionar o problema proposto pela prefeitura. O protótipo consiste em um sistema de coleta de dados automatizado, que permite a geração de informações precisas sobre o consumo de energia em residências, o cálculo da fatura a ser paga e o envio de alertas aos usuários em caso de consumo excessivo ou variação na conta. Além disso, a solução envolve um servidor soquete que irá receber dados dos medidores inteligentes instalados nas residências dos usuários, e será possível visualizar esses dados de forma online através de uma interface web que consome uma API REST.

Ao longo deste relatório, detalharemos a arquitetura do sistema, as tecnologias utilizadas, os resultados obtidos e as possíveis melhorias para o futuro. Esperamos que este relatório seja útil para outras empresas e prefeituras que desejam incorporar a loT em seus serviços e tornar suas cidades mais inteligentes.

Vamos juntos nessa jornada em busca de uma cidade mais inteligente e sustentável! 💡🌍


# Conceitos & Metodologia

O código desenvolvido é dividido em três grandes partes: a primeira parte é o medidor, que funciona como o cliente e é responsável por enviar os dados de consumo de energia para o servidor. A segunda parte é o servidor, que armazena todos os dados enviados pelos medidores via soquete. E a terceira parte é o usuário online, onde foi criada uma interface web usando React para visualizar os dados de consumo de energia em tempo real.

Os conceitos que abrangem o problema principal do projeto são: o uso de soquetes para comunicação entre dispositivos diferentes, API REST, que permite levar esses dados para o cliente através do protocolo HTTP, o uso de threads e outras formas para acompanhar múltiplas conexões, e o Docker para containerização do projeto, garantindo que o ambiente de desenvolvimento e de produção sejam iguais, facilitando a implantação do sistema.

Esses conceitos serão mais discutidos durante as 3 partes que compõe a aplicação, assim como sua metodologia.

<lu>
    <li><a href="#client">Client</a></li>
    <li><a href="#server">Server</a></li>
    <li><a href="#user">User</a></li>
</lu>


<div id="client">

# Measurer (Cliente/Medidor) 📱

O cliente é responsável por enviar dados do consumo de energia elétrica para o servidor através de uma conexão socket TCP/IP. Ele é desenvolvido em Python e utiliza a biblioteca socket para realizar a comunicação com o servidor. O cliente é iniciado a partir da execução do arquivo measurer.py.

O código do cliente é dividido em duas principais funções:

## Função get_id()
Essa função é responsável por solicitar ao servidor um ID para o medidor de consumo de energia elétrica. Ela envia uma mensagem JSON contendo o valor 0 para o servidor e aguarda a resposta com o ID, que é armazenado na variável id.

## Função send_data()
Essa função é responsável por enviar para o servidor os dados de consumo de energia elétrica em tempo real. Ela envia uma mensagem JSON contendo o ID do medidor, o valor do consumo, a data e hora do consumo e o tipo de mensagem. A variável rate é utilizada para simular o consumo em tempo real, e a variável spent é utilizada para armazenar o total consumido pelo medidor.

Além dessas funções, o código do cliente também possui uma função menu() que permite ao usuário alterar a taxa de consumo do medidor. Essa função é executada em uma thread separada, e permite que o usuário aumente, diminua ou defina uma nova taxa de consumo. A thread principal do cliente é responsável por enviar os dados de consumo em tempo real.

Ao final da execução, o cliente é encerrado e a conexão com o servidor é fechada.

</div>