let currentActiveIndex = 0;  // Начнем с первой планеты как активной
const planets = document.querySelectorAll('.planet');
const circleMenu = document.getElementById('circleMenu');
const planetCount = planets.length;
const angleIncrement = 360 / planetCount; // Угол для вращения каждой планеты
let rotationAngle = 0; // Начальный угол вращения

const planetInfo = [
    {
        name: "Kepler-186f",
        star: "Kepler-186",
        type: "Суперземля",
        distance: "примерно 500 световых лет",
        discovered: 2014,
        description: "Kepler-186f считается первой экзопланетой, которая была найдена в зоне обитаемости, аналогичной Земле. Планета примерно на 10% больше Земли и находится на оптимальном расстоянии от своей звезды, чтобы позволить существование жидкой воды.",
        interestingFacts: "Kepler-186f обращается вокруг своей звезды за 130 дней.",
        interestingFacts1:"Условия на планете, вероятно, имеют значительные различия по сравнению с Землёй, из-за того что звезда является красным карликом."
        
    },
    {
        name: "Проксима Центавра b",
        star: "Проксима Центавра",
        type: "Суперземля",
        distance: "примерно 4.24 световых года",
        discovered: 2016,
        description: "Проксима Центавра b — это экзопланета, находящаяся в зоне обитаемости своей звезды, что делает ее потенциальным кандидатом для существования жизни. Она примерно в 1.17 раза больше Земли и вращается вокруг красного карлика Проксима Центавра. Поскольку звезда менее яркая, чем Солнце, температура на поверхности планеты может позволить существование жидкой воды.",
        interestingFacts: "Планета подвержена сильному радиационному воздействию из-за активных выбросов от своей звезды.",
        interestingFacts1: "Несмотря на свое расположение в зоне обитаемости, условия на поверхности могут быть очень агрессивными."
    },
    {
        name: "TRAPPIST-1e",
        star: "TRAPPIST-1",
        type: "Суперземля",
        distance: "примерно 40 световых лет",
        discovered: 2017,
        description: "TRAPPIST-1e — одна из семи экзопланет, обнаруженных в системе TRAPPIST-1. Она находится в зоне обитаемости своей звезды и имеет размер, близкий к Земле, что делает ее одной из наиболее изучаемых экзопланет. Система TRAPPIST-1 состоит из трёх планет, находящихся в зоне обитаемости, что увеличивает шансы на наличие воды.",
        interestingFacts: "Все планеты системы TRAPPIST-1 находятся близко друг к другу, что делает возможным изучение их атмосферы.",
        interestingFacts1:  "Научные исследования предполагают, что на TRAPPIST-1e могут существовать условия, благоприятные для жизни."
    },
    {
        name: "LHS 1140 b",
        star: "LHS 1140",
        type: "Суперземля",
        distance: "примерно 40 световых лет",
        discovered: 2017,
        description: "LHS 1140 b находится в зоне обитаемости своей звезды и имеет массу, в четыре раза превышающую массу Земли. Это делает её интересным объектом для изучения атмосферы и потенциальных условий для жизни.",
        interestingFacts: "Ученые надеются, что дальнейшие наблюдения позволят изучить состав атмосферы этой экзопланеты.",            
        interestingFacts1: "Это одна из немногих экзопланет, которая имеет достаточную яркость для изучения с помощью текущих и будущих телескопов."
    },
    {
        name: "HD 209458 b",
        star: "HD 209458",
        type: "Горячий юпитер",
        distance: "примерно 159 световых лет",
        discovered: 1999,
        description: "HD 209458 b — первая экзопланета, у которой была обнаружена атмосфера. Она также известна под прозвищем 'Освобожденный Юпитер', поскольку её высокая температура и близкое расположение к звезде делают её уникальной среди других экзопланет.",
        interestingFacts: "Это была первая экзопланета, чью атмосферу удалось изучить с помощью транзитного метода.",
        interestingFacts1: "Научные исследования показали наличие углеродной и водяной пар в атмосфере планеты."
    }
];

const dropdown = document.querySelector('.dropdown-content');
const descItem = document.getElementById('desc');

