

function populaEleitores(eleitores) {

	for (i=0;i<eleitores.length;i++)
	{
		var eleitor = eleitores[i];
		// Creates a row element.
		const rowElem = document.createElement("tr");

		// Contador
		const nameCell = document.createElement("th");
		nameCell.innerText = i+1;
		rowElem.appendChild(nameCell);        

		// Nome
		const nameCell2 = document.createElement("td");
		nameCell2.innerText = eleitor.nome;
		rowElem.appendChild(nameCell2);

/*
		// Delegou voto
		const nameCell3 = document.createElement("td");
		nameCell3.innerText = eleitor.delegate;
		rowElem.appendChild(nameCell3);
		
		// Votou
		const nameCell4 = document.createElement("td");
		nameCell4.innerText = eleitor.voted;
		rowElem.appendChild(nameCell3);
*/
		// Adds the new row to the voting table.
		tableElem.appendChild(rowElem);
	}
}



function cadastrareleitor(nome,endereco){

	var nomeeleit = document.getElementById("nomenovoeleitor");
	var enderecoeleit = document.getElementById("endereconovoeleitor");

	var nome = addEleitor(nomeeleit.value,  enderecoeleit.value);

	var f = document.getElementById('ifbody');
	f.src = f.src;


/*
	if (result != "")
	{

	}
*/
}
