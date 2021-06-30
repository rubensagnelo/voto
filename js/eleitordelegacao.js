

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

		const voteCell3 = document.createElement("td");
		voteCell3.id = "slecao" + i; 
		voteCell3.innerHTML = "<input type='radio' name='escolha' onclick=\"preparadelegar('"+ eleitor.endereco +"');\" >" ;
		rowElem.appendChild(voteCell3);        

		// Adds the new row to the voting table.
		tableElem.appendChild(rowElem);
	}
}


function preparadelegar(endereco){
	var cmp = document.getElementById("hdndelegacao");
	cmp.value = endereco;
}

function delegar()
{

	var cmp = document.getElementById("hdndelegacao");
	if (cmp.value.length>0)
        delegarvoto(cmp.value);
    else
        alert("Selecione um eleitor para delegar seu voto.")
}
