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
    const username = 'w3bgrep';
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



window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Центрируем смещение: когда x=0.5, y=0.5, смещение фона = 0
    const offsetX = (x - 0.5) * 100; // Умножаем на 100 для масштаба смещения
    const offsetY = (y - 0.5) * 100;
    
    document.body.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    //document.body.style.backgroundPosition = `${x * 50}px ${y * 50}px`;
});


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
    window.addEventListener('devicemotion', (event) => {
        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;
 
        // Пример расчёта смещения на основе ускорения (X и Y оси, с нормализацией)
        // Умножьте/поделите коэффициенты для регулировки чувствительности
        const offsetX = (acceleration.x || 0) * 10; // X-ось: лево-право
        const offsetY = (acceleration.y || 0) * 10; // Y-ось: верх-низ
 
        // Центрируем, как в вашем коде (относительно "нейтрального" положения)
        document.body.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    });
}
 