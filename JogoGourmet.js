const readline = require('readline')

const pratos = [
  {tipo: 'Massa', prato: ['Lasanha'], isPrato: true, isSim: false},
  {tipo: 'Bolo de chocolate', prato: [], isPrato: false, isSim: false},
]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var question = function(q) {
  return new Promise( (res, rej) => {
      rl.question( q, answer => {
          res(answer);
      })
  });
};

function consolAcerto() {
  return(
    console.log(),
    console.log("|-----------------------------------------------|"),
    console.log("|------------|                      |-----------|"),
    console.log("|------------|   ACERTEI DE NOVO!   |-----------|"),
    console.log("|------------|                      |-----------|"),
    console.log("|-----------------------------------------------|")
  )
}

async function main() {
  var answer;
  var index = 0;
  var next = false
  while ( String(answer).toLowerCase() != 'exit' ) {
    console.clear()
    console.log("|------------     JOGO GOURMET     ------------|")
    console.log()
    answer = await question(`         Pense em um prato que gosta: \n\n            (Enter)     iniciar\n            (Ctl + C)   Sair\n`);
    next = false
    while (!next) {
      console.log("|----------------------------------------------|")
      answer = await question(`  O prato que você pensou é ${pratos[index].tipo}?: (y/n) `);
      if(String(answer).toLowerCase() === 'y'){
        
        if (!pratos[index].isPrato){
          consolAcerto()
          await question('')
          next = true
        }
  
        if (pratos[index].isPrato){
          answer = await question(`\n    => O prato que você pensou é ${ pratos[index].prato[0]}?: (y/n) `)
          pratos[index].isSim = true
          if (String(answer).toLowerCase() === 'y'){
            consolAcerto()
            await question('')
            pratos[index].isSim = false
            index = 0
            next = true
           
          }
        } 
      }
  
      if(String(answer).toLowerCase() === 'n'){
        
        if(pratos[index].isSim){
          for (let i = 1; i < pratos[index].prato.length; i ++){
            answer = await question(`    => O prato que você pensou é ${ pratos[index].prato[i]}?: (y/n) `)
            if (String(answer).toLowerCase() === 'y') break
          }
          if (String(answer).toLowerCase() === 'y'){
            consolAcerto()
            pratos[index].isSim = false
            index = 0
            next = true
            await question('')
          }else{
            answer = await question("\n -> Qual prato você pensou?: ")
            pratos[index].prato.push(answer)
            pratos[index].isSim = false
            index = 0
            next = true
          }
        }
  
        if (!pratos[index].isPrato) {
          answer = await question("\n -> Qual prato você pensou?: ")
          prato = answer
          answer = await question(`\n--------- COMPLETE ---------  \n${prato} é _________ mas Bolo de Chocolate não. : `)
          pratos.splice(pratos.length -1 , 0, {tipo: answer, prato:[`${prato}`], isPrato: true, isSim: false})
          index = 0
          next = true
        }
  
        !next ?index++ : index = 0
      }
    }
  }
  console.log( 'Fim do Jogo');
}

main();