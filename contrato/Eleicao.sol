//pragma solidity >=0.4.22 <0.6.0;
pragma solidity >=0.6.0 <0.8.5;

/// @title Voting with delegation.
contract Ballot {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
        string nome;   // nome do eleitor
    }

    // This is a type for a single proposal.
    struct Proposal {
        string name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    //Dados de um Eleitor
    struct Eleitor {
        string nome;   // nome do Eleitor
        address endereco; // endereço (token) do Eleitor
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        
    }

    address public chairperson;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;

   
    //Lista de Eleitores
    Eleitor[] public eleitores;
    uint eleitorCount=0;
    
    //Indica finalização da Eleção
    uint EleicaoFinalizada=0;
    
    /// Create a new ballot to choose one of `proposalNames`.
    constructor() public {
//        bytes32[3] memory proposalNames = [bytes32("Flamengo"), bytes32("Palmeiras"), bytes32("Atletico")];
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        voters[chairperson].nome = "Presidente";
        
        eleitores.push(Eleitor({
            nome: voters[chairperson].nome,
            endereco: chairperson,
            weight: voters[chairperson].weight,
            voted: voters[chairperson].voted,
            delegate: voters[chairperson].delegate
        }));
        
        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
/*  
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
*/        
    }

function stringToBytes32(string memory source) public pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 32))
    }
}

    // Cadastro de candidatos
    function addCandidato(string memory nomeCandidato) public {
        
        require(EleicaoFinalizada==0, "Eleicao encerrada!");
        
        proposals.push(Proposal({
            name: nomeCandidato,
            voteCount: 0
        }));
        
    }


    // Give `voter` the right to vote on this ballot.
    // May only be called by `chairperson`.

    function giveRightToVote(address voter, string memory nome) public {
        // If the first argument of `require` evaluates
        // to `false`, execution terminates and all
        // changes to the state and to Ether balances
        // are reverted.
        // This used to consume all gas in old EVM versions, but
        // not anymore.
        // It is often a good idea to use `require` to check if
        // functions are called correctly.
        // As a second argument, you can also provide an
        // explanation about what went wrong.
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(EleicaoFinalizada==0, "Eleicao encerrada!");
        
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
        voters[voter].nome = nome;
        
        //eleitorCount++;
        
        //eleitores[eleitorCount].nome = nome;
       //eleitores[eleitorCount].endereco = voter;
       
        
        eleitores.push(Eleitor({
                nome: voters[voter].nome,
                endereco: voter,
                weight: voters[voter].weight,
                voted: voters[voter].voted,
                delegate: voters[voter].delegate
            }));
        
       
        
        eleitorCount++;
        
    }

    /// Delegate your vote to the voter `to`.
    function delegate(address to) public {
        // assigns reference
        Voter storage sender = voters[msg.sender];
        
        require(EleicaoFinalizada==0, "Eleicao encerrada!");
        
        require(!sender.voted, "You already voted.");

        require(to != msg.sender, "Self-delegation is disallowed.");

        require(voters[to].weight==1, "Delegacao permitida somente para pessoas com direito a voto!");
 
        // Forward the delegation as long as
        // `to` also delegated.
        // In general, such loops are very dangerous,
        // because if they run too long, they might
        // need more gas than is available in a block.
        // In this case, the delegation will not be executed,
        // but in other situations, such loops might
        // cause a contract to get "stuck" completely.
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }

        
        // Since `sender` is a reference, this
        // modifies `voters[msg.sender].voted`
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        
        voters[msg.sender].voted = true;
        voters[msg.sender].delegate = to;
        
        if (delegate_.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate_.weight += sender.weight;
        }
    }

    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(EleicaoFinalizada==0, "Eleicao encerrada!");
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;
        
        voters[msg.sender].voted = true;
        
        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() public view
            returns (string memory winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
    
    function getProposalsCount() public view 
            returns (uint count) 
    {
        count = proposals.length;
    }
    
    function getProposal(uint index) public view
            returns (string memory name, uint voteCount)
    {
        name = proposals[index].name;
        voteCount = proposals[index].voteCount;
    }
    function getVotersCount() public view 
            returns (uint count) 
    {
        count = eleitores.length;
    }
    
    function getVoters(uint index) public view
            returns (address voter, string memory nome, uint weight, bool voted, address delegate)
    {
        nome = eleitores[index].nome;
        voter = eleitores[index].endereco;
        weight = eleitores[index].weight;
        voted = eleitores[index].voted;
        delegate = eleitores[index].delegate;
        
    }
    
    function iniciarEleicao() public
    {
        EleicaoFinalizada = 0;
    }
    
    function finalizarEleicao() public
    {
        EleicaoFinalizada = 1;
    }
    
}