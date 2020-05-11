# Iniciando back end do hipeerlab-platform

## Indice

  * [00 Configurando o Docker](#00-configurando-o-docker)
  * [01 Criando container mongodb](#01-criando-container-mongodb)
  * [02 Configurando o Redis](#02-configurando-o-redis)
  * [03 Resumo](#03-resumo)

## 00 Configurando o Docker
[Voltar para índice](#indice)

  * Instala Docker CE

    * Navega para: https://docs.docker.com/install/
    * Seleciona sistema operacional e segue etapas. Em caso de windows: https://docs.docker.com/docker-for-windows/install/
    * Confere requisitos do sistema;
    * Faz download do Docker Desktop for Windows e faz instalacao;
    * (terminal) confere se foi instalado: `docker -v` ;
    * (terminal) lista todos os comandos: `docker help` ;

  * Cria servico de banco de dados PostGreSQL

    * Busca por 'docker postgres' no google;
    * Acessa: https://hub.docker.com/_/postgres;
    * Cria servico passando:
      * Nome do container: --name database
      * Password do container: -e POSTGRES_PASSWORD=docker
      * Redirecionamento de porta da porta da maquina para a porta do container: -p 5432:5432
      * (terminal) Comando: `docker run --name postgres-hipeerlab-platform -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

      Obs: username padrao (postgres) nao precisa ser passado como parametro;

  * (terminal) Verifica se container esta rodando: `docker ps` ;

  * Instala PostBird (interface visual GUI para visualizar dados no banco de dados): https://electronjs.org/apps/postbird

  * Faz conexao com banco de dados utilizando PostHBird:

    * Host: localhost
    * Port: 5432
    * Username: hipeerlab-admin (default username)
    * Password: docker

    * Clica em 'Test Connection'
    * Clica em 'Save & Connect'

  * Cria nova database clicando em 'select database' > 'create database'

  * Renomeia database;

  * (terminal) Interrompe conexao com container: `docker stop postgres-hipeerlab-platform` ;
  * (terminal) Visualiza todos os containers que tem na maquina: `docker ps -a` ;
  * (terminal) Inicia conexao com container: `docker start postgres-hipeerlab-platform` ;
  * (terminal) Confere se container esta rodando: `docker ps` ;
  * (terminal) Visualiza log de erros do container: `docker logs postgres-hipeerlab-platform` ;

  * Para remover um container, primeiro interrompa a conexão executando o comando `docker stop NomeDoContainer` e em seguida execute o comando para remover: `docker rm NomeDoContainer`

## 01 Criando container mongodb
[Voltar para índice](#indice)

  * Inicializa docker

    * Cria servico passando:
      * Nome do container: --name mongo-hipeerlab-platform
      * Redirecionamento de porta da porta da maquina para a porta do container: -p 27017:27017
      * (terminal) Comando: `docker run --name mongo-hipeerlab-platform -p 27017:27017 -d -t mongo`
      * Para saber se o mongo está rodando, basta entrar no Chrome, entrar em 'localhost:27017' e checar se a frase
      "it looks like you are trying to access MongoDB over HTTP on the native driver port"

  * Instala dependência mongoose

    * (terminal) Comando: `yarn add mongoose`
    * (terminal) Inicia conexao com container: `docker start mongo-hipeerlab-platform`
    * (terminal) Roda `docker ps -a` para checar se container está rodando "STATUS: Up"

  * Faz download da ferramenda MongoDB Compass Community em https://www.mongodb.com/download-center/compass
  para visualização dos dados de notificação

   * Se surgir alguma dúvida na instalação, assitir, a partir de 11'30'', a aula [notificando novos agendamentos](https://skylab.rocketseat.com.br/node/continuando-api-do-go-barber/group/envio-de-notificacoes/lesson/notificando-novos-agendamentos-1)

   *Enviar agendamento pelo insomnia (Appointments -> Post) e checar se chegou uma notificação no MongoDB Compass Community

## 02 Configurando o Redis
[Voltar para índice](#indice)

  * Inicializa docker

    * Cria servico passando:
      * Nome do container: --name redis-hipeerlab-platform
      * Redirecionamento de porta da porta da maquina para a porta do container: -p 6379:6379
      * (terminal) Comando: `docker run --name redis-hipeerlab-platform -p 6379:6379 -d -t redis:alpine`
      * (terminal) Comando: `docker start redis-hipeerlab-platform`
      * (terminal) Comando: `docker ps -a` para checar se está em STATUS: Up



## 03 Resumo
[Voltar para índice](#indice)

  * Depois de ter criado os containers

    * Inicializa Docker
    * Abre VSCode
      * (terminal) Comandos:
        * yarn (se ainda não possuir as dependências)
        * docker start postgres-hipeerlab-platform
        * docker start mongo-hipeerlab-platform
        * docker start redis-hipeerlab-platform
        * docker ps -a para checar se estão em STATUS: Up
    * No postbird:
      * Entrar com:
        * Username: hipeerlab-admin
        * password: docker
        * host: localhost
      * 'select database' > 'create database' > 'hipeerlab-platform'
    * Voltando ao VSCode
      * (terminal) Comando: yarn sequelize db:migrate
      * Esse comando migrará os dados das migrations para a base de dados 'hipeerlab-platform'
    * Volte ao PostBird e cheque se as tabelas realmente apareceram
    * Voltando ao VSCode, dê o comando 'yarn dev' e tudo deverá estar funcionando





