
const tableElem = document.getElementById("table-body");



function populaCandidatos(candidatos) {
    
	var index=0;
	var candidato;
	tableElem.innerHTML = "";
	
	for (i=0;i<candidatos.length;i++)
	{		
		candidato = candidatos[i];

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

		const voteCell4 = document.createElement("td");
		voteCell4.id = "vote-" + candidato.name; 
		voteCell4.innerHTML = "<input type='radio' name='escolha' onclick=\"preparavoto('"+ i +"');\" >" ;
		rowElem.appendChild(voteCell4);

		// Adds the new row to the voting table.
		tableElem.appendChild(rowElem);
	} 
	lblrefresh.textContent = ""

}

function preparavoto(nome){
	try {
		var cmpvoto = document.getElementById("hdnvoto");
		cmpvoto.value = nome;
	} catch (error) {
			
	}
}

function Votar()
{
	try{
		var cmpvoto = document.getElementById("hdnvoto");
		votarcandiato(cmpvoto.value);
	} catch(error){
	}
	atualizar();
}

function delegar(){
	try{	
		var cmpdelegar = document.getElementById("txtEnderecoDelegado");
		delegarvoto(cmpdelegar.value);
	} catch(error){
	}
	atualizar();
}

var lblrefresh = document.getElementById("statusrefresh");

function atualizar(){

	lblrefresh.textContent = "atualizando..."
	candidatos = [];
	try {
		getCandidatos(eleicao, populaCandidatos);
	} catch (error) {
		lblrefresh.value = "erro!"
	}
}


