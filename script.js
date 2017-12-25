/*Крестики-нолики.
Имеем 3 обработчика:
1 - выбор One player/two players (quantity)
2 - выбор X or O (choice)
3 - игра (ticTacToe)
Первый обработчик (quantity) включает два остальных. Выбрали количество игроков, чем играть и переходим к полю
Если игрока 2 - меняем х на о и проверяем, чтобы ячейка, куда кликают, была пустая.
Если игрок 1 - то после игрока ходит компьютер. Но если у компьютера х, то он ходит первым.
Условия для компьютера куда ходить:
1. если у компьютера Х, то он ходит в центр первым.
1. проверка на выиграш (если есть 2 хода игрока или компьютера, ходить туда, чтобы или выиграть или не дать 
   выиграть игроку.
2. Занимать углы, кот дальше всего от хода противника, если их нет, ходить куда-нибудь.
3. если у компьютера О и центр свободный, он ходит в центр.
*/
			
//переменные
var field = document.getElementById('field');
var quantity = document.getElementById('quantity');
var choice = document.getElementById('choice');
var reset = document.getElementById('reset');
var drawResult = document.getElementById('drawResult');
var playerResult = document.getElementById('playerResult');
var computerResult = document.getElementById('computerResult');
			
var computerTurn;   		//сторона компьютера
var playerTurn;     		//сторона игрока
var computerCounter = 0;	//счетчик для компьютера, чтобы ходить не больше 1-го раза
var playerCounter = 0;      //счетчик для игрока, чтобы компьютер ходил после игрока
var resultO = 0;    		//проверка на выиграш для 'о'
var resultX = 0;    		//проверка на выиграш для 'х'
var draw = 0;				//переменная для ничьи, считает ходы до 9-ти
var quantityOfPlayers = 1;  //количество игроков, по умолчанию, если не выбирать, играют игрок + компьютер
var temp;
			
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//функции
//1. очистить поле, чтобы начать новую игру
function toClear() {
	for (var i = 0; i <= 2; i++) {
		for (var j = 0; j <= 2; j++) {
			field.rows[i].cells[j].innerHTML = ' ';
			field.rows[i].cells[j].style.background = 'rgb(89, 124, 133)';
		}
	}
	draw = 0;
	//если играют 2 игрока, поменять х на о и обратно для игрока, чтобы не менял обработчик ticTacToe
	if (quantityOfPlayers == 2) {
		if (computerTurn == 'x') playerTurn = 'o';
			else playerTurn = 'x';
		}
	if (quantityOfPlayers == 1 && computerTurn == 'x') { 
			setTimeout("field.rows[1].cells[1].innerHTML = 'x'", 1500)   //крестик ходит в центр первым, #ячейка 1,1
			draw += 1;
	}
};
			
//2.ничья - запись
function showDraw() {     //
	drawResult.innerHTML++;
	draw = 0;
};
			
//3. счетчик побед player_one or player_two
function toCountWinner () {
	if (resultX == 3 && choice.previousElementSibling.firstElementChild.innerHTML == '(x),') {
		playerResult.innerHTML++;
	}
	if (resultO == 3 && choice.previousElementSibling.firstElementChild.innerHTML == '(o),') {
		playerResult.innerHTML++;
	}
	if (resultX == 3 && playerResult.nextElementSibling.innerHTML == '(x),') {
		computerResult.innerHTML++;
	}
	if (resultO == 3 && playerResult.nextElementSibling.innerHTML == '(o),') {
		computerResult.innerHTML++;
	}
};
			
			
//---------------------------------------------------------------------------------------
//обработчик click количество игроков, 2 или 1 + компьютер
function getQuantity(event) {
	var target = event.target;
	if (target.tagName != 'BUTTON' || computerTurn == 'x' && quantity.firstElementChild.nextElementSibling.innerHTML == 'computer') {
		return;
	}
	if (target.innerHTML == 'player_one') {
		quantityOfPlayers = 1;
		target.nextElementSibling.innerHTML = 'computer';
		if (computerTurn == 'x') {
			setTimeout("field.rows[1].cells[1].innerHTML = 'x'", 1500)   //крестик ходит в центр первым, #ячейка 1,1
			draw += 1;
		}
	} else {
		if (target.innerHTML == 'computer') {
			target.innerHTML = 'player_two';
			quantityOfPlayers = 2;
		} else {
			target.innerHTML = 'computer';
			quantityOfPlayers = 1;
			if (computerTurn == 'x') {
				setTimeout("field.rows[1].cells[1].innerHTML = 'x'", 1500)   //крестик ходит в центр первым, #ячейка 1,1
				draw += 1;
			}
		}
	}
};
quantity.onclick = getQuantity;
			
