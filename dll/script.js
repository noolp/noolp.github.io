function i(a){ //получение id
	return document.getElementById(a);
}
function c(a){ //получение class
	return document.getElementsByClassName(a);
}
function t(a){ //получение tag
	return document.getElementsByTagName(a);
}

var menu_box = i("menu_box");
var menu_logo = i("menu_logo");
var button = c("button");
var info_box = i("info_box");
var back_to_menu = i("back_to_menu");

var up_box = i("up_box");
var box_stat = i("box_stat");
var game_id = i("game_id");
var game = i("game");  //игра

var back = i("back"); //фон-картинка
var grad = i("grad"); //подсветка фона при попадании
var count_box = i("count_box"); //блок с очками
var count = i("count"); //очки
var level_count = i("level_count"); 
var time = i("time"); 
var kill = i("kill"); 
var timer_zone = i("timer_zone");

var game_zone = i("game_zone"); //область игры (всё)

var black_hole = i("black_hole"); //ЧЁРНАЯ ДЫРА
var bl_time = i("bl_time"); // счётчик чёрной дыры
var go_box = i("go_box");
var gogogo = i("gogogo"); // обратный отсчёт
var gogo = i("gogo"); // обратный отсчёт
var wave = i("wave"); //ГЛАВНЫЙ ШАР
var w_count = i("w_count"); //счёт при попадании на шар
var round = c("round"); //класс боксов кругов
var in_round = c("in_round"); // класс кругов (крутятся вокруг главного)
var moon = i("moon"); //луна (крутится вокруг маленького шара)

var counts = 0; //очки (слева сверху и на главной сфере)

var level = 1; //текущий уровень
var level_time; //текущее время уровня
var sphere_kill = 0; //собрано сфер
var sphere_kill_level = 0; //собрано сфер на уровне

var boss = 1; //текущий босс
var boss_time = 10; //текущее время босса
var boss_kill = 0; //собрано чёрных дыр
var end_bh = false; //убит ли бос
var cost_level = 5;
var cost_boss = 50;
var inter, level_int, interval_tb; //вывод в глобальные перемены
var goout = true;



//АУДИО!
function stop_audio(a){ //уменьшает звук, делает паузу и выводит в ноль
	var i = setInterval(function(){
		a.volume -= 0.1;
	},100);
	
	setTimeout(function(){
		a.pause();
		a.volume = 1;
		clearTimeout(i);
		a.currentTime = 0;
	},1000);
}

//играет в меню
var audio_back = new Audio();
	audio_back.src = "dll/menu_m.mp3";
	audio_back.autoplay = true;

var level_m = new Audio();
	level_m.src = "dll/level_m.mp3";

var boss_m = new Audio();
	boss_m.src = "dll/boss_m.mp3";
	
var fall = new Audio();
	fall.src = "dll/fall.mp3";
	
var freeplay = new Audio();
	freeplay.src = "dll/freeplay.mp3";

var ball_click = new Audio();
	ball_click.src = "dll/ball_click.mp3";

var boss_click = new Audio();
	boss_click.src = "dll/boss_click.mp3";

	var noclick = new Audio();
	noclick.src = "dll/noclick.mp3";
function fuck(){
	noclick.currentTime = 0;
	noclick.play();
}
var bat = new Audio();
	bat.src = "dll/bat.mp3";

var go_to = new Audio();
	go_to.src = "dll/go_to.mp3";

var go_to2 = new Audio();
	go_to2.src = "dll/go_to2.mp3";	
	
var go_to3 = new Audio();
	go_to3.src = "dll/go_to3.mp3";

var go_toto = new Audio();
	go_toto.src = "dll/go_toto.mp3";

var clickT = new Audio();
	clickT.src = "dll/clickT.mp3";

var clickF = new Audio();
	clickF.src = "dll/clickF.mp3";

function nearthis(){
	var near = new Audio();
	near.src = "dll/near.mp3";
	near.play();
}



////////////













////////////

