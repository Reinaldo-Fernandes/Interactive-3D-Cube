const cube = document.getElementById('cube');
const message = document.getElementById('message');
const scene = document.querySelector('.scene');

let rotationX = 0;
let rotationY = 0;
let isPaused = false;
let autoRotate;
let initialTouchX = 0;
let initialTouchY = 0;

// Função para iniciar a rotação automática do cubo
function startAutoRotate() {
    autoRotate = setInterval(() => {
        if (!isPaused) {
            rotationY += 1;
            rotationX += 0.5;
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        }
    }, 30);
}

// Inicia a rotação automática
startAutoRotate();

cube.addEventListener('click', function() {
    pauseAndAlignCube();
});

cube.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    initialTouchX = touch.clientX;
    initialTouchY = touch.clientY;
});

cube.addEventListener('touchmove', function(e) {
    if (isPaused) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - initialTouchX;
    const deltaY = touch.clientY - initialTouchY;

    rotationY += deltaX * 0.1;
    rotationX -= deltaY * 0.1;

    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    // Atualiza os valores iniciais
    initialTouchX = touch.clientX;
    initialTouchY = touch.clientY;
});

function pauseAndAlignCube() {
    isPaused = true;
    clearInterval(autoRotate);

    const faceIndex = Math.floor(Math.random() * 6);
    switch (faceIndex) {
        case 0: rotationX = 0; rotationY = 0; break; // Frente
        case 1: rotationX = 0; rotationY = 180; break; // Trás
        case 2: rotationX = 0; rotationY = -90; break; // Esquerda
        case 3: rotationX = 0; rotationY = 90; break; // Direita
        case 4: rotationX = -90; rotationY = 0; break; // Cima
        case 5: rotationX = 90; rotationY = 0; break; // Baixo
    }

    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    message.classList.remove('hidden');
    message.style.opacity = '1';

    setTimeout(() => {
        isPaused = false;
        message.style.opacity = '0';
        startAutoRotate();
    }, 3000);

    document.addEventListener("DOMContentLoaded", function() {
    const cube = document.getElementById("cube");
    const descriptions = document.querySelectorAll(".description");

    // Função para detectar a face visível
    function showDescription(face) {
        descriptions.forEach(description => {
            if (description.getAttribute("data-face") === face) {
                description.classList.remove("hidden");
            } else {
                description.classList.add("hidden");
            }
        });
    }

    // Detectar a face do cubo após a transição
    cube.addEventListener("transitionend", function() {
        const transformMatrix = getComputedStyle(cube).transform;
        const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');
        const rotateX = Math.round(Math.atan2(matrixValues[6], matrixValues[10]) * (180 / Math.PI));
        const rotateY = Math.round(Math.atan2(matrixValues[1], matrixValues[0]) * (180 / Math.PI));

        if (rotateY === 0 && rotateX === 0) showDescription("front");
        else if (rotateY === 180) showDescription("back");
        else if (rotateY === 90) showDescription("right");
        else if (rotateY === -90) showDescription("left");
        else if (rotateX === 90) showDescription("top");
        else if (rotateX === -90) showDescription("bottom");
    });
});

}
