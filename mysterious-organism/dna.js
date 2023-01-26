// Mysterious Organism DNA Generator
// For Codecademy Challenge
// By: Sir Parz ^_^
// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// The Factory
const pokemonFactory = (specimenNum, dna) => {
  let dnaString = [];
  for (let i = 0; i < dna; i++) {
    dnaString.push(mockUpStrand());
  }
  return {
    specimenNum,
    dna,
    mutate() { // limitation: mutated DNA base is randomly generated instead
      const iChooseYou = Math.floor(Math.random() * dna)
      let mutatedDNA = mockUpStrand();
      while (this.dna[iChooseYou] === mutatedDNA) {
        mutatedDNA = mockUpStrand();
      }
      this.dna[iChooseYou] = mutatedDNA;
      return this.dna
    },
    compareDNA (otherPokemon) {
      let similarDNA = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherPokemon.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0)
      similarPercent = (similarDNA / this.dna.length) * 100;
      similarPercentBetter = parseFloat(similarPercent.toPrecision(3))
      return `species #${this.specimenNum} and species #${otherPokemon.specimenNum} have ${similarPercentBetter}% DNA in common`
    },
    willLikelySurvive() {
      const CG = this.dna.filter(base => base === 'C' || base === 'G').length
      const CGRate = CG / this.dna.length;
      //console.log(CGRate)
      return CGRate >= .6;
    }
  }
}

// The Pokemon Incubation
const survivingSpecimen = [];
let counter = 0;
do {
  specimenTest = pokemonFactory(counter,mockUpStrand())
  if (specimenTest.willLikelySurvive()) {
    survivingSpecimen.push(specimenTest)
    console.log(`Pokemon Specimen #${counter} successfully incubated!`)
    console.log(specimenTest)
    counter++;
  }
} while (counter < 30)

//console.log(survivingSpecimen[1].compareDNA(survivingSpecimen[20]))

// I couldn't do the bonus, the instruction was unclear :c