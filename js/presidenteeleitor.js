

function populaEleitores(eleitores) {
    var delegou = "nao";
    var votou = "nao"

	for (i=0;i<eleitores.length;i++)
	{

        delegou = "nao";
        votou = "nao"

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


		// Delegou voto

		if (eleitor.delegate!="0x0000000000000000000000000000000000000000")
            delegou ="sim";		    

		const nameCell3 = document.createElement("td");
		nameCell3.innerText = delegou;
		rowElem.appendChild(nameCell3);
		
		// Votou
		if (eleitor.voted=="true")
            votou ="sim";		    


		const nameCell4 = document.createElement("td");
		nameCell4.innerText = votou;
		rowElem.appendChild(nameCell4);

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
