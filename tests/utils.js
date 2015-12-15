"use strict";


QUnit.test( "printWsuff base", function( assert ) {
	var numbers = [-1000, 0,1, 1000, 2000, 100000,1000000, 10000000, 1000000000];
	var strings = ["-1.0К", "0","1.0", "1.0К", "2.0К", "100.0К", "1.0М","10.0М", "1.0Г" ];

	for(var  i = 0; i < numbers.length; i++){
		assert.equal( numbers[i].printWsuff(), strings[i], numbers[i] + " work" );
	}
}); 

QUnit.test( "printWsuff localisation", function( assert ) {
	var numbers = [-1000,0, 1, 1000, 2000, 100000,1000000];
	var strings = ["-1.0kg","0g", "1.0g", "1.0kg", "2.0kg", "100.0kg", "1.0t"];
	var suff = {
        "-3": "",
        "-2": "к",
        "-1": "",
        "0": "g",
        "1": "kg",
        "2": "t",
        "3": "",
        "4": "",
        "5": "",
        "6": ""
        };

	for(var  i = 0; i < numbers.length; i++){
		assert.equal( numbers[i].printWsuff(1,suff), strings[i], numbers[i] + " work" );
	}
});

QUnit.test( "printWsuff measure with fix = 3", function( assert ) {
	var numbers = [0, 1, 1000, 1100, 100000,1000000, 1, 1000, 1100, 100000,1000000];
	var measures = [1024,1024,1024,1024,1024,1024, 100,100,100,100,100];
	var strings = ["0", "1.000","1000.000","1.074К", "97.656К", "976.563К", "1.000", "10.000К","11.000К", "10.000М", "1.000Г"];
	
	for(var  i = 0; i < numbers.length; i++){
		assert.equal( numbers[i].printWsuff(3,undefined, measures[i]), strings[i], numbers[i] + " with "+ measures[i] +" measure work" );
	}
});


QUnit.test( "upper_bound", function( assert ) {
	var numbers = [
		[0,0,1,1,1,2,2,2,2,3,4,5,6,7,7,7],
		[0,0,1,1,1,2,2,2,2,3,4,5,6,7,7,7],
		[0,0,1,1,1,2,2,2,2,3,4,5,6,7,7,7],
		[0,0,1,1,1,2,2,2,2,3,4,5,6,7,7,7],
		[],
		[1],
	]
	var find = [2,0,-1,8,5,1];
	var result = [9,2,0,16,0,1];
	var comp = function(a,b){
		return (a < b);
	}
	
	for(var  i = 0; i < numbers.length; i++){
		assert.equal( numbers[i].upper_bound(0, numbers[i].length, find[i], comp), result[i], find[i] + " work" );
	}
});

QUnit.test( "lower_bound", function( assert ) {
	var numbers = [
		[0,0,1,1,1,2,2,2,2,3,4,5,6,7,7,7],
		[0,0,1,1,1,2,2,2,2,3,4,5,6,7,7,7],
		[0,0,1,1,1,2,2,2,2,3,4,5,6,7,7,7],
		[0,0,1,1,1,2,2,2,2,3,4,5,6,7,7,7],
		[],
		[1],
	]
	var find = [2,0,-1,8,5,1];
	var result = [5,0,0,16,0,0];
	var comp = function(a,b){
		return (a < b);
	}
	
	for(var  i = 0; i < numbers.length; i++){
		assert.equal( numbers[i].lower_bound(0, numbers[i].length, find[i], comp), result[i], find[i] + " work" );
	}
});