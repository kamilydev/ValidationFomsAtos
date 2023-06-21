'use strict';

// Captura digitação do nome/sobrenome e gera o login 
document.getElementById('nome').addEventListener('keyup', gerarLogin)
document.getElementById('sobrenome').addEventListener('keyup', gerarLogin)

function gerarLogin () {
  let nome = document.getElementById('nome').value
  let sobrenome = document.getElementById('sobrenome').value
  let login = nome.toLowerCase() + '.' + sobrenome.toLowerCase()
  document.getElementById('login').value = login.replaceAll(/[^a-z.]*/g,'')
}

// ViaCEP
const pesquisarCep = async () => {
  const cep = document.getElementById('cep').value
  const url = `http://viacep.com.br/ws/${cep}/json/`
  const retornoUrl = await fetch(url)
  const endereco = await retornoUrl.json()
  if (endereco.erro) {
    document.getElementById('cep-erro').classList.remove('d-none')
  } else {
    document.getElementById('cep-erro').classList.add('d-none')
    preencherEndereco(endereco)
  }
}

// Captura o momento em que o usuário sai do input do CEP
document.getElementById('cep').addEventListener('focusout', pesquisarCep)

// Preenche o endereço com os dados retornados da API
function preencherEndereco(endereco) {
  document.getElementById('endereco').value = endereco.logradouro
  document.getElementById('bairro').value = endereco.bairro
  document.getElementById('cidade').value = endereco.localidade
  document.getElementById('estado').value = endereco.uf
}


// Habilita o checkbox do aceite somente após a leitura dos termos
let aceite = document.querySelector('textarea')
aceite.addEventListener('scroll', () => {
  if(aceite.scrollHeight - aceite.scrollTop === aceite.clientHeight) {
    document.getElementById('termos').disabled = false
  }
})


// Captura o momento do envio do formulário
document.getElementById('formulario').addEventListener('submit', function (evento) {
  evento.preventDefault()
  if(document.getElementById('termos').checked){
    enviarDado('nome')
    enviarDado('sobrenome')
    enviarDado('email')
    enviarDado('login')
    enviarDado('senha')
    enviarDado('cep')
    enviarDado('endereco')
    enviarDado('complemento')
    enviarDado('bairro')
    enviarDado('cidade')
    enviarDado('estado')
    enviarDado('github')
    enviarDado('academia')
    enviarDado('professor')
    enviarDado('termos')
    enviarDado('info')
    document.getElementById('tabela-dados').classList.remove('d-none')
    alert('As informações foram salvas')
    document.getElementById('formulario').reset()
    document.getElementById('cep-erro').classList.add('d-none')
    document.getElementById('termos').disabled = true
  } else {
    alert('Você precisa ler e concordar com os termos legais')
  }
})


// Simula o envio dos dados para a tabela
function enviarDado(campo) {
  if(campo == 'info') {
    document.getElementById('t-' + campo).innerText = document.forms.formulario.elements.info.value
  } else {
    document.getElementById('t-' + campo).innerText = document.getElementById(campo).value
  }
}