descItem.addEventListener('mouseenter', () => {
    dropdown.style.display = 'block'; // Показываем меню при наведении
});

descItem.addEventListener('mouseleave', () => {
    dropdown.style.display = 'none'; // Скрываем меню, когда мышь уходит
});

document.addEventListener('click', (event) => {
    if (!descItem.contains(event.target)) {
        dropdown.style.display = 'none'; // Скрываем меню, если клик вне его
    }
});

document.querySelectorAll('.dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function rotateMenu(direction) {
    if (!planets[currentActiveIndex]) {
        console.error('Элемент с индексом currentActiveIndex не найден');
        return;
    }

    planets[currentActiveIndex].classList.remove('active');
    currentActiveIndex = (currentActiveIndex + direction + planetCount) % planetCount;
    planets[currentActiveIndex].classList.add('active');

    updatePlanetInfo();

    updatePlanetsPosition();
    
    if (circleMenu) {
        rotationAngle -= direction * angleIncrement;
        circleMenu.style.transform = `rotate(${rotationAngle}deg)`;
    } else {
        console.error('circleMenu не найден');
    }
}

function updatePlanetInfo() {
    const section1 = document.querySelector('.section1');
    section1.innerHTML = `
        <h2>${planetInfo[currentActiveIndex].name}</h2>
        <p><strong>Звезда:</strong> ${planetInfo[currentActiveIndex].star}</p>
        <p><strong>Тип:</strong> ${planetInfo[currentActiveIndex].type}</p>
        <p><strong>Расстояние от Земли:</strong> ${planetInfo[currentActiveIndex].distance}</p>
        <p><strong>Открыта:</strong> ${planetInfo[currentActiveIndex].discovered} год</p>
        <p><strong>Описание планеты:</strong>${planetInfo[currentActiveIndex].description}</p>
        <li><strong>Факт №1:</strong>${planetInfo[currentActiveIndex].interestingFacts}</li>
        <li><strong>Факт №2:</strong>${planetInfo[currentActiveIndex].interestingFacts1}</li>
    `;
}

function updatePlanetsPosition() {
    const planetPositions = [
        { x: 1000, y: 0, z: 0, scale: 1.1 },
        { x: 300, y: -200, z: -50, scale: 0.7 },
        { x: -300, y: -200, z: -50, scale: 0.7 },
        { x: -1000, y: 0, z: 0, scale: 1.1 },
        { x: 0, y: 150, z: 200, scale: 1.5 }
    ];

    planets.forEach((planet, index) => {
        let offsetIndex = (index - currentActiveIndex + planetCount) % planetCount;
        const { x, y, z, scale } = planetPositions[offsetIndex];
        planet.style.transform = `translate(${x}px, ${y}px) translateZ(${z}px) scale(${scale})`;
        
        planet.style.opacity = offsetIndex === 4 ? 1 : 0.3;
    });
}

function showMethod(method) {
    // Скрыть все содержимое методов
    let methodContents = document.querySelectorAll('.method-content');
    methodContents.forEach(function(content) {
        content.classList.remove('show');
        content.style.display = 'none'; // Скрываем с помощью display
    });

    // Показать выбранный метод с анимацией
    let selectedMethod = document.getElementById(method);
    selectedMethod.style.display = 'block'; // Показываем блок
    setTimeout(function() {
        selectedMethod.classList.add('show'); // Запускаем анимацию
    }, 10); // Задержка для запуска анимации после изменения display
}


var boxshadow = "";

for(var i = 0; i <= 3000; i++){
    px = Math.random() < 0.5 ? "-" : "";
    py = Math.random() < 0.5 ? "-" : "";
    x = Math.floor((Math.random() * window.innerWidth) + 1);
    y = Math.floor((Math.random() * window.innerHeight) + 1);
    s = Math.floor((Math.random() * 2) - 1);
    boxshadow += px+x+"px "+py+y+"px 0 "+s+"px #fff,";
}

boxshadow = boxshadow.slice(0, -1);

stars.style.boxShadow = boxshadow;

updatePlanetsPosition();
updatePlanetInfo();
