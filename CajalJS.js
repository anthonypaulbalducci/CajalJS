/* Code inspired by Tariq Rashid's excellent text 'Make Your Own Neural Network'
   https://www.amazon.com/Make-Your-Own-Neural-Network-ebook/dp/B01EER4Z4G
   https://github.com/makeyourownneuralnetwork/
*/

function cNet(numOfInputNodes, numOfHiddenNodes, numOfOutputNodes, desiredLearningRate) {
    this.inputNodes = numOfInputNodes;
    this.hiddenNodes = numOfHiddenNodes;
    this.outputNodes = numOfOutputNodes;
    this.learningRate = desiredLearningRate;
    
    this.wih = randomNormalMatrix(0, Math.pow(numOfHiddenNodes, -0.5), numOfHiddenNodes, numOfInputNodes);
    this.who = randomNormalMatrix(0, Math.pow(numOfHiddenNodes, -0.5), numOfOutputNodes, numOfHiddenNodes);

    this.train = function(inputs_list, targets_list) {
      var hidden_inputs = math.multiply(this.wih, inputs);
      var hidden_outputs = hidden_inputs.map(function (value, index, matrix) { return activationFunction(value); });

      var final_inputs = math.multiply(this.who, hidden_outputs);
      var final_outputs = final_inputs.map(function (value, index, matrix) { return activationFunction(value); });
      
      var output_errors = math.subtract(targets, final_outputs);

      var hidden_errors = math.multiply(math.transpose(this.who), output_errors);
      this.who = math.add(this.who, this.learningRate * math.multiply((output_errors * final_outputs * (1.0 - final_outputs)), math.transpose(hidden_outputs)));
      this.wih = math.add(this.wih, this.learningRate * math.multiply((hidden_errors * hidden_outputs * (1.0 - hidden_outputs)), math.transpose(inputs)));
    }

    this.query = function(inputs_list) {
      var inputs = math.transpose(inputs_list);
      var hidden_inputs = math.multiply(this.wih, inputs);
      var hidden_outputs = hidden_inputs.map(function (value, index, matrix) { return activationFunction(value); });
      var final_inputs = math.multiply(this.who, hidden_outputs);
      var final_outputs = final_inputs.map(function (value, index, matrix) { return activationFunction(value); });

      return final_outputs;
    }
}

function activationFunction(x) {
  return 1 / (1 + Math.pow(Math.E, -x));
}

function sampleRandomNormalDistribution(mean, stdDeviation) {
  /* Random Normal Number Generator
   Algorithm courtesy of Rao, et al
   http://interstat.statjournals.net/YEAR/2012/articles/1205003.pdf */
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