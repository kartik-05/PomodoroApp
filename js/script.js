const setting_button = document.querySelector('.settings');
const modal_bg = document.querySelector('.modal-bg');
const close_modal = document.querySelector('.fa-times');

const pomodoro = document.querySelector('.pomodoro-input');
const short_break = document.querySelector('.shortBreak-input');
const long_break = document.querySelector('.longBreak-input');
const apply_button = document.querySelector('.apply');

const nav = document.querySelector('.nav');
const pomodoroNav = document.querySelector('.pomodoro');
const shortBreakNav = document.querySelector('.short-break');
const longBreakNav = document.querySelector('.long-break');


const start_pause = document.querySelector('.pause');

const circle=document.getElementById("circle_2");

var pomodoro_val = pomodoro.value;
var shortBreak_val = short_break.value;
var longBreak_val = long_break.value;

var current_time = Date.parse(new Date());

var new_time_pomodoro = new Date(current_time + pomodoro_val * 60 * 1000);
var new_time_shortBreak = new Date(current_time + shortBreak_val * 60 * 1000);

var new_time_longBreak = new Date(current_time + longBreak_val * 60 * 1000);




// event listners :

setting_button.addEventListener("click", () => {
    modal_bg.classList.add('bg-active');
});

close_modal.addEventListener("click", () => {
    modal_bg.classList.remove('bg-active');
});


apply_button.addEventListener("click", () => {

    pomodoro_val = pomodoro.value;
    shortBreak_val = short_break.value;
    longBreak_val = long_break.value;
});

start_pause.addEventListener("click", () => {
    if (start_pause.innerHTML === "S T A R T") {
        if (pomodoroNav.classList.contains("nav-active")) {
            if (!start_pause.classList.contains("start")) {
                start_pause.classList.add("start");

                current_time = Date.parse(new Date());
                new_time_pomodoro = new Date(current_time + pomodoro_val * 60 * 1000);

                run_clock('.time', new_time_pomodoro);

            }
            else {
                resume_clock();
            }
        start_pause.innerHTML = "P A U S E";

        }
        else if (shortBreakNav.classList.contains("nav-active")) {
            if (!start_pause.classList.contains("start")) {
                start_pause.classList.add("start");

                current_time = Date.parse(new Date());
                new_time_shortBreak = new Date(current_time + shortBreak_val * 60 * 1000);
                run_clock('.time', new_time_shortBreak);

            }
            else {
                resume_clock();
            }
            start_pause.innerHTML = "P A U S E";

        }
        else if (longBreakNav.classList.contains("nav-active")) {
            if (!start_pause.classList.contains("start")) {
                start_pause.classList.add("start");

                current_time = Date.parse(new Date());
                new_time_longBreak = new Date(current_time + longBreak_val * 60 * 1000);
                run_clock('.time', new_time_longBreak);
            }
            else {
                resume_clock();
            }
            start_pause.innerHTML = "P A U S E";

        }

    }
    else if (start_pause.innerHTML === "P A U S E") {
        pause_clock();
        start_pause.innerHTML = "S T A R T";

    }
});


nav.addEventListener("click", add_nav_active);


// functions ----------------------------------------

if (start_pause.innerText === "") {
    start_pause.innerHTML = "S T A R T";
}

