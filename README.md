### Requisitos

- Node

### Para executar localmente utilize os comandos abaixo, execute o back end antes

`git clone https://github.com/jerrymartins/reactHooks.git`

`cd reactHooks/`

`npm run install`
`npm run dev`

### Link de acesso

`http://localhost:3000/`

### LOGIN
`para logar, pode usar o botão login com facebook, ou usar qualquer email e senha :)`

### Observações
Parte da estrutura (Storage Files-S3, Storage Data-Dynamodb) está contida em instancias da AWS.
É possível deixar o front e o back end também em instancias da AWS, junto com o banco e o storage. 
Não era o foco do projeto.
Ao cadastrar um filme é importante definir uma imagem de cartaz.

existe uma instancia da Api rodando no ElasticBeanstalk, endereço abaixo
http://dynamoxapi.us-east-1.elasticbeanstalk.com/api/films
http://dynamoxapi.us-east-1.elasticbeanstalk.com/api/users

é possível deixar o front end executando em um serviço chamado Amplify, porém, ele aceita somente
requisições HTTPS. 

# Front End TRAILIX
