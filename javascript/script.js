let question = [["Qui est le protagoniste de la série ?","qcu"],["A quel gang appartient David Martinez ?","qcu"],["Quel est le nom de l'arme principale de David ?","qcu"],["Quelles sont les armes utilisées par Adam Smasher dans Cyberpunk : Edgerunners ?","qcm"],["Comment s'appelle la personne qui peut te greffer un implant ?","qcu"],["Quel est le nom de la ville emblématique où se déroule la série ?","qcu"],["Quand a été construite Night City ?","qcu"],["Quel est le nom de la société qui se trouve être l'ennemi principal de la série ?","qcu"],["Comment s'appelle la division d'élite chargée des opérations spéciales du NCPD ?","qcu"],["Comment s'appelle le gang qui contrôle Watson et le district industriel de Northside (DIN) ?","qcu"],["Que veut dire l'acronyme GLACE ?","qcu"]]
let reponse = [[["David Martinez",true],["Lucy",false],["Falco",false]],
                [["Les Edgerunners",true],["La Trauma Team",false],["Le Maelstrom",false]],
                [["Sandevistan",false],["Cyber Deck",false],["Mantis Blades",true]],
                [["Un fusil de sniper",false],["Un fusil à pompe",true],["Un lance-roquettes",true],["Un minigun",false]],
                [["Le Chirurdoc",false],["Le Charcudoc",true],["Le Désosseur",false]],
                [["Night City",true],["Los Angeles",false],["Tokyo",false]],
                [["Au début du XXe siècle",false],["À la fin du XXe siècle",true],["Au début du XXIe siècle",false],["À la fin du XXIe siècle",false]],
                [["Arasaka Corporation",true],["Trauma Team International",false],["Militech",false]],
                [["La MaxTac",true],["La MaxTic",false],["La MaxToc",false]],
                [["Les Tyger Claws",false],["Le Maelstrom",true],["Les Animals",false]],
                [["Générateur logiciel anti-initiations par contré-ménages électromagnétiques",false],["Générateur logistique anti-virus par contre-mesures cybernétiques",false],["Générateur logiciel anti-intrusions par contre-mesures électroniques",true]]]
let explication = ["Le personnage principale est bien David Martinez avec son histoire au coeur de l'histoire","David fait bien parti des Edgerunners, un groupe de mercenaires qui prennent des mission à haut risque","L'arme principale de David est bien la Mantis Blade, un set de lames cybernetiques","Adam Smasher utilise un fusil à pompe mais aussi un lance-roquettes dans ses batailles, cependant il n'utilise pas de minigun ou de fusil de sniper","Le charcudoc est le personnage ayant pour habitude de faire des implant contre de l'argent, c'est d'ailleurs lui qui implante le San Devistan à David","L'anime se déroule bel et bien dans la ville fictive de Night City, mégapole et centre au crime et à la technologie","La grande ville de Night City a été fondée en 1994 éxactement, bien qu'elle soit nommé <<La mégapole du XXIème siècle>>","Arasaka Corporation est en effet l'antagoniste principal de Cyberpunk : Edgerunners, ils jouent un rôle centrale dans le déroulement de l'histoire","La MaxTac est le groupe au sommet de la NCPD, il s'agit du groupe de cybersquad s'occupant des cyberpsychos","Il s'agit bien du Maelstrom, un gang de Night City particulièrement cruel, on dit qu'un de leur membre aurait déjà tuer un enfant pour le fun","Il s'agit d'un générateur intégré au ICE, étant un programme de type sécurité pour se protéger sur le Cyberspace"]
let indexQ = 0
let score = 0
let reponseJoueur = []
let nbQuestion = reponse.length
let isRotated = false
let nbreBonneRep = 0
let BonneRep = 0
let rep=""

