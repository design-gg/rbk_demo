// =========================================================
// КОНТУР "ВЫСТАВКА-ОТКРЫТИЕ"
// =========================================================

var exhibition = document.querySelector(".exhibition");
var svg = document.querySelector(".exhibition-outline");
var outline = document.querySelector(".outline-path");

var w = exhibition.offsetWidth;
var h = exhibition.offsetHeight;

svg.setAttribute("viewBox", "0 0 " + w + " " + h);

outline.setAttribute("x", 0.5);
outline.setAttribute("y", 0.5);
outline.setAttribute("width", w - 1);
outline.setAttribute("height", h - 1);
outline.setAttribute("rx", h / 2);
outline.setAttribute("ry", h / 2);

var length = outline.getTotalLength();

gsap.set(outline, {
    strokeDasharray:length,
    strokeDashoffset:length
});

// =========================================================
// МАСШТАБИРУЕМ >950
// =========================================================

var scalable = document.querySelectorAll(
    ".gazprom, .presents, .location, .support, .legal, .age"
);

var banner = document.querySelector("#banner");
var brandArt = document.querySelector(".brand-art");

scalable.forEach(function(el){
    el.dataset.baseWidth = el.offsetWidth;
});


function updateScale(){

    var w = banner.clientWidth;
    var h = banner.clientHeight;

    /* основные коэффициенты */
    var scaleX = Math.min(w / 1060, 1);
    var scaleY = Math.min(h / 1400, 1);

    /* отдельные коэффициенты групп */
    var gazpromScale = scaleX;
    var infoScale = scaleX;
    var legalScale = scaleX;

    if(w <= 425){
        gazpromScale = scaleX * 2; /* Газпром + представляет */
        infoScale = scaleX * 1.8;    /* локация + поддержка */
        legalScale = scaleX * 1.4;    /* legal + age */        
    }

    banner.style.setProperty("--sx", scaleX);
    banner.style.setProperty("--sy", scaleY);

    scalable.forEach(function(el){

        var scale = scaleX;

        if(el.classList.contains("gazprom") || el.classList.contains("presents")){
            scale = gazpromScale;
        }

        if(el.classList.contains("location") || el.classList.contains("support")){
            scale = infoScale;
        }
    
        if(el.classList.contains("legal") || el.classList.contains("age")){
            scale = legalScale;
        }        

        el.style.width = (el.dataset.baseWidth * scale) + "px";
    });

    /* Энергия недр + кнопка */
    brandArt.style.transform = "scale(" + scaleX + ")";
}

updateScale();

window.addEventListener("resize", updateScale);


// =========================================================
// ОСНОВНОЙ TIMELINE
// Проигрывается только один раз
// =========================================================

var tl = gsap.timeline();

tl

// ---------------------------------------------------------
// ФОТО
// ---------------------------------------------------------

.from(".photo", {
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: "power2.out"
}, 0)


// ---------------------------------------------------------
// ГАЗПРОМ НЕФТЬ
// ---------------------------------------------------------

.from(".gazprom", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "sine.inOut"
}, 0.5)


// ---------------------------------------------------------
// ПРЕДСТАВЛЯЕТ
// ---------------------------------------------------------

.from(".presents", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "sine.inOut"
}, 0.7)


// ---------------------------------------------------------
// ЭНЕРГИЯ НЕДР
// ---------------------------------------------------------

.from(".logo", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "sine.inOut"
}, 0.9)


// ---------------------------------------------------------
// ВЫСТАВКА-ОТКРЫТИЕ — ТЕКСТ
// ---------------------------------------------------------

.from(".exhibition-text", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
}, 1.4)


// ---------------------------------------------------------
// ПРОРИСОВКА КОНТУРА
// ---------------------------------------------------------

.to(outline, {
    strokeDashoffset: 0,
    duration: 1.3,
    ease: "power2.inOut"
}, 1.6)


// ---------------------------------------------------------
// ХАНТЫ-МАНСИЙСК
// ---------------------------------------------------------

.from(".location", {
    opacity: 0,
    y: 15,
    duration: 0.8,
    ease: "sine.inOut"
}, 1.8)


// ---------------------------------------------------------
// ПРИ ПОДДЕРЖКЕ
// ---------------------------------------------------------

.from(".support", {
    opacity: 0,
    y: 15,
    duration: 0.8,
    ease: "sine.inOut"
}, 2.0)


// ---------------------------------------------------------
// МАРКИРОВКА
// ---------------------------------------------------------

.from(".legal", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
}, 2.4)


// ---------------------------------------------------------
// 6+
// ---------------------------------------------------------

.from(".age", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
}, 2.4);
