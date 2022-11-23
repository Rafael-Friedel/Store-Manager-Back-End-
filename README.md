# Store-manager

> A ideia do projeto é criar uma aplicação back-end onde simule uma loja, onde possa cadastrar novas vendas, cadastrar novos produtos, e fazer consultas no estoque, por determinado produto pelo id ou buscar todos. É um pequeno CRUD.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] trazer um gif da aplicação funcionando
- [x] criar dockerfile e dockercompose

### Tecnologias utilizadas

- express
- Node
- Docker
- MySQL
- chai/mocha/sinon/chai-as-promised para testar a aplicação


### Desafios

Realizar um CRUD completo e 100% testado de forma unitária. Sem usar ORM's, usando querys puras somente.

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.15.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16 --lts`
    - `nvm use 16`
    - `nvm alias default 16`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/course/back-end/docker/orquestrando-containers-com-docker-compose/6e8afaef-566a-47f2-9246-d3700db7a56a/conteudo/0006a231-1a10-48a2-ac82-9e03e205a231/instalacao/abe40727-6310-4ad8-bde6-fd1e919dadc0?use_case=side_bar);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>

<details>
<summary><strong>Rodando o projeto na sua máquina</strong></summary><br />

 ```
 git clone git@github.com:Rafael-Friedel/Store-Manager-Back-End-.git
 ```
 
 
 ```
 cd Store-Manager-Back-End- && npm run compose:up
 ```

 ```
 docker start app_backend db
 ```
 
 Para conferir a aplicação back-end basta acessar no seu navegador:
 ```
 http://localhost:3001/
 ```
</details>
