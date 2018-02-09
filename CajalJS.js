function cNet(numOfInputNodes, numOfHiddenNodes, numOfOutputNodes, desiredLearningRate) {
    this.inputNodes = numOfInputNodes;
    this.hiddenNodes = numOfHiddenNodes;
    this.outputNodes = numOfOutputNodes;
    this.learningRate = desiredLearningRate;
    this.name = function() {return this.firstName + " " + this.lastName;};
}


randomNormalDistribution(0, 1, 1000000);

/* Random Normal Number Generator
   Algorithm courtesy of Rao, et al
   http://interstat.statjournals.net/YEAR/2012/articles/1205003.pdf */

var rndArray = [];

function randomNormalDistribution(mean, stdDeviation, numberOfSamples) {
	for (x = 0; x < numberOfSamples; x++) {
		var u = Math.random();
		var z = -Math.log(1 / u - 1) / 1.702;
		z = z * stdDeviation + mean;
		rndArray.push(z);
	}
}