function QCU() {
    question.forEach( function(item,index){
        nbreBonneRep = 0
        if (item[1]=="qcm"){
            reponse[index].forEach( function(rep) {
                if (rep[1]==true) {
                    nbreBonneRep+=1
                }
            })
        question[index].push(nbreBonneRep)
        }
    })

    document.getElementById("globstart").innerHTML = `
    <div id="mainbox">
    <div id="question"></div>
    <div id="reponses"></div>
    <p id = "next" onclick="valid()">Explication</p>
    </div>
        `
    let mainbox = document.getElementById("mainbox");
    let questionDiv = document.getElementById("question");
    let reponseDiv = document.getElementById("reponses");
    document.getElementById("welcome").innerHTML = ""
    questionDiv.textContent = question[indexQ][0];
    reponseDiv.innerHTML = "";
    reponse[indexQ].forEach(function (item, index) {
        let p = document.createElement("p");
        p.textContent = `${item[0]}`;
        p.setAttribute("data-index",index);
        p.addEventListener("click",clic);
        p.id = reponse[indexQ][index][0];
        reponseDiv.appendChild(p);
    }); 
}

function expli() {
    reponseJoueur = []
    indexQ+=1;
    if (indexQ<nbQuestion) {
        document.getElementById("globstart").innerHTML = `
        <div id="mainbox">
        <p id="explication">${explication[indexQ-1]}</p>
        <p id = "next" onclick="QCU()">Question suivante</p>
        </div>
            `
    } else {
        document.getElementById("globstart").innerHTML = `
        <div id="mainbox">
        <p id="explication">${explication[indexQ-1]}</p>
        <p id = "next" onclick="Score()">Score</p>
        </div>
            `
    }
}

function clic(event) {
    if (question[indexQ][1]=="qcu") {
        reponse[indexQ].forEach(function(item){
            document.getElementById(item[0]).style.border = "none";
            document.getElementById(item[0]).style.margin = "1vw";
        })
        let reponseIndex = event.target.getAttribute("data-index");
        reponseJoueur = reponse[indexQ][reponseIndex];
        document.getElementById(reponseJoueur[0]).style.margin = "1vw 20vw";
        document.getElementById(reponseJoueur[0]).style.border = "solid 2px white";
        document.getElementById(reponseJoueur[0]).style.textAlign = "center";
    } else {
        let reponseIndex = event.target.getAttribute("data-index");
        rep=reponse[indexQ][reponseIndex]
        if(reponseJoueur.includes(rep)==true){
            reponseJoueur.splice(reponseJoueur.indexOf(rep),1)
        } else {
            reponseJoueur.push(reponse[indexQ][reponseIndex])
        }
        reponse[indexQ].forEach(function(item){
            document.getElementById(item[0]).style.border = "none";
            document.getElementById(item[0]).style.margin = "1vw";
        })
        reponseJoueur.forEach(function (item){
            document.getElementById(item[0]).style.margin = "1vw 20vw";
            document.getElementById(item[0]).style.border = "solid 2px white";
            document.getElementById(item[0]).style.textAlign = "center";
        })
        
    }
    }
    

function valid() {
    if (reponseJoueur!="") {
        if (question[indexQ][1]=="qcu") {
            if (reponseJoueur[1] == true) {
                score+=1
                expli()
            } else {
                expli()
            }
        } else {
            if (reponseJoueur.length==question[indexQ][3]) {
                reponseJoueur.forEach(function (item) {
                    if (item[1]==true){
                        BonneRep+=1}})
                        if (BonneRep==reponseJoueur.length){
                            score+=1
                            expli()
                        } else {
                            expli()
                        }
            } else {
                expli()
            }
        }
    }
}

function Score() {
    document.getElementById("globstart").innerHTML = `
        <div id="mainbox" class="glow">
        <p id="leScore">Votre score est de ${score}/${nbQuestion}.</p>
        <p id = "next" onclick="Start()">Recommencer</p>
        </div>
            `
}

function Start() {
    indexQ = 0
    score = 0
    document.getElementById("tkt").innerHTML = `
    <div id='welcome'>
    <h2>Bienvenue dans l'univers cyberpunk</h2>
    <p>Ce quiz vous testera sur vos connaissances de cet univers futuriste fascinant. Êtes-vous prêt à plonger dans le cyberpunk?</p>
    </div>
    <div id="globstart">
    <p id = "start" onclick=QCU()>LANCER LE QUIZ</p>
    </div>
            `
}