function re_size(){
	var win = {
		h: document.documentElement.clientHeight-100,
		w: document.documentElement.clientWidth-100
	};
	wave.style.marginLeft = ((document.documentElement.clientWidth-100)/2) + "px";
	wave.style.marginTop = ((document.documentElement.clientHeight-100)/2) + "px";
	for(i = 0; i < round.length; i++){
			round[i].style.marginLeft = ((document.documentElement.clientWidth-100)/2) + "px";
			round[i].style.marginTop = ((document.documentElement.clientHeight-100)/2) + "px";
		}
			
	black_hole.style.marginLeft = ((document.documentElement.clientWidth-60)/2) + "px";
	black_hole.style.marginTop = ((document.documentElement.clientHeight-60)/2) + "px";
};



/////////////////меню

//кнопка ВЫХОД
function m_close(){
	stop_audio(audio_back);
	bat.currentTime = 0;
	bat.play();
	menu_logo.innerHTML = "Пока!"
	for (i=0;i<button.length;){
		button[i].remove();
	}
	setTimeout(function(){
		menu_box.style.opacity = 0;
	},1000);
	setTimeout(function(){
		window.close();
	},2000);	
}
//кнопка ИНФОРМАЦИЯ
function m_info(){
	bat.currentTime = 0;
	bat.play();
	menu_logo.innerHTML = "Информация";
	menu_logo.style.fontSize = "60px";
	for(i=0; i < button.length; i++){
		button[i].style.display = "none";
	}
	info_box.style.display = "block";
	setTimeout(function(){
		info_box.style.opacity = 1;
	},400);	
}
// обратно в меню
function back_to(){
	bat.currentTime = 0;
	bat.play();
	audio_back.play();
	info_box.style.opacity = 0;
	setTimeout(function(){
		info_box.style.display = "";
		menu_logo.innerHTML = "Waves";
		menu_logo.style.fontSize = "";
		for(i=0; i < button.length; i++){
			button[i].style.display = "";
		}
	},400);	
}
function go_game(){
	stop_audio(audio_back);
	bat.currentTime = 0;
	bat.play();

	menu_box.style.opacity = 0;
	setTimeout(function(){
		menu_box.style.display = "none";
		start_game();
		level_m.play();
	},1000);
	
}

//свободная игра!!!
function fredom_play(){
	stop_audio(audio_back);
	bat.currentTime = 0;
	bat.play();
	

	level = 0;
	menu_box.style.opacity = 0;
	setTimeout(function(){
		freeplay.play();
		menu_box.style.display = "none";
		start_game();
	},1000);
};
function fredom_play_back(){
		bat.currentTime = 0;
		bat.play();
		game.style.opacity = 0;
		setTimeout(function(){
			window.location.reload();
		},1000);

};

/////////////////////меню всё
setTimeout(function(){
		menu_box.style.animation = "mey 12s infinite ease-in-out" ;
	},2000);



function to_menu(){
	bat.currentTime = 0;
	bat.play();
	stop_audio(fall);
	stop_audio(freeplay);
	up_box.style.transition = "1s";
	up_box.style.opacity = 0;
	setTimeout(function(){
		window.location.reload();
	},1000);
}


function replay(){
	stop_audio(fall);
	bat.currentTime = 0;
	bat.play();

	up_box.style.transition = "1s";
	up_box.style.opacity = "0";
	level = 1;
	setTimeout(function(){
		up_box.style.display = "none";
		
		game.style.display = "flex";
		up_box.style.transition = "";
		start_game();
	},1000);
};


function stat(){ //игра окончена
	var bb = "Очки: " + counts + "<br>";
	var cc = "Сферы: " + sphere_kill + "<br>";
	var dd = "Чёрные дыры: " + boss_kill + "<br><br>";
	var ee = "Пройдено: " + Math.round(counts / 16) + "%";

	box_stat.innerHTML = bb + cc + dd + ee;
	up_box.style.display = "flex";
	up_box.style.transform = "scale(1.3)";
	game.style.filter = "grayscale(1)";
	setTimeout(function(){
		game.style.opacity = 0;
		count_box.style.opacity = 0;
	},600);
	setTimeout(function(){
		game.style.display = "none";
		game.style.opacity = "1";
		game.style.filter = "";

		up_box.style.opacity = "1";
		up_box.style.transform = "";
		up_box.style.animation = "back_res 10s infinite ease-in-out";
		
	},1200);
}