//обработчик click выбор игроком, чем играть х или о
function toChoice(event) {
	if (computerTurn == 'x' && quantityOfPlayers == 1) {    //если уже выбран х для компьютера, он походил и больше выбирать нельзя, только ходить на поле
		return;
	}
	var target = event.target;
	playerTurn = target.innerHTML;
								
	//чем играть компьютеру или второму игроку
	if (playerTurn == 'x') {
		choice.previousElementSibling.firstElementChild.innerHTML = '(x),';     //записали х игроку
		computerTurn = 'o'; 
		playerResult.nextElementSibling.innerHTML = '(o),';  //записали о компьютеру
				
	} else { 
		choice.previousElementSibling.firstElementChild.innerHTML = '(o),';   //записали о игроку
		computerTurn = 'x'; 
		playerResult.nextElementSibling.innerHTML = '(x),';   //записали х компьютеру
					
		if (quantityOfPlayers == 1) { 
			setTimeout("field.rows[1].cells[1].innerHTML = 'x'", 1500)   //крестик ходит в центр первым, #ячейка 1,1
			draw += 1;
		}
	}
	field.onclick = ticTacToe;        //включаем обработчик для таблицы после выбора х,о
};
choice.onclick = toChoice;
						
//обработчик click на таблице
function ticTacToe(event) {
	computerCounter = 0;  		// счетчик для хода компьютера
	playerCounter = 0;			// счетчик для хода игрока
	choice.onclick = null;  	// остановка обработчика для кнопки выбора х,о
	quantity.onclick = null;    // остановка обработчика для кнопок выбора количества игроков
				
	var result = 0;
	var empty = 0;
	var target = event.target;
				
	//для заполнения ячеек игроком нужны только пустые ячейки
	if (target.tagName == 'TD' && target.innerHTML == ' ') {
		target.innerHTML = playerTurn;
		temp = playerTurn;
		playerCounter += 1; 
		draw += 1;
	}
//----------------------------------------------------------
//----------------------------------------------------------
// игра с 2мя игроками, без компьютера
	if (quantityOfPlayers == 2) {    //если играют 2 игрока без компьютера
		computerCounter = 1;
		if (playerTurn == 'x') playerTurn = 'o';
		else playerTurn = 'x';
	}						
	//проверка на выиграш, горизонталь
	for (var i = 0; i <= 2; i++) {
		resultX = 0; resultO = 0;
		for (var j = 0; j <= 2; j++) {
			if (field.rows[i].cells[j].innerHTML == 'x') {
				resultX += 1;
			}
			if (field.rows[i].cells[j].innerHTML == 'o') {
				resultO += 1;
			}
		}
		if (resultX == 3 || resultO == 3 ) {
			for (j = 0; j <= 2; j++) {
				field.rows[i].cells[j].style.background = 'orange';
			}
			toCountWinner();							//функция счетчик побед player_one or player_two
			setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
			return;
		}
	}
	//проверка на выиграш, вертикаль
	for (var i = 0; i <= 2; i++) {
		resultX = 0; resultO = 0;
		for (var j = 0; j <= 2; j++) {
			if (field.rows[j].cells[i].innerHTML == 'x') {
				resultX += 1;
			}
			if (field.rows[j].cells[i].innerHTML == 'o') {
				resultO += 1;
			}
		}
		if (resultX == 3 || resultO == 3) {
			for (j = 0; j <= 2; j++) {
				field.rows[j].cells[i].style.background = 'orange';
			}
			toCountWinner();							//функция счетчик побед player_one or player_two
			setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
			return;
		}
	}
	//проверка на выиграш, диагональ1
	resultX = 0; resultO = 0;
	for (var i = 0; i <= 2; i++) {
		if (field.rows[0 + i].cells[0 + i].innerHTML == 'x') {
			resultX += 1;
		}
		if (field.rows[0 + i].cells[0 + i].innerHTML == 'o') {
			resultO += 1;
		}
	}
	if (resultX == 3 || resultO == 3) {
		for (j = 0; j <= 2; j++) {
			field.rows[j].cells[j].style.background = 'orange';
		}
		toCountWinner();							//функция счетчик побед player_one or player_two
		setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
		return;
	}
	//проверка на выиграш, диагональ2
	resultX = 0; resultO = 0;
	for (var i = 0; i <= 2; i++) {
		if (field.rows[0 + i].cells[2 - i].innerHTML == 'x') {
			resultX += 1;
		}
		if (field.rows[0 + i].cells[2 - i].innerHTML == 'o') {
			resultO += 1;
		}
	}
	if (resultX == 3 || resultO == 3) {
		for (j = 0; j <= 2; j++) {
			field.rows[0 + j].cells[2 - j].style.background = 'orange';
		}
		toCountWinner();							//функция счетчик побед player_one or player_two
		setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
		return;
	}
					
	//--------------------------------------------------------------
	//--------------------------------------------------------------
	if (draw >= 9) {
		setTimeout(showDraw, 1500);
		setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
		return;
	}
								
	//игра с компьютером
	//ход компьютера, только после хода игрока
	if (playerCounter > 0) {
			
	//1. сначала проверка на выиграш компьютера
	//1.1 горизонталь
		if (computerCounter == 0) {
			for (var i = 0; i <= 2; i++) {
				result = 0;
				for (var j = 0; j <= 2; j++) {
					if (field.rows[i].cells[j].innerHTML == computerTurn) {
						result += 1;
					} 
					if (field.rows[i].cells[j].innerHTML == ' ') {
						empty = j;
					}
				}
				if (result == 2 && field.rows[i].cells[empty].innerHTML == ' ') {
					field.rows[i].cells[empty].innerHTML = computerTurn;
					for (j = 0; j <= 2; j++) {
						field.rows[i].cells[j].style.background = 'orange';
					}
					computerResult.innerHTML++;
					setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
					return;
				}
			}
			//1.2 вертикаль
			for (var i = 0; i <= 2; i++) {
				result = 0;
				for (var j = 0; j <= 2; j++) {
					if (field.rows[j].cells[i].innerHTML == computerTurn) {
						result += 1;
					} 
					if (field.rows[j].cells[i].innerHTML == ' ') {
						empty = j;
					}
				}
				if (result == 2 && field.rows[empty].cells[i].innerHTML == ' ') {
					field.rows[empty].cells[i].innerHTML = computerTurn;
					for (j = 0; j <= 2; j++) {
						field.rows[j].cells[i].style.background = 'orange';
					}
					computerResult.innerHTML++;
					setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
					return;
				}
			}
			//1.3 диагональ1
			result = 0;
			for (var i = 0; i <= 2; i++) {
				if (field.rows[0 + i].cells[0 + i].innerHTML == computerTurn) {
					result += 1;
				} 
				if (field.rows[0 + i].cells[0 + i].innerHTML == ' ') {
					empty = i;
				}
			}
			if (result == 2 && field.rows[empty].cells[empty].innerHTML == ' ') {
				field.rows[empty].cells[empty].innerHTML = computerTurn;
				for (j = 0; j <= 2; j++) {
					field.rows[j].cells[j].style.background = 'orange';
				}
				computerResult.innerHTML++;
				setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
				return;
			}
			//1.4 диагональ2
			result = 0;
			for (i = 0; i <= 2; i++) {
				if (field.rows[0 + i].cells[2 - i].innerHTML == computerTurn) {
					result += 1;
				} 
				if (field.rows[0 + i].cells[2 - i].innerHTML == ' ') { 
					empty = i;
				}
			}
			if (result == 2 && field.rows[0 + empty].cells[2 - empty].innerHTML == ' ') {
				field.rows[0 + empty].cells[2 - empty].innerHTML = computerTurn;
				for (j = 0; j <= 2; j++) {
					field.rows[0 + j].cells[2 - j].style.background = 'orange';
				}
				computerResult.innerHTML++;
				setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
				return;
			}
			//-------------------------------------------------------------------------------
			//-------------------------------------------------------------------------------
			//2. проверка не дать выиграть противнику
			//2.1. горизонталь
			for (var i = 0; i <= 2; i++) {
				result = 0; 
				for (var j = 0; j <= 2; j++) {
					if (field.rows[i].cells[j].innerHTML == playerTurn) {
						result += 1;
					} 
					if (field.rows[i].cells[j].innerHTML == ' ') {
						empty = j;
					}
				}
				if (result == 2 && field.rows[i].cells[empty].innerHTML == ' ' && computerCounter == 0) {
					field.rows[i].cells[empty].innerHTML = computerTurn;
					computerCounter += 1;
					draw += 1;
				}
			}
			//2.2. вертикаль
			for (var i = 0; i <= 2; i++) {
				result = 0; 
				for (var j = 0; j <= 2; j++) {
					if (field.rows[j].cells[i].innerHTML == playerTurn) {
						result += 1;
					} 
					if (field.rows[j].cells[i].innerHTML == ' ') {
						empty = j;
					}
				}
				if (result == 2 && field.rows[empty].cells[i].innerHTML == ' ' && computerCounter == 0) {
					field.rows[empty].cells[i].innerHTML = computerTurn;
					computerCounter += 1;
					draw += 1;
				}
			}
			//2.3. диагональ1
			result = 0;
			for (var i = 0; i <= 2 ; i++) {
				if (field.rows[i].cells[i].innerHTML == playerTurn) {
					result += 1;
				}
				if (field.rows[i].cells[i].innerHTML == ' ') {
					empty = i;
				}
			}	
			if (result == 2 && computerCounter == 0 && field.rows[empty].cells[empty].innerHTML == ' ') { 
				field.rows[empty].cells[empty].innerHTML = computerTurn;
				computerCounter += 1; 
				draw += 1;
			}				
			//2.4 диагональ2
			result = 0;
			for (var i = 0; i <= 2 ; i++) {
				if (field.rows[0 + i].cells[2 - i].innerHTML == playerTurn) {
					result += 1;
				}
				if (field.rows[0 + i].cells[2 - i].innerHTML == ' ') {
					empty = i;
				}
			}	
			if (result == 2 && computerCounter == 0 && field.rows[0 + empty].cells[2 - empty].innerHTML == ' ') { 
				field.rows[0 + empty].cells[2 - empty].innerHTML = computerTurn;
				computerCounter += 1; 
				draw += 1;
			}				
		}
				
		//---------------------------------------------------------------------------
		//---------------------------------------------------------------------------
		//if computerTurn == 0, то первый ход в центр, если свободно
		if (computerTurn != 'x' && computerCounter == 0) {
			if (field.rows[1].cells[1].innerHTML == ' ') {
				field.rows[1].cells[1].innerHTML = computerTurn;
				computerCounter += 1;
				draw += 1;
			}
		}
				
		//углы
		var targetRow = target.parentElement.rowIndex;
		var targetCell = target.cellIndex;
					
		if (targetRow == 0) {
			targetRow = targetRow + 2;
		} else if (targetRow == 2) {
			targetRow = targetRow - 2;
		}
		if (targetRow == 1) {
			for (var j = 0; j <= 2; j = j + 2) {
				for (var i = 0; i <= 2; i = i + 2) {
					if (field.rows[j].cells[i].innerHTML === ' ' && computerCounter == 0){
						field.rows[j].cells[i].innerHTML = computerTurn;
						computerCounter += 1;
						draw += 1;
						break;
					}
				}
			}
		}
		for (var i = 0; i <= 2; i = i + 2) {
			if (field.rows[targetRow].cells[i].innerHTML === ' ' && computerCounter == 0){
				field.rows[targetRow].cells[i].innerHTML = computerTurn;
				computerCounter += 1;
				draw += 1;
				break;
			}
		}
				
		//ход куда-нибудь
		if (computerCounter == 0) {
			for (var j = 0; j <= 2; j++) {
				for (var i = 0; i <= 2; i++) {
					if (field.rows[j].cells[i].innerHTML == ' ' && computerCounter == 0) {
						field.rows[j].cells[i].innerHTML = computerTurn;
						computerCounter += 1;
						draw += 1;
					}
				}
			}
		}
				
		if (draw >= 9) {
			setTimeout(showDraw, 1500);
			setTimeout(toClear, 1500);      			//вызов функции toClear через 1.5 сек
			return;
		}
	}
};	
			
function toReset() {
	location.reload();
};
reset.onclick = toReset;
			