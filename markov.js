// NOTE: I made this file on Codecademy Labs, hence the console.read function (which AFAIK is unique to that platform).
// You can extract the anonymous function, as I will do later, to make a fully independent algorithm.

// http://labs.codecademy.com/DcSn/4#:workspace

var EOF = "|";
var SEP = " ";

console.read(function (text) {
	text = text.split(SEP);
	
	text.push(EOF);
	
	var charset = text.filter(function (e, i) {
		return text.indexOf(e) == i;
	});
	
	var probabilities = {};
	
	for (var i = 0; i < charset.length; i ++) {
		if (charset[i] == EOF) {
			continue;
		}
		
		probabilities[charset[i]] = {};
		
		for (var j = 0; j < charset.length; j ++) {
			probabilities[charset[i]][charset[j]] = 0;
		}
	}
	
	for (var i = 0; i < text.length - 1; i ++) {
		probabilities[text[i]][text[i + 1]] ++;
	}
	
	for (var i = 0; i < charset.length; i ++) {
		if (charset[i] == EOF) {
			continue;
		}
		
		for (var j = 0; j < charset.length; j ++) {
			probabilities[charset[i]][charset[j]] /= text.filter(function (e) {
				return e == charset[i];
			}).length;
		}
	}
	
	var seed = EOF;
	
	while (seed == EOF) {
		seed = charset[Math.floor(Math.random() * charset.length)];
	}
	
	var string = [];
	
	while (seed != EOF) {
		string.push(seed);
		
		var candidates = probabilities[seed];
		var chooser = Math.random();
		
		var accumulator = 0, j = 0;
		
		while (true) {
			accumulator += candidates[charset[j]];
			
			if (chooser < accumulator) {
				seed = charset[j];
				break;
			}
			
			j ++;
		}
	}
	
	console.log("-----\n" + string.join(SEP));
});