//ect_______________________________________
//создаёт круговой след на поле когда кликаешь
document.addEventListener('mousemove', function(event) {
	document.body.onclick = function(){
		var elem = document.createElement('div');
		if (game.style.display == !"none"){
			elem.style.marginLeft = event.clientX + "px";
			elem.style.marginTop = event.clientY + "px";
			elem.className = "clich";
			game.insertBefore(elem, game.firstElementChild);
			setTimeout(function(){
				elem.remove();
			},2000);
		}
		
	}
	
});

//при вызове, показывает обратный отсчёт указанный в "a"
var rcc = true; //переключатель для функции - revers_court(a)
function revers_court(a){
	if (rcc){
		rcc = false;
		gogogo.innerHTML = "";
		var i = a;
			go_box.style.display = "";
			gogogo.style.opacity = 1;
			gogogo.innerHTML = a + "c";
			var stop_me = setInterval(function(){
			i--;
			gogogo.innerHTML = i + "c";
			
			if(i <= 0){
				gogogo.innerHTML = "Вперед!";
				gogogo.style.opacity = 0;
				clearTimeout(stop_me);
				setTimeout(function(){
						go_box.style.display = "none";
					setTimeout(function(){
						rcc = true;
					},1000);
				},1000);
			}
		},1000);
	} else {
		gogo.innerHTML = "";
		var i = a;
			go_box.style.display = "";
			gogo.style.opacity = 1;
			gogo.innerHTML = a + "c";
			var stop_me = setInterval(function(){
			i--;
			gogo.innerHTML = i + "c";
			
			if(i <= 0){
				gogo.innerHTML = "Вперед!";
				gogo.style.opacity = 0;
				clearTimeout(stop_me);
				setTimeout(function(){
						go_box.style.display = "none";
				},1000);
			}
		},1000);
	}	
}

//временная блокировка действий
function z_block(a){
	back.style.zIndex = "9999"; //блокируем действия 
	setTimeout(function(){
		back.style.zIndex = ""; //разблокируем действия 
	}, (a*1000));
}
//центрирование системы
function sphera_sistem_center(){
		wave.style.marginLeft = ((document.documentElement.clientWidth-100)/2) + "px";
		wave.style.marginTop = ((document.documentElement.clientHeight-100)/2) + "px";
		for(i = 0; i < round.length; i++){
			round[i].style.marginLeft = ((document.documentElement.clientWidth-100)/2) + "px";
			round[i].style.marginTop = ((document.documentElement.clientHeight-100)/2) + "px";
		}
}


//добавление и удаление оповещания при попадании по сфере
function add_kill(){
	//добавление стилей и очки
		count.innerHTML = counts + " очков"; //добавление в боксе очков
		count.style.color = "#c7b71e"; //оповещение цветом в блоке очков
		w_count.style.opacity = .9; //появление индикатора на сфере
		if (level != 0){
			w_count.innerHTML = (10 - sphere_kill_level); //показывает на сфере убитые 
		} else {
			w_count.innerHTML = sphere_kill_level; //показывает на сфере убитые
		}
		

		grad.style.opacity = .5;
		wave.style.background = "#c7b71e";
		wave.style.boxShadow = "0 0 120px 5px #c7b71e";
		moon.style.background = "#c7b71e";
		for(i = 0; i < in_round.length; i++){
			in_round[i].style.background = "#c7b71e";
			in_round[i].style.boxShadow = "0 0 90px 0 #c7b71e";
		}

		//возврат стилей
		setTimeout(function(){ 
			count.style.color = ""; //
			w_count.style.opacity = 0;
			grad.style.opacity = "";
			wave.style.background = "";
			wave.style.boxShadow = "";
			moon.style.background = "";
			for(i = 0; i < in_round.length; i++){
				in_round[i].style.background = "";
				in_round[i].style.boxShadow = "";
			}
		},600);	
};

