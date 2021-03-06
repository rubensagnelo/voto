
var proposals = [];
var myAddress;
var eleicao;
const CONTRACT_ADDRESS = "0x229bbdF6BCD877c0D0453Ace17fe15698C9F58FC";
//"0x6440195EF1d40ca0E77d9904572e012D8F500165"; //Com addCandidato
//"0xe0d3ED03a3D9aa4Da2EE5566E935f99c7AEc97d2";
//"0x79C2635FdFe2Af2aC170174878DE05ae1D05f006";

//"0xe0d3ED03a3D9aa4Da2EE5566E935f99c7AEc97d2"; //Contrato versão 24/06/2021

// Rodrigo Albert Fedosi
// 0x9E9e8e96dfBCF819f83b3B6c9f520A35FC3e4554

// Rubens Agnelo Gonçalves Inacio
// 0xCE76E6F7D62BC8bA508D9b0243bcDA1DAC1E38ad

//Cintia
//0x989F644c0AEb42643F963409FDe1A0BeF88143fb

var eleitores = [];

const ethEnabled = () => {
	if (window.ethereum) {
    		window.web3 = new Web3(window.ethereum);
    		window.ethereum.enable();
    		return true;
  	}
  	return false;
}

const getMyAccounts = accounts => {
	try {
		if (accounts.length == 0) {
			alert("Você não tem contas habilitadas no Metamask!");
		} else {
			myAddress = accounts[0];
			accounts.forEach(async myAddress => {
				console.log(myAddress + " : " + await window.web3.eth.getBalance(myAddress));
			});
		}
	} catch(error) {
		console.log("Erro ao obter contas...");
	}
};

window.addEventListener('load', async function() {

	if (!ethEnabled()) {
  		alert("Por favor, instale um navegador compatível com Ethereum ou uma extensão como o MetaMask para utilizar esse App!");
	}
	else {
		getMyAccounts(await web3.eth.getAccounts());

		eleicao = new web3.eth.Contract(VotingContractInterface, CONTRACT_ADDRESS);
		
        try {
            getCandidatos(eleicao, populaCandidatos);
        } catch (error) {
            
        }

        try {
            getEleitores(eleicao, populaEleitores);
        } catch (error) {
            
        }


	}
});

function getCandidatos(contractRef,callback)
{
    proposals = [];
	//contractRef.methods.getProposalsCount().call().then((count)=>{
	contractRef.methods.getProposalsCount().call(async function (error, count) {
		for (i=0; i<count; i++) {
			await contractRef.methods.getProposal(i).call().then((data)=>{
				var proposal = {
          				name : data[0], //web3.utils.toUtf8(data[0]),
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

function iniciareleicao(){
    result = "";
    try {
//        eleicao.methods.iniciarEleicao();

        eleicao.methods.iniciarEleicao().send({from: myAddress})
        .on('receipt',function(receipt) {
         //getCandidatos(eleicao, populaCandidatos);
         windows.location.reaload(true);
     })
     .on('error',function(error) {
         console.log(error.message);
                    return;     
         });  

        //eleicao.methods.addCandidato(nomeCandidato);
    } catch (error) {
        result = "Erro ao incluir o candidato! Por favor tente mais tarde novamente."        
    }
    return result;
}

function finalizareleicao(){
    result = "";
    try {
        eleicao.methods.finalizarEleicao().send({from: myAddress})
        .on('receipt',function(receipt) {
         //getCandidatos(eleicao, populaCandidatos);
         windows.location.reaload(true);
     })
     .on('error',function(error) {
         console.log(error.message);
                    return;     
         });  

        //eleicao.methods.addCandidato(nomeCandidato);
    } catch (error) {
        result = "Erro ao incluir o candidato! Por favor tente mais tarde novamente."        
    }
    return result;
}

function addCandidato(nomeCandidato){
    result = "";
    try {

        eleicao.methods.addCandidato(nomeCandidato).send({from: myAddress})
        .on('receipt',function(receipt) {
         //getCandidatos(eleicao, populaCandidatos);
         windows.location.reaload(true);
     })
     .on('error',function(error) {
         console.log(error.message);
                    return;     
         });  
    } catch (error) {
        result = "Erro ao incluir o candidato! Por favor tente mais tarde novamente."        
    }
    return result;
}

function addEleitor(nome,endereco){
    result = "";
    try {
        eleicao.methods.giveRightToVote(endereco, nome).send({from: myAddress})
        .on('receipt',function(receipt) {
         //getCandidatos(eleicao, populaCandidatos);
         windows.location.reaload(true);
     })
     .on('error',function(error) {
         console.log(error.message);
                    return;     
         });  
    } catch (error) {
        result = "Erro ao incluir o candidato! Por favor tente mais tarde novamente."        
    }
    return result;
}

function getEleitores(contractRef,callback)
{
    eleitores = [];
	//contractRef.methods.getProposalsCount().call().then((count)=>{
	contractRef.methods.getVotersCount().call(async function (error, count) {
		for (i=0; i<count; i++) {
			await contractRef.methods.getVoters(i).call().then((data)=>{
				var eleitor = {
          				endereco : String(data[0]),//web3.utils.toUtf8(data[0]),
          				nome : String(data[1]),
                        delegate : String(data[4]),
                        voted : String(data[3])   
      				};
				eleitores.push(eleitor);
 			});
		}
		if (callback) {
			callback(eleitores);
		}

	});
}

function verificarHabilitacaoEleitor(){
    result = "";
    try {
        var eleitorHabilitado=0;
        var indiceEleitor=0;
 
        for (i=0; i<eleitores.length; i++) {
            if (myAddress==eleitores[i].endereco){                      
                eleitorHabilitado=1;
                indiceEleitor=i;
            }                                       
        }
        if (eleitorHabilitado==0) {
            result = "Eleitor não está apto a votar!"
            //alert(result);
            return result;
        }
        
    } catch (error) {
        result = "Erro ao incluir voto! Por favor tente mais tarde novamente."        
    }
    return result;
}

function delegarvoto(value){
    result = "";
    try {
            eleicao.methods.delegate(value).send({from: myAddress})
               .on('receipt',function(receipt) {
                windows.location.reaload(true);
            })
            .on('error',function(error) {
                console.log(error.message);
                return;     
            });  
    } catch (error) {
        result = "Erro ao delegar voto! Por favor, tente mais tarde novamente."        
    }
    return result;
}

function votarcandiato(nome)
{
    rresult = "";
    try {

        result = verificarHabilitacaoEleitor();
        if (result!=""){
            alert(result);
        } else{
            eleicao.methods.vote(nome).send({from: myAddress}).on('receipt',function(receipt) {
                //getCandidatos(eleicao, populaCandidatos);
                windows.location.reaload(true);
            })
                .on('error',function(error) {
                    console.log(error.message);
                    return;     
            });
        }

    } catch (error) {
        rresult = "Erro ao votar! Por favor, tente mais tarde novamente."        
    }
    return rresult;
}
