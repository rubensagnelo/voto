const tableElem = document.getElementById("table-body");
const candidateOptions = document.getElementById("candidate-options");




window.addEventListener('load', async function() {

	if (!ethEnabled()) {
  		alert("Por favor, instale um navegador compatível com Ethereum ou uma extensão como o MetaMask para utilizar esse dApp!");
	}
	else {
		getMyAccounts(await web3.eth.getAccounts());

		eleicao = new web3.eth.Contract(VotingContractInterface, CONTRACT_ADDRESS);
		getCandidatos(eleicao, populaCandidatos);
	}
});

function getCandidatos(contractRef,callback)
{
	//contractRef.methods.getProposalsCount().call().then((count)=>{
	contractRef.methods.getProposalsCount().call(async function (error, count) {
		for (i=0; i<count; i++) {
			await contractRef.methods.getProposal(i).call().then((data)=>{
				var proposal = {
          				name : web3.utils.toUtf8(data[0]),
          				voteCount : data[1]
      				};
				proposals.push(proposal);
 			});
		}
		if (callback) {
			callback(proposals);
		}

	});
}

function populaCandidatos(candidatos) {
	candidatos.forEach((candidato, index) => {
		// Creates a row element.
		const rowElem = document.createElement("tr");

		// Creates a cell element th.
		const nameCell = document.createElement("th scope='row'");
		nameCell.innerText = candidato.name;
		rowElem.appendChild(nameCell);        

		// Creates a cell element for the name.
		const nameCell = document.createElement("td");
		nameCell.innerText = candidato.name;
		rowElem.appendChild(nameCell);

		// Creates a cell element for the votes.
		const voteCell = document.createElement("td");
		voteCell.id = "vote-" + candidato.name; 
		voteCell.innerText = candidato.voteCount;
		rowElem.appendChild(voteCell);

		// Adds the new row to the voting table.
		tableElem.appendChild(rowElem);

		// Creates an option for each candidate
		const candidateOption = document.createElement("option");
		candidateOption.value = index;
		candidateOption.innerText = candidato.name;
		candidateOptions.appendChild(candidateOption);
        });
}