//
function delete_sistem(){
	//делает прозрачным шары
		count_box.style.opacity = 0;

		kill.style.opacity = 0;
		wave.style.opacity = 0;
		for(i = 0; i < round.length; i++){
			round[i].style.opacity = 0; 
		}

	//через секунду убирает шары
		setTimeout(function(){ 
			kill.style.display = "none";
			wave.style.display = "none";
			for(i = 0; i < round.length; i++){
				round[i].style.display = "none";
			}

		},1000);

	};

//	
function delete_boss(){
	black_hole.style.opacity = 0;
	setTimeout(function(){
		black_hole.style.display = "";

	},500);
};
	

//перевставляет в тёмную область
function boss_count(){
	count_box.style.opacity = "1";
	time.innerHTML = boss_time +"с";
};

//
function get_boss(){
			//ставит в центр чёрную дыру
			var a = (document.documentElement.clientWidth-60)/2;
			var b = (document.documentElement.clientHeight-60)/2;
			black_hole.style.marginLeft = a + "px";
			black_hole.style.marginTop = b + "px";

			//добавляет чёрную дыру и делает видидимой (через секунду)
			black_hole.style.display = "flex";
			setTimeout(function(){
				black_hole.style.opacity = 1; 
			},3000);
			
			//меняет положение каждых 0.5с
			inter = setInterval(function(){
				
				var a = Math.round((Math.random()*(document.documentElement.clientWidth-60)));
				var b = Math.round((Math.random()*(document.documentElement.clientHeight-60)));
				black_hole.style.marginLeft = a + "px";
				black_hole.style.marginTop = b + "px";
			},500);
		};
function re_background(a){ //принимает 1 или 2 в соответствии с картинками
		back.style.background = "url(dll/back"+ a +".jpg)";//меняет фоновую картинку
		back.style.backgroundSize = "cover";//делает её расширяемой
	};

function get_new_level(){
		
		wave.style.display = "";
		for(i = 0; i < round.length; i++){
				round[i].style.display = "";
			}
			sphera_sistem_center();

			setTimeout(function(){
				count_box.style.opacity = 1;
				kill.style.display = "";
				kill.style.opacity = 1;
				wave.style.opacity = 1;
				for(i = 0; i < round.length; i++){
					round[i].style.opacity = "";
				}
			},3000);
	};

