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

## Configurando MongoDB Atlas

1. Ir para o [site](https://www.mongodb.com/cloud/atlas) e criar uma conta em try free
2. Depois de logado, crie um novo Cluster, não precisa alterar nenhuma configuração 
   > Isso pode demorar de +5 min.
3. No menu lateral ir **Security** -> *Database Access*.
   - Clicar em add new user.
   - Digitar um usuario e senha.
   - Selecionar **Read and write to any database**.
   - Clicar em **Add User**.
  
4. No menu lateral ir **Security** -> *Network Access*.
    - Clicar em **+ add ip adress**.
    - Selecione **Allow access from anywhere**.
    - Confirm.
    > Isso pode demorar.

5. No menu lateral ir **Atlas** -> *Clusters*
   - Clique em **Connect**.
   - No Modal que abrir clie em **Connect you Application**
   - No **Driver** selecionar o `nodejs` e a **version** pode ser a mais atual
   - Copie a url
    ```
        mongodb+srv://<username>:<password>@cluster0-atau3.mongodb.net/test?retryWrites=true&w=majority
    ```
OBS: se estiver conectado em alguma rede que possui um proxy para bloquear qualquer tipo de acesso à rede externa não vai funcionar.

## Configurando o mongoose

1. Para instalar de um  `yarn add mongoose`
   >Ele serve para que evite-se usar a sitaxe do banco de dados, com ele podemos utilizar apenas javascript para se comunicar com o banco. Ele é basicamente um transpilador

    - **Sem mongoose**: `"INSERT INTO tabela VALUES ()"`
    - **Com mongoose**: `user.insert({})` 
    
2. Importar o mongoose **antes** das rotas no arquivo `server.js`.
    ```js
    const mongoose = require('mongoose'); 
    const routes = require('./routes');
    ```
3. E conectá-lo, também **antes** das rotas.
   ```js
    // conexao com o banco de dados
    mongoose.connect('mongodb+srv://<username>:<password>@cluster0-atau3.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
   ```
   - Trocar `<username>` e `<passoword>` por aqueles que foram definidos na config do mongoDB Atlas.
   - Trocar o /**test**? pelo nome que se deseja dar ao banco de dados.
   - Deve ficar algo assim
    ```
    mongodb+srv://brochj:1234@cluster0-atau3.mongodb.net/omnistack8?retryWrites=true&w=majority
    ```


40:40 rotas chama controllers e formulam uma respostas

45:00 instala o axios, para requisicoes em Api externas, requisicoes feitas no DevController


## Configurando o MongoDB Compass Community
>Com ele podemos alterar, adicionar,deletar, etc; os dados do banco, fora que é melhor de visualizar os dados.

1. Baixar instalar o [mongoDB Compass Community](https://www.mongodb.com/download-center/compass)
2. Deixar ele aberto.
3. Vai no [mongoDB Atlas](https://cloud.mongodb.com/user#/atlas/login), dentro do cluster criado e clica em **CONNECT**.
4. Depois Seleciona **Connect with MongoDB Compass** e clica em *fetch via URL* ou *copia a Url* fornecida.
5. Quando voltar ao MongoDB Compass, já vai ter um aviso que foi detectado uma URL de conexão, só aceitar.
6. Colocar o *username* e *password* que foram definidos no mongoDB Atlas.
7. No *Authentication Database* colocar `admin`.
8. Clicar em **CONNECT**


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
## Criando o projeto do react
1. Na pasta onde deseja criar o projeto
  ```sh
    yarn create react-app nomeDoAPP
  ```  
  ou `npx create react-app nomeDoAPP`

   - Utilizando esse comando, o projeto ja vem o babel e webpack e outros pre configurados
  

2. Na pasta do projeto iniciar o projeto com `yarn start`
    > Vai abrir uma aba no navegador em `http://localhost:3000`

## Entendendo a estrutura

1. Na pasta `/public`
    - `index.html` : esse será o arquivo que será mandado para o navegador via javascript, e todo o código feito em react será colocado/embutido dentro da `<div id="root"> </div>`. Toda a aplicacão é gerada pelo javascript e não pelo html.  

    O react procura pela por aquela `<div>` com `id="root"`, então é importante não mudá-la.  

    A tag `<meta name="theme-color">` é a cor que vai ficar no header do navegador do android.  

    - `manifest.json` é responsável para geração/construção de PWA (Proressive Web Apps).  
    - O código do react em si, fica dentro das inportações feita nas tags `<scripts>`.  
  
2. Na pasta `/src`. 
    - O arquivo `index.js` é o arquivo de entrada da aplicação. Sempre que o react inicializar ele vai procurar por esse arquivo.

      - Tirar o serviceworker do `src/index.js` irá ficar assim. (serviceworker é pra PWA)
      ```js
          import React from 'react';
          import ReactDOM from 'react-dom';
          import './index.css';
          import App from './App';

          ReactDOM.render(<App />, document.getElementById('root'));
      ```
      - `import ReactDOM from 'react-dom'` serve para fazer a manipulação do elementos presentes na DOM.  
      - `ReactDOM.render(<App />, document.getElementById('root'));` : Esse comando é pra renderizar a aplicação `<App />`  dentro do elemento que tiver o `id="root"`, que no caso é a `<div>` que fica em `public/index.html`.  
      - OBS: `ReactDOM.render` em 99.99% dos casos é pra ser utilizado uma única vez dentro da aplicação. 

    - `serviceWorker.js` é para a construção de PWAs

## Começando a programar
1. Colocar estilizacoes globais dentro de App.css
    - Exemplo
    ```css
        * {
        margin:0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        }
        html, body, #root {
        height: 100%;
        }
        body {
        background: #f5f5f5;
        }
        body, input, button {
        font-family: Arial, Helvetica, sans-serif;
        }
    ```
### Instalando o gerenciador de rotas 
1. Para gerenciar rotas do react `yarn add react-router-dom`   
2. Crie um `routes.js` dentro da `/src`.  
3. Dentro de `routes.js` deve ficar algo assim. Cada página da aplicação deve ter um route para ela.
    ```js
    import React from "react";
    import { BrowserRouter, Route } from "react-router-dom";

    import Login from './pages/Login';
    import Main from './pages/Main';

    export default function Routes() {
        return (
            <BrowserRouter>
                <Route path="/" exact component={Login} />
                <Route path="/dev/:id" component={Main} />
            </BrowserRouter>
        );
    }
    ```  
    - `<Route path="/" exact component={Login} />`  : Quando o usuário estiver na rota `"/"` o componente que será mostrado será o `Login`. A `exact` serve para o react mostrar a tela `Login` quando a requisição for feita em `"/"`, pois sem esse `exact`, o react não consegue acessar as rotas mais internas, pois todos os `paths=` começam com `/`. Sendo assim ele já retornaria o primeiro componente com `/`, que nesse caso é o `Login`.  
  
    - O `:id` é para criar uma parâmetro que será passado para dentro de `Main`, ou seja será acessível pela prop `match` mais especificamente em `match.params.id`. Exemplo:
    - Rota acessada `http://localhost:3000/dev/3421234_id`
    - Main.js
        ```js
        export default function Main({ match }) {
            console.log(match.params.id)
            // output:  3421234_id       
        }
        ```

4. No `App.js` tem que mudar agora para `<Routes/>`, ficando algo assim.
    ```js
        (...)
        import Routes from './routes'
        function App() {
            return (
                <div className="App">
                <Routes />
                </div>
            );
        }
        export default App;
    ```
5. Os components/telas que ficam em `routes.js`, receberão uma prop *history*, que é utilizada para fazer navegação 
    ```js
    export default function Login( { history } ) {
        (....)
    }
    ```
6.  Depois para navegar é só dar um `history.push('/main');`

#### Outra forma de navegar
1. `import { Link } from 'react-router-dom';`
2. e dentro do render dá para utilizar da seguinte maneira
   ```jsx
    <Link to="/"> {/** voltando pra tela inicial */}
        <img src={logo} alt="Tindev" />
    </Link>
   ```

## Requisicoes
1.  Instalar `yarn add axios`
2.  Cria uma pasta `src/services/` nela ficará todos os serviços que faz algum tipo de comunicaçao/conexao com um prestador de dados externo à nossa aplicaçao.
3.  Cria um arquivo `api.js` em `src/services/api.js`
    - O conteúdo de `api.js`  
        ```js
            import axios from "axios";
            const api = axios.create({
                // baseURL: 'http://192.168.16.100:3333' //Colocar o ip do computador
                baseURL: 'http://localhost:3333' //tem que dat um adb reverse tcp:3333 tcp:3333
            });
            export default api;
        ```
    -  O `adb reverse tcp:3333 tcp:3333` serve para quando estiver rodando o react-native.


# Mobile

1. instalar `yarn add react-navigation react-native-gesture-handler react-native-reanimated`
2. instalar o `yarn add axios`
3. Pra conectar o axios do RN com o backend é necessário dar `adb reverse tcp:3333 tcp:3333` , isso pra continuar usando o localhost:3333 dentro do services/api.js
4. se não utilizar esse adb reverse, dentro do services/api.js trocar o localhost pelo ip local da maquina. (192.16.....)
5. `yarn add @react-native-community/async-storage`

# Extras

## Na pasta do backend

1. instalar` yarn add socket.io`

2. importar no server.js
   1. `const io = require('socket.io);`

3. `yarn dev`

## Na pasta do frontend

1. instala `yarn add socket.io-client`
   
2. `yarn start`

14:14 ok
18:45 ok
22:12 ok

## Na pasta do mobile

1. instala `yarn add socket.io-client`