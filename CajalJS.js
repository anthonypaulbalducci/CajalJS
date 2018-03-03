function cNet(numOfInputNodes, numOfHiddenNodes, numOfOutputNodes, desiredLearningRate) {
    this.inputNodes = numOfInputNodes;
    this.hiddenNodes = numOfHiddenNodes;
    this.outputNodes = numOfOutputNodes;
    this.learningRate = desiredLearningRate;

    
    this.name = function() {return this.firstName + " " + this.lastName;};
}

var rndArray = new Array(m);
for (i = 0; i < m; i++) {
  rndArray[i] = new Array(n);
  for (j = 0; j < n; j++) {
    rndArray[i][j] = '[' + i + ', ' + j + ']';
  }
}
console.log(rndArray);

randomNormalDistribution(0, 1, 1000000);

/* Random Normal Number Generator
   Algorithm courtesy of Rao, et al
   http://interstat.statjournals.net/YEAR/2012/articles/1205003.pdf */

var rndArray = [];

function sampleRandomNormalDistribution(mean, stdDeviation) {
	var u = Math.random();
	var z = -Math.log(1 / u - 1) / 1.702;
    z = z * stdDeviation + mean;
    return z; 
}

function randomNormalMatrix(mean, stdDeviation, m, n) {
    var rndArray = new Array(m);
    for (i = 0; i < m; i++) {
      rndArray[i] = new Array(n);
      for (j = 0; j < n; j++) {
        rndArray[i][j] = sampleRandomNormalDistribution(mean, stdDeviation);
      }
    }
    return rndArray;
  }