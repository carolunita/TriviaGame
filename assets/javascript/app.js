$(document).ready(function() {

	// Hide Elements
	$("#trackerBox").hide();
	$(".questionBox").hide();
	$(".answerBox").hide();
	$(".restartBox").hide();

	// Declaring Variables
	var introSong = document.getElementById("introSong");
	var gameSong = document.getElementById("gameSong");
	var gameSong = document.getElementById("restartMusic");
	var correctSound = document.getElementById("correctSound");
	var incorrectSound = document.getElementById("incorrectSound");
	var correct = 0;
	var incorrect = 0;
	var remaining = 30;
	var result = "";
	var timer = "";
	var index = 0;
	var finalScore = 0;
	
	// Trivia Questions (Array of Objects)
	var questionSelect = [
		{questionNumber: "Question # 1",
		question: "WHAT IS ON THE END OF ZERO'S NOSE?",
		answerOne: "A red bulb",
		answerOneValue: "incorrect",
		answerTwo: "A glowing pumpkin nose",
		answerTwoValue: "correct",
		answerThree: "A small flame",
		answerThreeValue: "incorrect",
		answerText: "Zero has a glowing pumpkin nose, he helps guide his master Jack Skellington through the fog on Christmas Eve.",
		gif: "assets/images/zero.gif"},

		{questionNumber: "Question # 2",
		question: "WHERE DOES SALLY KEEP HER SPARE NEEDLE FOR MENDING HER BODY?",
		answerOne: "The hem of her dress",
		answerOneValue: "incorrect",
		answerTwo: "In her left shoe",
		answerTwoValue: "incorrect",
		answerThree: "Behind her right ear",
		answerThreeValue: "correct",
		answerText: "Sally keeps the needele behind her right ear. She's gotten very good at mending herself with the needle and thread.",
		gif: "assets/images/sally.gif"},

		{questionNumber: "Question # 3",
		question: "WHEN JACK IS SHOT DOWN FROM THE SKY, WHERE DOES HE LAND?",
		answerOne: "The arms of an angelic statue",
		answerOneValue: "correct",
		answerTwo: "In an open coffin",
		answerTwoValue: "incorrect",
		answerThree: "On the tip of a Christmas tree",
		answerThreeValue: "incorrect",
		answerText: "When Jack is shot down from the sky, he lands in the outstretched arms of a stone angel.",
		gif: "assets/images/angel.gif"},

		{questionNumber: "Question # 4",
		question: "WHAT TYPE OF KING IS JACK",
		answerOne: "Pumpkin King",
		answerOneValue: "correct",
		answerTwo: "Skeleton King",
		answerTwoValue: "incorrect",
		answerThree: "Halloween King",
		answerThreeValue: "incorrect",
		answerText: "Jack is the Pumpkin King, as he sings it in most of his songs.",
		gif: "assets/images/king.gif"},

		{questionNumber: "Question # 5",
		question: "WHAT DOES JACK ASK SALLY TO DO FOR HIM, TO HELP MAKE CHRISTMAS A REALITY?",
		answerOne: "Wrap up all the presents",
		answerOneValue: "incorrect",
		answerTwo: "Sew him a red suit",
		answerTwoValue: "correct",
		answerThree: "Sleighride with him",
		answerThreeValue: "incorrect",
		answerText: "Jack ask Sally to make his Sandy Claws outfit.",
		gif: "assets/images/redsuit.gif"},

		{questionNumber: "Question # 6",
		question: "WHAT PART OF HIS BODY DOES JACK TAKE OUT TO PLAY WITH HIS DOG WITH?",
		answerOne: "One of his ribs",
		answerOneValue: "correct",
		answerTwo: "His arm",
		answerTwoValue: "incorrect",
		answerThree: "His jaw",
		answerThreeValue: "incorrect",
		answerText: "Jack remove one of his ribs to play fetch with his dog, Zero.",
		gif: "assets/images/fetch.gif"},

		{questionNumber: "Question # 7",
		question: "WHAT INGREDIENT DOES SALLY USE TO SUBDUE DR. FINKELSTEIN?",
		answerOne: "Eye of Newt",
		answerOneValue: "incorrect",
		answerTwo: "Cat's Tail",
		answerTwoValue: "incorrect",
		answerThree: "Deadly Night Shade",
		answerThreeValue: "correct",
		answerText: "When Sally wants to go out, she poisons the doctor with deadly nightshade (covered up with worm's wart and frog's breath) and sneaks out.",
		gif: "assets/images/poison.gif"},

		{questionNumber: "Question # 8",
		question: "WHAT ARE THE NAMES OF OOGIE'S HENCHMEN?",
		answerOne: "Chest, Lock and Key",
		answerOneValue: "incorrect",
		answerTwo: "Shock, Barrel and Spark ",
		answerTwoValue: "incorrect",
		answerThree: "Lock, Shock and Barrel",
		answerThreeValue: "correct",
		answerText: "Lock, Shock, and Barrel are a trio of trick-or-treaters from Halloween Town. They served as Oogie Boogie's henchmen.",
		gif: "assets/images/henchmen.gif"},

		{questionNumber: "Question # 9",
		question: "WHAT TYPE OF ANIMAL IS ON THE MAYOR OF HALLOWEEN TOWN'S SHIRT?",
		answerOne: "A bat",
		answerOneValue: "incorrect",
		answerTwo: "A spider",
		answerTwoValue: "correct",
		answerThree: "A beetle",
		answerThreeValue: "incorrect",
		answerText: "He also wears a ribbon that says mayor on it. Being a politician, he is naturally two-faced, and can rotate his head to appear as either happy or sad, depending on his mood of course.",
		gif: "assets/images/mayor.gif"},

		{questionNumber: "Question # 10",
		question: "WHAT HAPPENS IN SALLY'S VISION REGARDING JACK'S PLANS FOR CHRISTSMAS?",
		answerOne: "She sees Jack in a Santa Claus outfit",
		answerOneValue: "incorrect",
		answerTwo: "She sees a Christmas tree that goes up in flames",
		answerTwoValue: "correct",
		answerThree: "Jack is thrown from a sleigh into a bottomless pit",
		answerThreeValue: "incorrect",
		answerText: "Sally plucks the petals off a forget-me-not, which then transforms before her eyes into a miniature Christmas tree and suddenly bursts into flames: a premonition of things to come.",
		gif: "assets/images/vision.gif"}
	];

	// Answer Selection
	function selectAnswer() {
		$(".answer").click(function() {
			var userAnswer = $(this).val();
			$(".questionBox").fadeOut(2000);
			$("#answerGif").removeAttr("src").attr("src", questionSelect[index].gif);
			$(".answerBox").delay(2000).fadeIn(2000);

			if (userAnswer == "correct") {
				correct++;
				result = "Correct!"
				correctSound.play();
				$("#answerText").text(questionSelect[index].answerText);
				clearInterval(timer);
				updateScreen();
				setTimeout(nextQuestion, 7000);
			} else if (userAnswer == "incorrect") {
				incorrect++;
				result = "Incorrect!"
				incorrectSound.play();
				$("#answerText").text(questionSelect[index].answerText);
				clearInterval(timer);
				updateScreen();
				setTimeout(nextQuestion, 7000);
			} else {
				alert("Please try again.");
			}
		}); 
	}

	// Play Intro Song on Start
	introSong.play();
	$("#introSong").prop("volume", 0.5);
	audioControls(introSong);

	// Start Game when clicks event occurs
	$("#startGame").click(function startGame() {
		// Fade & Stop Intro Song
		$("#introSong").animate({volume: 0}, 3000);
		setTimeout("introSong.pause();", 3000);
		// Instructions & Start Button Effect
		$(".fadeEffect").fadeOut(2000);
		// Fade Controls
		$("#trackerBox").delay(2000).fadeIn(2000);
		audioControls(gameSong);
		// Start Game Song
		$("#gameSong").prop("volume", 0);
		setTimeout("gameSong.play();", 3000);
		$("#gameSong").animate({volume: 0.5}, 3500);
		// Run Game
		question(index);
		selectAnswer();
	});

	// Audio Controls
	function audioControls(music) {
		var volume = 0.5;

		$("#playSong").click(function() {
			music.play();
		});

		$("#pauseSong").click(function() {
			music.pause();
		});

		$("#restartSong").click(function() {
			music.pause();
			music.currentTime = 0;
			music.play();
		});

		$("#volumeDown").click(function() {
			volume = volume - 0.1;
			music.volume = volume;
		});

		$("#volumeUp").click(function() {
			volume = volume + 0.1;
			music.volume = volume;
		});
	}

	// Timer Fucntion
	function countDown() {
		if (remaining > 0) {
			remaining--;
			updateScreen();
		} else {
			remaining = 0;
		}
		// Failing to Select an Answer
		if (remaining == 0) {
			incorrect++;
			result = "Time's Up!"
			incorrectSound.play();
			$(".questionBox").fadeOut(2000);
			$("#answerText").text(questionSelect[index].answerText);
			$(".answerBox").delay(2000).fadeIn(2000);
			clearInterval(timer);
			updateScreen();
			setTimeout(nextQuestion, 7000);
		}
	}

	// End Game
	function endGame() {
		updateScreen();
		$(".answerBox").fadeOut(2000);
		$(".restartBox").delay(2000).fadeIn(2000);
		$("#gameSong").animate({volume: 0}, 3000);
		setTimeout("gameSong.pause();", 3000);
		// Reset Variables / Play Second Song / Start New Game
		$("#restartGame").click(function() {
			$(".restartBox").fadeOut(2000);
			correct = 0;
			incorrect = 0;
			remaining = 30;
			result = "";
			timer = "";
			index = 0;
			finalScore = 0;
			question(index);
			$("#restartMusic").prop("volume", 0);
			setTimeout("restartMusic.play();", 1000);
			$("#restartMusic").animate({volume: 0.5}, 3500);
		});
	}

	// Load Next Question
	function nextQuestion() {
		$(".answerBox").fadeOut(2000);
		remaining = 30;
		index++;

		if (index == questionSelect.length) {
			endGame();
		} else {
			question(index);
		}
	}

	// Question Timer
	function question(X) {
		timer = setInterval(countDown, 1000);
		$(".questionBox").delay(2000).fadeIn(2000);

		// Update Question & Apply Values to Answers
		$("#questionNumber").text(questionSelect[X].questionNumber);
		$("#question").text(questionSelect[X].question);
		$("#answerOne").text(questionSelect[X].answerOne);
		$("#answerOne").removeAttr("value").val(questionSelect[X].answerOneValue);
		$("#answerTwo").text(questionSelect[X].answerTwo);
		$("#answerTwo").removeAttr("value").val(questionSelect[X].answerTwoValue);
		$("#answerThree").text(questionSelect[X].answerThree);
		$("#answerThree").removeAttr("value").val(questionSelect[X].answerThreeValue);
	}

	// Update Counter
	function updateScreen() {
		$(".correct").text(correct);
		$(".incorrect").text(incorrect);
		$(".remaining").text(remaining);
		$("#result").text(result);
		
	// Final Score
		finalScore = correct * 5;
		$("#finalScore").text(finalScore);
	}

}); 