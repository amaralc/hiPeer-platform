# Iniciando back end do hipeerlab-platform

## Indice

  * [01 Configurando o Docker](#03-configurando-o-docker)

## 01 Configurando o Docker
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
    * Username: postgres (default username)
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

