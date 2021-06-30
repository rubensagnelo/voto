

function populaCandidatos(candidatos) {
    
    var i=1;

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

		const voteCell4 = document.createElement("td");
		voteCell4.id = "vote-" + candidato.name; 
		voteCell4.innerHTML = "<input type='radio' name='escolha'>";
		rowElem.appendChild(voteCell4);


		// Adds the new row to the voting table.
		tableElem.appendChild(rowElem);

        i++;

		// Creates an option for each candidate
		//const candidateOption = document.createElement("option");
		//candidateOption.value = index;
		//candidateOption.innerText = candidato.name;
		//candidateOptions.appendChild(candidateOption);
        
        });


		function cadastrarcandidato(){
			
			addCandidato()

		}
}


