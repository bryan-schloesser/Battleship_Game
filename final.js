// Ready Document
$(document).ready(function(e){
		//start the jams
		var audio = new Audio('Audio.mp3');
		audio.play();
		//Hide all tabs but first one
		$('ul.tabNavigation li a').click(function(e){
		// prevent the default action
		e.preventDefault();
		//hide images
		$("#win").hide();
		$("#lose").hide();
		$(this.hash).show().siblings('div').hide();
		$(this).addClass('selected').parent().siblings().children().removeClass('selected');
		$('a[href="#reset"]').click(function(e){
			location.reload();
		});
		}).first().click();
		//hide gameboard on load
		$("#gameboard").hide();
		$("#score").hide();
	
	//Submit Form of Player Numbers to begin game
	$("#playerInput").submit(function(e){
			//prevents page from refreshing
			e.preventDefault();
		
			//resets counters to 10
			var hitCounter = 10;
			var cpuHitCounter = 10;	
		
		
		//Function that gets 10 unique random numbers between 0-99
		function getRandomNums(){
			//create array of numbers 0 - 99
			var numbers = [];
				for(var i = 0; i < 99; i++){
					numbers.push(i);
				}
			//Create Array to throw 10 unique numbers into
			var x = [];
			//Fill X array with 0 - 99 in random order
			for (i = numbers.length; i--; ) {
			var random = numbers.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
			x.push(random);
			}
			//Cut X down to only 10 numbers
			x.length = 10;
			return x;
			}
		var cpuChoiceArray = getRandomNums();
		
		
		
		
		
		//function that, when called will shuffle 0-99 
		function getCpuGuesses(){
			//create array of numbers 0 - 99
			var numbers = [];
				for(var i = 0; i < 99; i++){
					numbers.push(i);
				}
			//Create Array to throw 10 unique numbers into
			var x = [];
			//Fill X array with 0 - 99 in random order
			for (i = numbers.length; i--; ) {
			var random = numbers.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
			x.push(random);
			}
			return x;
			}
		var cpuGuess = getCpuGuesses();
		console.log(cpuGuess);
		
		
		//gather player ships
		var num1 = parseFloat($("#num1").val());
		var num2 = parseFloat($("#num2").val());
		var num3 = parseFloat($("#num3").val());
		var num4 = parseFloat($("#num4").val());
		var num5 = parseFloat($("#num5").val());
		var num6 = parseFloat($("#num6").val());
		var num7 = parseFloat($("#num7").val());
		var num8 = parseFloat($("#num8").val());
		var num9 = parseFloat($("#num9").val());
		var num10 = parseFloat($("#num10").val());
		var playerChoiceArray = [num1, num2, num3, num4, num5, num6, num7, num8, num9, num10];
		
		//validates playerChoice Array for unique numbers
		uniqueArray = playerChoiceArray.slice();                        
		duplicates = [];
		for (var i = 0; i < playerChoiceArray.length - 1; i++) {
			if (uniqueArray[i + 1] === uniqueArray[i]) {
				duplicates.push(uniqueArray[i]);
			}
		}
		if (duplicates.length !== 0){
			$("#error").addClass('error').html('numbers are not unique');
			return false;
		}
		
		//displays game board to begin battle
		$('h1').removeClass('error').html('Click any sector to comence battle!');
		$("#playerInput").hide();
		$("#gameboard").show();
		$("#score").show();

	
		//counter to determine cpu target
		var t = 0;
	$('td').click(function(e){
		
		if (cpuChoiceArray.indexOf(parseFloat($(this).attr("id"))) !== -1){
			$(this).addClass('hit').removeClass('square').html('HIT');
			hitCounter--;
			$("#cpuShips").html('CPU has '+ hitCounter +'/10 Ships left');

		}else if (cpuChoiceArray.indexOf(parseFloat($(this).attr("id"))) === -1){
			$(this).addClass('miss').removeClass('square').html('MISS');
		}
		//cpu target
		var cpuAttk = cpuGuess[t];
		console.log(cpuAttk);
		
		if (playerChoiceArray.indexOf(cpuAttk) !== -1){
			$('h1').html('Computer chose section ' + cpuAttk + ' and HIT!');
			cpuHitCounter--;
			$("#playerShips").html('Player has '+ cpuHitCounter +'/10 Ships left');
		}else if (playerChoiceArray.indexOf(cpuAttk) === -1){
			$('h1').html('Computer chose section ' + cpuAttk + ' and MISSED!');
		}
	
		//check win condition
		if (hitCounter === 0){
			$('h1').html('You are have won the battle, Commander!');
			$("#win").show();
			$("#gameboard").hide();
			$("#score").hide();
		}
		if (cpuHitCounter === 0){
			$('h1').html('You have lost the battle, Commander.');
			$("#lose").show();
			$("#gameboard").hide();
			$("#score").hide();
		}
		//Once turn is done, computer chooses next number in the array. 
		t++;
	});
	});

});

