**RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio

# Cadastro de carro

**RF** 

- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**RN** 

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro
- O carro deve ser cadastrado, por padrão como disponivel.
- O usuário responsáveç pelo cadastro deve ser um usuário administrador.
# Listagem de carros

**RF** 

- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos carros disponíveis pelo nome da marca.
- Deve ser possível listar todos carros disponíveis pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema.

# Cadastro de Especificação do Carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de Imagens do Caroo

**RF**
- Deve ser possível cadastrar a imagem do carro. 
- Deve ser possível listar todos os carros.

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de Carro

**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- Ao realizar um aluguel, o status deverá ser alterado para indisponível.


# Devolução de Carros

**RF**
- Deve ser possível realizar a devolução de um carro

**RN**
- Se o carro for devolvido com menos de 24 horas, deverá se cobrado a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horoário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa aos dias de atraso/
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação.


# Listagem de Alugueis para o usuário

**RF**
- Deve ser possível realizar a busca de todos os algueis para o usuário

**RN**
- O usuário deve estar logado na aplicação


# Recuperar senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação da senha deve expirar em 3 horas 