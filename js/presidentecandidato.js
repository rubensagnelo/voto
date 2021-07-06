const tableElem = document.getElementById("table-body");


function populaCandidatos(candidatos) {
    
    var i=1;
	tableElem.innerHTML = ""

    candidatos.forEach((candidato, index) => {
		// Creates a row element.
		const rowElem = document.createElement("tr");

		// Creates a cell element th.
		const nameCell = document.createElement("th");
		nameCell.innerText = i;
		rowElem.appendChild(nameCell);        

		// Creates a cell element for the name.
		const nameCell2 = document.createElement("td");
		nameCell2.innerText = candidato.name;
		rowElem.appendChild(nameCell2);

		// Creates a cell element for the votes.
		const voteCell3 = document.createElement("td");
		voteCell3.id = "vote-" + candidato.name; 
		voteCell3.innerText = candidato.voteCount;
		rowElem.appendChild(voteCell3);

		// Adds the new row to the voting table.
		tableElem.appendChild(rowElem);

        i++;
        
    });
	lblrefresh.textContent = ""

}

function cadastrarcandidato(){

	try{
		var nomecand = document.getElementById("nomenovocandidato");
		var result = addCandidato(nomecand.value);

		var f = document.getElementById('ifbody');
		f.src = f.src;
	} catch(erro){

	}
	atualizar()
}


var lblrefresh = document.getElementById("statusrefresh");

function atualizar(){

	lblrefresh.textContent = "atualizando..."
	candidatos = [];
	try {
		getCandidatos(eleicao, populaCandidatos);
	} catch (error) {
		lblrefresh.textContent = "erro..."
	}
}
