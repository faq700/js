
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

	this.setCell=function (row, coll, val){
		// функция принимает координаты ячейки
		// если val == true, закрашивает ячейку,
		// иначе убирает закраску.

		var cell=this.findCell(row, coll);
		if (val){
			document.getElementById(this.matrixId).children[cell].className='cell on';
		}else{
			document.getElementById(this.matrixId).children[cell].className='cell';
		}
	}

	this.findCell=function(row, coll){
		// определяет порядковый номер ячейки
		var cell= (row-1)*this.colls+(coll-1);
		return cell;
	}

}

function Snakes(row, coll, cours){
	this.body=[row, coll];
	this.cours=cours;
	var that=this;

	this.move=function(){
	var res=that.findCell(that.body[0], that.body[1]);
	var last_body=that.body.slice();
	switch (that.cours){
			case 'down':
				that.body[0]++;
				break;
			case 'right':
				that.body[1]++;
				break;
			case 'left':
				that.body[1]--;
				break;
			case 'up':
				that.body[0]--;
				break;
		}
	if(that.body[0]==21 || that.body[0]==0 || that.body[1]==0 || that.body[1]==21){
		alert('Game Over');
		location.reload();
	}
	that.setCell(last_body[0], last_body[1], false);
	that.setCell(that.body[0], that.body[1], true);
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
	
	this.findCell=function(row, coll){
		// определяет порядковый номер ячейки
		var cell=(row-1)*20+(coll-1);
		return cell;
	}
	
	this.setCell=function (row, coll, val){
		// функция принимает координаты ячейки
		// если val == true, закрашивает ячейку,
		// иначе убирает закраску.
		var cell=that.findCell(row, coll);
		if (val){
			$('#matrix div').eq(cell).addClass(' on');
		}else{
			$('#matrix div').eq(cell).removeClass(' on');
		}
	}
}

//
// точка входа.
//
window.onload = function()
{
	var row=1;
	var coll=2;
	var cours='down';
	var m1=new Matrix('matrix', 20, 20);
	m1.create();
	m1.setCell(row, coll, true);
	var Snake= new Snakes(1, 2, 'down');
	setInterval(Snake.move, 500);
	$(document).keydown(function(event){
		if (event.which==PUSH.RIGHT || event.which==PUSH.LEFT || event.which==PUSH.UP || event.which==PUSH.DOWN){
			var ev= event.which;
			Snake.navigation(ev);
		}
	});
}




