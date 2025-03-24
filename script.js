// Ссылки на соцсети
const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/w3bgrep', icon: 'fab fa-github' },
    { name: 'Youtube ', url: 'https://www.youtube.com/@w3bgrep', icon: 'fab fa-youtube' },
    { name: 'Telegram dm', url: 'https://t.me/w3bgr3p', icon: 'fab fa-telegram' },
    { name: 'X', url: 'https://x.com/web3grep', icon: 'fab fa-x-twitter' },
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
    { name: 'web3grep personal', url: 'https://t.me/web3grep' },
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
    const username = 'w3bgrep'; // Замени на свой ник
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
    const repos = await response.json();
    const projectList = document.getElementById('project-list');

    // Берем первые 5 репозиториев
    repos.slice(0, 5).forEach(repo => {
        const div = document.createElement('div');
        div.classList.add('project');
        div.innerHTML = `
            <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a><br>

            ${repo.description || ''}<br>
        `;
        projectList.appendChild(div);
    });
}

fetchProjects().catch(err => console.error('Ошибка загрузки проектов:', err));


window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.body.style.backgroundPosition = `${x * 50}px ${y * 50}px`;
});