//анимация сфер и другие события
(function(){
	var r = {a: 110, b: 230, c: 0, d: 0};
	setInterval(function(){
		r.a+=6;
		r.b+=2.5;
		r.c-=8;
		r.d-=10;
		in_round[0].style.transform = "rotate(" + r.a + "deg)";
		in_round[1].style.transform = "rotate(" + r.b + "deg)";
		in_round[2].style.transform = "rotate(" + r.c + "deg)";
		moon.style.transform = "rotate(" + r.d + "deg)";
	},100);
	//доп.круги становятся не выидимыми с быстрым переходом
	
	sphera_sistem_center(); //центрование системы сфер
	game.style.display = "none";

}());
//начало игры
function start_game(){
get_new_level();
	//пред. события
	game.style.display = "";
	for(i = 0; i < round.length; i++){
		round[i].style.opacity = 0;
		round[i].style.transition = "0s";
	}

	back.style.zIndex = "9999"; //блокируем действия (разблочится через 1.5с)
	wave.style.filter = "blur(500px)"; //для перехода
	wave.style.background = "#fff"; //для перехода
	wave.style.boxShadow = "0 0 120px 5px #fff"; //для перехода
	if(level != 0){
		setTimeout(function(){
			level_m.play();
		},1000);
	}
	revers_court(3); //обратный отсчёт
	//возврат кружкам транзишн, видимость. основному кругу фильтр, тени, прозрачность
	setTimeout(function(){
		round[0].style.transition = "";
		round[1].style.transition = "";
		round[2].style.transition = "";
		round[0].style.opacity = "";
		round[1].style.opacity = "";
		round[2].style.opacity = "";

		wave.style.display = "";
		wave.style.filter = "";
		wave.style.boxShadow = "";
		wave.style.opacity = ".8";
		wave.style.background = "";

		back.style.zIndex = ""; //отморозка передвижений
		count_box.style.opacity = 1; //появление счётчика
		start_level()//врубаем уровень

		

	},3000);

};
//начало уровня
function start_level(){

	switch(level){
		case 0: count.style.display = "none";
				level_count.innerHTML = "Cвободная игра";
				level_time = 0;
				time.innerHTML = level_time + "с";
				kill.innerHTML = "Поймано " + sphere_kill_level;
		break;
		case 1: counts = 0;
				level_time = 30; 
				cost_level = 5;
				boss_time = 10; 
				cost_boss = 50;
				sphere_kill = 0; 
				sphere_kill_level = 0;
				boss = 1;
				boss_kill = 0; 
				end_bh = false;
				goout = true;
				
				level_count.innerHTML = "Уровень " + level;
				count.innerHTML = sphere_kill + " очков";
				kill.innerHTML = "Поймано " + sphere_kill_level + " из 10";
				time.innerHTML = level_time + "с";
		break; 
		case 2: level_time = 25; cost_level = 10;
				boss_time = 9;  cost_boss = 100;
				back.style.transform = "";
		break; 
		case 3: level_time = 20; cost_level = 15;
				boss_time = 8; cost_boss = 150;
				back.style.transform = "";
		break; 
		case 4: level_time = 15; cost_level = 20;
				boss_time = 7; cost_boss = 200;
				back.style.transform = "";
		break; 
		case 5: level_time = 10; cost_level = 30;
				boss_time = 5; cost_boss = 300;
				back.style.transform = "";
		break; 
	}	
		timer_zone.style.animation = "t_z " + level_time + "s ease-out";
		level_int = setInterval(function(){
		time.innerHTML = level_time + "с";
		if(level > 0){
			level_time--;
		} if (level == 0){
			level_time++;
		}
		
		if(level_time == -1){
			timer_zone.style.animation = "";
			if(goout){
				to_menu();
			}
				clearTimeout(level_int);
				clickF.play();
				stat();
				stop_audio(level_m);
				fall.play();
		}
	},1000);
}






var w_b = wave.getBoundingClientRect().left;
	var h_b = wave.getBoundingClientRect().top;


//ИГРА______________________________________________________________________________
/*start_game();*/ //запуск игры по этой функции


//onmouseover = при попадании курсора в поле круга_______
function go(){
	var w_b = wave.getBoundingClientRect().left;
	var h_b = wave.getBoundingClientRect().top;
	goout = false;
	go_to.currentTime = 0;
	var width = Math.abs(a - w_b);
	var height = Math.abs(b - h_b);
	if(width >= 1000 || height >= 1000){
		go_to3.play();
	} else if(width >= 500 || height >= 500){
		go_to2.play();
	} else {
		go_to.play();
	}

	//убегание и добавление размаза главной сферы
	var a = Math.round((Math.random()*(document.documentElement.clientWidth-100)));
	var b = Math.round((Math.random()*(document.documentElement.clientHeight-100)));
	wave.style.marginLeft = a + "px";
	wave.style.marginTop = b + "px";
	wave.style.filter = "blur(3px)";

	
	//убегание и добавление размаза доп. сфер
	for(i = 0; i < round.length; i++){
		round[i].style.marginLeft = a + "px";
		round[i].style.marginTop = b + "px";
		round[i].style.filter = "blur(30px)";
	}

	// очистка эффекта размаза (через 0.3с)
	setTimeout(function(){
		wave.style.filter = "";
		for(i = 0; i < round.length; i++){
			round[i].style.filter = "";
		}
	},300);
}// go()
	



