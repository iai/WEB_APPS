function executaLogin() {

	var email = document.getElementById("email").value;
	var senha = document.getElementById("senha").value;

	if(!email || !senha)
		alert('Favor digitar algo');

	var dados = localStorage.getItem('dados');
	if(!dados)
		dados = [];
	else
		dados = JSON.parse(dados);

	var tamanho = dados.length;
	for(var i = 0; i < tamanho; i++) {

		if(dados[i].email == email && dados[i].senha == senha) {
			document.location.href = 'interna.html';
			return false;
		}

	}

	alert('Usuário ou senha inválidos');

	return false;

}

function salvaUsuario(objForm) {

	var nome  = document.getElementById('nome').value;
	var email = document.getElementById('email').value;
	var senha = document.getElementById('senha').value;

	if(!nome || !email || !senha) {
		alert('Todos os campos são obrigatórios');
		return false;
	}

	var dados = localStorage.getItem('dados');
	if(!dados)
		dados = [];
	else
		dados = JSON.parse(dados);

	var indice = dados.length;

	dados[indice] = {'nome' : nome, 'email' : email, 'senha' : senha};
	
	localStorage.setItem('dados', JSON.stringify(dados));

	alert('Dados salvos com sucesso!');

	objForm.reset();

	return false;

}

function preencheLista() {

	var tabela = document.getElementById('listagem');

	var dados = localStorage.getItem('dados');
	if(!dados)
		dados = [];
	else
		dados = JSON.parse(dados);

	var tr;
	var td;
	for(var key in dados){

		tr = document.createElement("tr");

		td = document.createElement("td");
		td.innerHTML = dados[key].nome;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = dados[key].email;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = dados[key].senha;
		tr.appendChild(td);

		tabela.appendChild(tr);

	}

	td = document.createElement("td");
	td.colSpan = "3";
	td.innerHTML = "Foram encontrados "+dados.length+" registro(s)";

	tr = document.createElement("tr");
	tr.appendChild(td);
	tabela.appendChild(tr);

}