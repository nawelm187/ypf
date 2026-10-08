function scrollToPosition() {
    var startY = window.pageYOffset; // Posición actual de desplazamiento vertical
    var stopY = 1750; // Posición a la que quieres desplazarte
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    var speed = Math.round(distance / 100); // Velocidad del desplazamiento en pixels por milisegundo
    if (speed >= 20) speed = 20; // Límite superior de velocidad

    var step = Math.round(distance / 25); // Número de pasos para alcanzar el destino
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;

    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (var j = startY; j > stopY; j -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}

waitForElm("#c_ph2").then((elm) => {
    elm.style.position = "relative"
    let span = document.createElement("span")
    span.classList.add("flecha-home")
    span.addEventListener("click", (e) => {
        scrollToPosition();
    })
    elm.appendChild(span)
})

function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector))
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector))
                observer.disconnect()
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}

var wrap = function (toWrap, wrapper) {
    wrapper = wrapper || document.createElement("div")
    toWrap.parentNode.appendChild(wrapper)
    return wrapper.appendChild(toWrap)
}
