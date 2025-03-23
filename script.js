// Ссылки на соцсети
const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/w3bgrep' },
    { name: 'Youtube ', url: 'https://www.youtube.com/@w3bgrep' },
    { name: 'Telegram dm', url: 'https://t.me/w3bgr3p' },
    { name: 'X', url: 'https://x.com/web3grep },
];

const socialContainer = document.getElementById('social-links');
socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.name;
    a.target = '_blank';
    socialContainer.appendChild(a);
});

// Ссылки на соцсети
const communityLinks = [
    { name: 'W3Zen discord', url: 'https://github.com/w3bgrep' },
    { name: 'W3Zen telegram', url: 'https://www.youtube.com/@w3bgrep' },
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
            <strong>${repo.name}</strong><br>
            ${repo.description || ''}<br>
            <a href="${repo.html_url}" target="_blank">go GitHub</a>
        `;
        projectList.appendChild(div);
    });
}

fetchProjects().catch(err => console.error('Ошибка загрузки проектов:', err));