function add_nav_active(event) {

    const e = event.target;


    if (e.classList[0] === "pomodoro") {


        if (e.classList.contains("nav-active")) {
            clearInterval(timeInterval);
            start_pause.classList.remove("start");

            current_time = Date.parse(new Date());
            new_time_pomodoro = new Date(current_time + pomodoro_val * 60 * 1000);
            run_clock('.time', new_time_pomodoro);
        }
        else {
            if (shortBreakNav.classList.contains("nav-active")) {
                shortBreakNav.classList.remove("nav-active");
                clearInterval(timeInterval);
            }
            if (longBreakNav.classList.contains("nav-active")) {
                longBreakNav.classList.remove("nav-active");
                clearInterval(timeInterval);
            }
            e.classList.add("nav-active");
            start_pause.classList.remove("start");
            start_pause.innerHTML="S T A R T";
            current_time = Date.parse(new Date());
            new_time_pomodoro = new Date(current_time + pomodoro_val * 60 * 1000);

            run_clock('.time', new_time_pomodoro);

        }
    }

    else if (e.classList[0] === "short-break") {
        if (e.classList.contains("nav-active")) {
            
            clearInterval(timeInterval);
            start_pause.classList.remove("start");

            current_time = Date.parse(new Date());
            new_time_shortBreak = new Date(current_time + shortBreak_val * 60 * 1000);
            run_clock('.time', new_time_shortBreak);

        }
        else {
            if (pomodoroNav.classList.contains("nav-active")) {
                pomodoroNav.classList.remove("nav-active");
                clearInterval(timeInterval);
            }
            if (longBreakNav.classList.contains("nav-active")) {
                longBreakNav.classList.remove("nav-active");
                clearInterval(timeInterval);
            }

            e.classList.add("nav-active");
            start_pause.classList.remove("start");
            start_pause.innerHTML="S T A R T";


            current_time = Date.parse(new Date());
            new_time_shortBreak = new Date(current_time + shortBreak_val * 60 * 1000);

            run_clock('.time', new_time_shortBreak);

        }
    }
    else if (e.classList[0] === "long-break") {
        if (e.classList.contains("nav-active")) {
            
            clearInterval(timeInterval);
            start_pause.classList.remove("start");

            current_time = Date.parse(new Date());
            new_time_longBreak = new Date(current_time + longBreak_val * 60 * 1000);
            run_clock('.time', new_time_longBreak);
        
        }
        else {
            if (pomodoroNav.classList.contains("nav-active")) {
                pomodoroNav.classList.remove("nav-active");
                clearInterval(timeInterval);
            }
            if (shortBreakNav.classList.contains("nav-active")) {
                shortBreakNav.classList.remove("nav-active");
                clearInterval(timeInterval);
            }
            e.classList.add("nav-active");
            start_pause.classList.remove("start");
            start_pause.innerHTML="S T A R T";


            current_time = Date.parse(new Date());
            new_time_longBreak = new Date(current_time + longBreak_val * 60 * 1000);

            run_clock('.time', new_time_longBreak);

        }
    }


}



//  count down timer : ------------------------------


function time_remaining(endTime) {
    var t = Date.parse(endTime) - Date.parse(new Date());

    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);

    return { 'total': t, 'minutes': minutes, 'seconds': seconds };
}

var timeInterval;

function run_clock(class_, endTime) {

    var element = document.querySelector(class_);

    function update_time() {

        var t = time_remaining(endTime);

        
        if (pomodoroNav.classList.contains("nav-active")) {
            percent=((t.total/(pomodoro_val*60*1000))*100);
    
        }
        else if (shortBreakNav.classList.contains("nav-active")) {
            percent=((t.total/(shortBreak_val*60*1000))*100);
    
        }
        else if (longBreakNav.classList.contains("nav-active")) {
            percent=((t.total/(longBreak_val*60*1000))*100);
    
        }
        
        circle.style.strokeDashoffset=696-(696*percent)/100;
        
        if (t.seconds < 10) {
            element.innerHTML = t.minutes + ':0' + t.seconds;

        }
        else
            element.innerHTML = t.minutes + ':' + t.seconds;

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }


    update_time();


    if (start_pause.classList.contains("start"))
    timeInterval = setInterval(update_time, 1000);
}

var time_left ;

function pause_clock() {
    clearInterval(timeInterval);
    if (pomodoroNav.classList.contains("nav-active")) {

        time_left=time_remaining(new_time_pomodoro).total;

    }
    else if (shortBreakNav.classList.contains("nav-active")) {
        time_left=time_remaining(new_time_shortBreak).total;

    }
    else if (longBreakNav.classList.contains("nav-active")) {
        time_left=time_remaining(new_time_longBreak).total;

    }

}


function resume_clock() {
    var new_time = new Date(Date.parse(new Date()) + time_left);
    run_clock('.time', new_time);
}



