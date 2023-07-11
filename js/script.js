// let menu = document.querySelector('#menu-btn');
// let header = document.querySelector('.header');

// menu.onclick = () =>{
// menu.classList.toggle('fa-times');
// header.classList.toggle('active');
// }

// window.onscroll = () =>{
// menu.classList.remove('fa-times');
// header.classList.remove('active');
// }

// --------------------START - Light-Dark theme Script ---------------
let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () => {
    themeToggler.classList.toggle('fa-sun');
    if (themeToggler.classList.contains('fa-sun')) {
        document.body.classList.add('active');
    } else {
        document.body.classList.remove('active');
    }
}

// --------------------START - Half Round ProgressBar Script ---------------
// $(document).ready(function () {
//     $(".halfR-progress").each(function () {
//         var $bar = $(this).find(".halfRbar");
//         var $val = $(this).find("span");
//         var perc = parseInt($val.text(), 10);
//         $({ p: 0 }).animate({ p: perc }, {
//             duration: 3000,
//             easing: "swing",
//             step: function (p) {
//                 $bar.css({
//                     transform: "rotate(" + (45 + (p * 1.8)) + "deg)", // 100%=180° so: ° = % * 1.8
//                     // 45 is to add the needed rotation to have the green borders at the bottom
//                 });
//                 $val.text(p | 0);
//             }
//         });
//     });
// });
// --------------------END - Half Round ProgressBar Script ---------------

// =============================================================== Typing Text START -------------------------------------
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 1500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
// =============================================================== Typing Text END -------------------------------------