// === Полтергейст для всіх сторінок ===

// створюємо елемент
const ghost = document.createElement("div");
ghost.id = "poltergeist";
document.body.appendChild(ghost);

// рандомна позиція в межах екрану
function moveGhostRandom(fast = false) {
    const margin = 80;
    const randX = Math.random() * (window.innerWidth - margin);
    const randY = Math.random() * (window.innerHeight - margin);

    ghost.style.left = randX + "px";
    ghost.style.top = randY + "px";

    if (fast) {
        ghost.classList.add("dash");
        setTimeout(() => ghost.classList.remove("dash"), 250);
    }
}

// тікає коли натискаєш
ghost.addEventListener("click", () => moveGhostRandom(true));

// початковий рух
setTimeout(moveGhostRandom, 800);

// періодичне плавне “літання”
setInterval(moveGhostRandom, 6000);

// Масив для зберігання аномалій
let orbs = [];

// Генерація випадкового числа
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// Функція створення аномалії
function spawnOrb() {
    const arena = document.getElementById("arena");

    const orb = document.createElement("div");
    orb.classList.add("orb");

    // Початкова позиція
    orb.style.left = rand(0, arena.clientWidth - 35) + "px";
    orb.style.top = rand(0, arena.clientHeight - 35) + "px";

    // Швидкість
    orb.dx = rand(-2, 2);
    orb.dy = rand(-2, 2);

    arena.appendChild(orb);
    orbs.push(orb);
}

// Рух аномалій
function animate() {
    const arena = document.getElementById("arena");

    orbs.forEach(orb => {
        let x = parseFloat(orb.style.left);
        let y = parseFloat(orb.style.top);

        x += orb.dx;
        y += orb.dy;

        // Стінки
        if (x <= 0 || x >= arena.clientWidth - 35) orb.dx *= -1;
        if (y <= 0 || y >= arena.clientHeight - 35) orb.dy *= -1;

        orb.style.left = x + "px";
        orb.style.top = y + "px";
    });

    requestAnimationFrame(animate);
}

// Очистка арени
function clearOrbs() {
    const arena = document.getElementById("arena");
    orbs.forEach(orb => arena.removeChild(orb));
    orbs = [];
}

// Старт анімації
animate();