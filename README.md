# Backend - Tindev
## Passos
1. Criar pasta backend
2. Dentro dela dar um `yarn init`
3. instalar `yarn add express` 
    >express: micro framework do node.js, para gerenciar as rotas

## No pasta backend
1. Criar pasta `src/`
2. Criar `src/server.js` (arquivo de entrada)
   
## No server.js
1. importar a lib express:  
   
   `const express = require('express');`    

   > O express é uma função, que quando chamada ela cria um novo servidor. Um novo servidor é basicamente uma nova porta de entrada que a gente pode receber requisições e retornar respostas.

2. Criar um servidor utilizando a função `express()` 
    
   `const server = express();`

   > A partir deste momento, já temos um servidor do express, mas por enquanto ele não está ouvindo nenhum endereço. Logo não tem como acessar ele utilizando `localhost:porta` ou algo do tipo.

3. Criar a porta que o servidor irá ouvir:  
   
   `server.listen(3333);`

   > Com a porta criada, pode acessar `localhost:3333` , porém não retornará nada, pois não existe nenhuma trativa de rota, o servidor ainda não sabe como lidar com as requisições que vem através de um navegador ou aplicativo.

4. Criar uma trativa de rota na raiz
   
   
   ```js
   server.get('/',(req, res)=>{
       
   });
   ```
   - Utilizar o método **`get()`** pois sempre quando um navegador faz uma chamada em alguma rota, ele faz utilizando **GET**.

    - **`req`** : ela trás todas as informações que são referentes à requisição do usuário. Como `localhost:3333?nome=`**`Oscar`** , é na requisição que estará essa informação.  
    - **`res`** : Objeto que será utilizado para retornar uma resposta para o cliente.  
  


   ###### Métodos principais dentro de uma API (GET, POST, PUT, DELETE)  
    - **GET** - Utilizado para buscar alguma informação da API.
    - **POST** - Utilizado para criar algum tipo de registro dentro da API.
    - **PUT** - Utilizado para editar. (não é possível utilizar esse pelo HTML)  
    - **DELETE** - Utilizado para deletar. (não é possível utilizar esse pelo HTML) 
    
- ### Retornando dados do usuário
  
1.  Adicionar o comando `return res.send('Hello World');` dentro da função anônima.
2. Dentro da pasta **backend**, rodar o servidor com `node src/server.js` e no navegador acessar `localhost:3333`. Deve aparecer o ***Hello world***

    server.js
    ```js
    const express = require('express');

    const server = express();

    server.get('/',(req, res)=>{
        return res.send('Hello World');
    });

    server.listen(3333);

    ```
- ### Recebendo dados para o usuário

1.  Adicionar o comando ``return res.send(`Hello ${req.query.name}`);`` dentro da função anônima.  
   
     - **`query`**: contém todos os parâmetros que são envidados na url.
2. Reiniciar o node e no navegador digitar `localhost:3333/?name=Oscar`
   
    server.js
    ```js
    const express = require('express');

    const server = express();

    server.get('/', (req, res) => {
        return res.send(`Hello ${req.query.name}`);
    });

    server.listen(3333);
    ```
3. Não é interessante retornar um texto, então em vez de utilizar o **`send()`** utiliza-se o **`json()`**.

    ```js
    server.get('/', (req, res) => {
        return res.json({ message: `Hello ${req.query.name}`});
    });
    ```

## Instalando o `nodemon`
1. O **nodemon** serve para ficar monitorando as alterações feitas no projeto e atualizando, sendo assim, não será preciso reiniciar o servidor do **node** sempre que for feita uma alteração.
2. Na pasta backend rodar `yarn add nodemon -D`
3. Dentro do **package.json** adicionar
   ```json
   "scripts":{
       "dev": "nodemon src/server.js"
   },
   ```
4. Agora pra rodar a aplicar utilizar **`yarn dev`**

### Possível erro

   1. ERRO
        ```bash
        E:\cd\js\tindev\backend>yarn dev
        yarn run v1.16.0
        $ nodemon src/server.js
        [nodemon] 1.19.1
        [nodemon] to restart at any time, enter `rs`
        [nodemon] watching: *.*
        [nodemon] starting `node src/server.js`
        events.js:173
            throw er; // Unhandled 'error' event
            ^

        Error: listen EADDRINUSE: address already in use :::3333
            at Server.setupListenHandle [as _listen2] (net.js:1226:14)
        ```
    1. SOLUÇÃO  
        
        - Algum terminal ficou aberto rodando o servidor e está utilizando a porta 3333 é só achar ele e fechar depois rodar **`yarn dev`** 
# Começando o desenvolvimento

### Refatorando a estrututa

27:00 config mongodb atlas

31:30 instalando mongoose

40:40 rotas chama controllers e formulam uma respostas

45:00 instala o axios, para requisicoes em Api externas

51:15 mongodb compass community

53:50 um controller n~ao deve ter mais que o 5 metodos fundamentais
que sao os 
- index: pra fazer uma lista dos recursos 
- show: pra retornar um unico recurso
- store:
- update:
- delete:

59:00 - nao pode deixar um controller sem nenhum retorno

1:14:22 instalar yarn add cors 
    para permitir o acesso do react ao backend

# REACT

1. yarn create react-app nomeDoAPP

2. O react coloca o todo o app dentro da <div id='root'></div> que fica no arquivo public/index.html. 
3. Tirar o serviceworker do src/index.js
    ```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';

    ReactDOM.render(<App />, document.getElementById('root'));
    ```

4. Colocar estilizacoes globais dentro de App.css

5. 31:19 lib para gerenciar rotas do react `yarn add react-router-dom`
6. crie um routes.js dentro da /src
7. os components/telas que ficam em routes.js, receberão uma prop history, que é utilizada para fazer navegacao 
    ```js
    export default function Login( { history } ) {
        ....
    }
    ```
8. Depois para navegar é só dar um `history.push('/main');`

## Requisicoes
1.  Instalar `yarn add axios`
2.  cria a pasta src/services/api.js

# Mobile

1. instalar `yarn add react-navigation react-native-gesture-handler react-native-reanimated`
2. instalar o `yarn add axios`
3. Pra conectar o axios do RN com o backend é necessário dar `adb reverse tcp:3333 tcp:3333` , isso pra continuar usando o localhost:3333 dentro do services/api.js
4. se não utilizar esse adb reverse, dentro do services/api.js trocar o localhost pelo ip local da maquina. (192.16.....)
5. `yarn add @react-native-community/async-storage`

   