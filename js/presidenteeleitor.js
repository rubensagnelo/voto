
const tableElem = document.getElementById("table-body");


function populaEleitores(eleitores) {
    var delegou = "nao";
    var votou = "nao"
	tableElem.innerHTML = ""

	for (i=0;i<eleitores.length;i++)
	{

        delegou = "<span style='color:red'>não</span>";
        votou = "<span style='color:red'>não</span>";

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
            delegou ="<span style='color:green'>sim</span>";		    

		const nameCell3 = document.createElement("td");
		nameCell3.innerHTML = delegou;
		rowElem.appendChild(nameCell3);
		
		// Votou
		if (eleitor.voted=="true")
            votou ="<span style='color:green'>sim</span>";		    


		const nameCell4 = document.createElement("td");
		nameCell4.innerHTML = votou;
		rowElem.appendChild(nameCell4);

		// Adds the new row to the voting table.
		tableElem.appendChild(rowElem);
	}
	lblrefresh.textContent = ""
}


function cadastrareleitor(nome,endereco){

	try {
		var nomeeleit = document.getElementById("nomenovoeleitor");
		var enderecoeleit = document.getElementById("endereconovoeleitor");

		var nome = addEleitor(nomeeleit.value,  enderecoeleit.value);

		var f = document.getElementById('ifbody');
		f.src = f.src;
		
	} catch (error) {
			
	}
	atualizar();

}

var lblrefresh = document.getElementById("statusrefresh");

function atualizar(){
	lblrefresh.textContent = "atualizando..."
	eleitores = [];
	try {
		getEleitores(eleicao, populaEleitores);
	} catch (error) {
		lblrefresh.textContent = "erro!"
	}
}