//onmousedown = при попадании__________
function pioo(){ 
		ball_click.currentTime = 0;
		ball_click.play();

		counts += cost_level; //+n очков уровня к общим очкам
		sphere_kill++; //прибавление пойманых сфер
		sphere_kill_level++; //прибавление пойманых сфер на уровне
		if(level != 0){
		kill.innerHTML = "Поймано " + sphere_kill_level + " из 10"; //указание в блоке
		} else {
			kill.innerHTML = "Поймано " + sphere_kill_level;
		}
		add_kill();
		//убегание и добавление размаза главной сферы
	var a = Math.round((Math.random()*(document.documentElement.clientWidth-100)));
	var b = Math.round((Math.random()*(document.documentElement.clientHeight-100)));
	wave.style.marginLeft = a + "px";
	wave.style.marginTop = b + "px";
	wave.style.filter = "blur(3px)";

	
	//убегание и добавление размаза доп. сфер
	for(i = 0; i < round.length; i++){
		round[i].style.marginLeft = a + "px";
		round[i].style.marginTop = b + "px";
		round[i].style.filter = "blur(30px)";
	}

		
if(level != 0){
//если словил 10 шаров______________________________________
	if(sphere_kill_level == 10 && level < 6){ 
		clickT.play();
		timer_zone.style.animation = "";
		stop_audio(level_m);
		end_bh = false;//отключает автопобеду
		clearTimeout(level_int);//убирает отсчёт уровня
		delete_sistem();//убирает систему и левое меню
		
		z_block(3); //заблокированы все действия (3 секунды)
		back.style.transform = "scale(1.5)";
		re_background(2);//меняем картинку на 2
		revers_court(3); //отсчёт (3 секунды)

		

/*нач*/	get_boss();//получаем боса
		
		setTimeout(function(){
			boss_m.play();
		},2000);
		bl_time.innerHTML = time.innerHTML = boss_time + "c";
		
		setTimeout(function(){

			back.style.transform = "";
			level_count.innerHTML = "Чёрная дыра " + level;
			boss_count(); //возвращаем и добавляем статистику слева к боссу
			timer_zone.style.animation = "t_z " + boss_time + "s ease-out";
			//изменения каждую секунду
				interval_tb = setInterval(function(){
					
				boss_time--;
				bl_time.innerHTML = time.innerHTML = boss_time + "c"; //отнимает время, записывая в чёрную дыру
			//если время вышло__________
				if(boss_time <= 0){
					if(end_bh == true){
					} else {
						black(false); //если нет, тогда вызывается функция с аргументом "false"
					}
				}
			},1000);

		},3000);//чёрная дыра
	}//главный if
}//если не 0
}



//конец игры с чёрной дырой (принимает булевское значение)
function black(a){
	timer_zone.style.animation = "";
	stop_audio(boss_m);
	z_block(3);//блокировка действий
	clearTimeout(inter); //очищает интервал передвижений
	clearTimeout(interval_tb); //очищает интервал реверсного отсчёта
	count_box.style.opacity = 0; //левый блок невидимый
	//если выигрыш
	if (a) {
		clickT.play();
		counts += cost_boss;
		boss_kill++;
		count.style.color = "#c7b71e";
		count.style.fontSize = "26px";
		count.innerHTML = counts + " очков";
		grad.style.opacity = .3;

		setTimeout(function(){
			grad.style.opacity = "";
			count.style.fontSize = "";
			count.style.color = "";
		},500);
	} else {
		clickF.play();
	}
	end_bh = true; //переключалка
	//отключение стилей
	delete_boss();//удаляем боса


	if(level == 5){
		fall.play();
		up_box.style.background = "url(dll/up_box2.jpg)";
		up_box.style.backgroundSize = "cover";
		game_id.innerHTML = "Победа!";
		stat();
		reload.style.display= "none";
	} else {

		level++;
		back.style.transform = "scale(1.5)";
		re_background("");//возвращаем первый фон
		revers_court(3); //обратный отсчёт
		get_new_level(); //получаем новый уровень
		level_m.play();
		setTimeout(function(){

			sphere_kill_level = 0; //присвоение
			kill.innerHTML = "Поймано " + sphere_kill_level + " из 10"; //указание в блоке
			level_count.innerHTML = "Уровень " + level;
			start_level(); //новый уровень
			
		},2000);
	}
	
	
}; //black(a);


