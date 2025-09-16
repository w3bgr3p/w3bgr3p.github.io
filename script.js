// Ссылки на соцсети
const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/w3bgr3p', icon: 'fab fa-github' },
    { name: 'Youtube ', url: 'https://www.youtube.com/@w3bgr3p', icon: 'fab fa-youtube' },
    { name: 'Telegram dm', url: 'https://t.me/w3bgr3p', icon: 'fab fa-telegram' },
    { name: 'X', url: 'https://x.com/w3bgrep', icon: 'fab fa-x-twitter' },
];

const socialContainer = document.getElementById('social-links');
socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.name;
    a.target = '_blank';
    a.innerHTML = `<i class="${link.icon}"></i>`; // Иконка вместо текста
    socialContainer.appendChild(a);
});

// Ссылки на соцсети
const communityLinks = [
    { name: 'W3Zen discord', url: 'https://link.web3grep.xyz/W3Zen-Discord' },
    { name: 'W3Zen telegram', url: 'https://link.web3grep.xyz/w3zenCommunity' },
    { name: 'web3topia public', url: 'https://t.me/web3topia' },
    { name: 'scriptfolio', url: 'https://t.me/w3zenn' },
    { name: 'cleantree', url: 'cleantree.html' },
];

const communityContainer = document.getElementById('community-links');
communityLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.name;
    a.target = '_blank';
    communityContainer.appendChild(a);
});

//  проекты с GitHub
async function fetchProjects() {
    const username = 'w3bgr3p';
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
    const repos = await response.json();
    const projectList = document.getElementById('project-list');

    repos.slice(0, 5).forEach(repo => {
        const div = document.createElement('div');
        div.classList.add('project');
        div.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        div.setAttribute('data-description', repo.description || ''); // Добавляем описание
        projectList.appendChild(div);
    });
}
fetchProjects().catch(err => console.error('Ошибка загрузки проектов:', err));

// Базовые координаты для центрирования фона
let baseX = 0;
let baseY = 0;

// Устанавливаем центральную позицию фона при загрузке
function initializeBackground() {
    document.body.style.backgroundPosition = '50% 50%';
    baseX = 0;
    baseY = 0;
}

// Инициализируем фон при загрузке страницы
window.addEventListener('DOMContentLoaded', initializeBackground);

// Обработчик движения мыши для десктопа
window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Центрируем смещение: когда x=0.5, y=0.5, смещение фона = 0
    const offsetX = baseX + (x - 0.5) * 100; // Умножаем на 100 для масштаба смещения
    const offsetY = baseY + (y - 0.5) * 100;
    
    document.body.style.backgroundPosition = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;
});

// Мобильная версия с акселерометром
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
if (isMobile && 'DeviceMotionEvent' in window) {
    // Запрашиваем разрешение (в новых браузерах это обязательно)
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    addDeviceMotionListener();
                } else {
                    console.log('Доступ к акселерометру отклонён');
                }
            })
            .catch(console.error);
    } else {
        // Для старых браузеров без requestPermission
        addDeviceMotionListener();
    }
}

function addDeviceMotionListener() {
    // Переменные для калибровки начального положения
    let calibrated = false;
    let baseAccelerationX = 0;
    let baseAccelerationY = 0;
    let calibrationCount = 0;
    const calibrationFrames = 10; // Количество кадров для калибровки

    window.addEventListener('devicemotion', (event) => {
        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;

        const currentX = acceleration.x || 0;
        const currentY = acceleration.y || 0;

        // Калибровка: определяем "нейтральное" положение устройства
        if (!calibrated) {
            baseAccelerationX += currentX;
            baseAccelerationY += currentY;
            calibrationCount++;

            if (calibrationCount >= calibrationFrames) {
                baseAccelerationX /= calibrationFrames;
                baseAccelerationY /= calibrationFrames;
                calibrated = true;
                console.log(`Калибровка завершена. Базовые значения: X=${baseAccelerationX.toFixed(2)}, Y=${baseAccelerationY.toFixed(2)}`);
            }
            return;
        }

        // Вычисляем смещение относительно калиброванной позиции
        const deltaX = (currentX - baseAccelerationX) * 1; // Коэффициент чувствительности
        const deltaY = (currentY - baseAccelerationY) * 1;

        // Применяем смещение относительно центра
        document.body.style.backgroundPosition = `calc(50% + ${deltaX}px) calc(50% + ${deltaY}px)`;
    });

    // Возможность рекалибровки при двойном касании экрана
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            // Двойное касание - рекалибровка
            calibrated = false;
            calibrationCount = 0;
            baseAccelerationX = 0;
            baseAccelerationY = 0;
            console.log('Начинается рекалибровка...');
        }
        
        lastTap = currentTime;
    });
}