
var PUSH={UP:38, RIGHT:39, DOWN:40, LEFT:37};

function Matrix (matrixId, rows, colls){
	this.matrixId=matrixId;
	this.rows=rows;
	this.colls=colls;
	this.create=function(){
		var matrix = document.getElementById(this.matrixId);
		var n=this.rows*this.colls;
		//matrix.innerHTML = '';
		for (var i = 0; i < n; i++) {
			var div = document.createElement('div');
			div.className = 'cell';
			matrix.appendChild(div);
		}
	}

	this.getCelll=function(row, coll){
		// функция принимает координаты ячейки
		// должна вернуть true, если она закрашена,
		// false, если не закрашена.
		var cell=this.findCell(row, coll);
		if (document.getElementById(this.matrixId).children[cell].className='cell on'){
			return true;
		}else {
			return false;
		}
	}

	this.findCell=function(snake){
		// определяет порядковый номер ячейки
		var index;
		var cell=[];
		for(index=0; index<snake.length; ++index){
			cell[index]=snake[index][0]*20+snake[index][1];
		}
		return cell;
	}

	this.setCell=function (snake, val){
		// функция принимает координаты ячейки
		// если val == true, закрашивает ячейку,
		// иначе убирает закраску.
		var cell=this.findCell(snake);
		var index;
		if (val){
			for (index=0; index<cell.length; ++index){
				$('#matrix div').eq(cell[index]).addClass(' on');
			}
		}else{
			$('#matrix div').eq(cell).removeClass(' on');
		}
	}

}

function Snakes(sn, cours){
	this.snake=sn;
	this.cours=cours;
	var that=this;
	var last_snake=[];
	var sn=[];
	this.move=function(){
	switch (that.cours){
		case 'down':
				last_snake=that.snake.shift();
				sn=that.snake[that.snake.length-1].slice();
				sn[0]++;
				that.snake.push(sn);
				break;
			case 'right':
				last_snake=that.snake.shift();
				sn=that.snake[that.snake.length-1].slice();
				sn[1]++;
				that.snake.push(sn);
				break;
			case 'left':
				last_snake=that.snake.shift();
				sn=that.snake[that.snake.length-1].slice();
				sn[1]--;
				that.snake.push(sn);
				break;
			case 'up':
				last_snake=that.snake.shift();
				sn=that.snake[that.snake.length-1].slice();
				sn[0]--;
				that.snake.push(sn);
				break;
		}
	if(that.snake[that.snake.length-1][0]==20 || that.snake[that.snake.length-1][0]==-1 || that.snake[that.snake.length-1][1]==-1 || that.snake[that.snake.length-1][1]==20){
		alert('Game Over');
		location.reload();
	}
		that.crash();
	//alert(last_snake);
		//alert(that.snake);
	that.setCell(last_snake, false);
	that.setCell(that.snake, true);
	}

	this.crash=function(){
		var a=[[1,1],[2,2]];
		var b = [2,2];
		alert(a[1]);
		if (a[1]==b){
			alert('fg');
		}
		var index;
		var crash_arr=[];
		var crash=[];
		var ind;
		var sn;
		crash_arr=that.snake.slice();
		sn=crash_arr.length;
		for (index=0; index<sn; index++){
			for(var i=0; i<crash_arr.length; i++){
				if(crash_arr[i]==crash){
					alert('bf0');
				}
			}
		}
	}
	
	
	this.navigation=function(ev){
		switch (ev){
			case PUSH.DOWN:
				that.cours='down';
				break;
			case PUSH.LEFT:
				that.cours='left';
				break;
			case PUSH.RIGHT:
				that.cours='right';
				break;
			case PUSH.UP:
				that.cours='up';
				break;
		}
	}
	
	this.findCell=function(snake){
		// определяет порядковый номер ячейки
		var index;
		var cell=[];
		if(snake[0][0]) {
			for (index = 0; index < snake.length; ++index) {
				cell[index] = snake[index][0] * 20 + snake[index][1];
			}
		}else {
			cell=snake[0]*20+snake[1];
		}
		return cell;
	}
	
	this.setCell=function (snake, val) {
		// функция принимает координаты ячейки
		// если val == true, закрашивает ячейку,
		// иначе убирает закраску.
		var cell = that.findCell(snake);
		var index;
		if (cell[1]) {
			if (val) {
				for (index = 0; index < cell.length; ++index) {
					$('#matrix div').eq(cell[index]).addClass(' on');
				}
			} else {
				for (index = 0; index < cell.length; ++index) {
					$('#matrix div').eq(cell[index]).removeClass().addClass('cell');
				}
			}
		}else{
			if(val){
				$('#matrix div').eq(cell).addClass(' on');
			}else{
				$('#matrix div').eq(cell).removeClass().addClass('cell')
			}
		}
	}
}

//
// точка входа.
//
window.onload = function()
{
	var cours='down';
	var sn=[[0, 1], [1, 1], [2, 1], [3, 1], [1, 1]];
	var m1=new Matrix('matrix', 20, 20);
	m1.create();
	m1.setCell(sn, true);
	var Snake= new Snakes(sn, cours);
	setInterval(Snake.move, 4000);
	$(document).keydown(function(event){
		if (event.which==PUSH.RIGHT || event.which==PUSH.LEFT || event.which==PUSH.UP || event.which==PUSH.DOWN){
			var ev= event.which;
			Snake.navigation(ev);
		}
	});
}




