// Ссылки на соцсети
const socialLinks = [
    { name: 'Telegram', url: 'https://t.me/w3bgr3p' },
    { name: 'X', url: 'https://x.com/web3grep' },
    { name: 'GitHub', url: 'https://github.com/w3bgrep' }
];

const socialContainer = document.getElementById('social-links');
socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.name;
    a.target = '_blank';
    socialContainer.appendChild(a);
});

//  проекты с GitHub
async function fetchProjects() {
    const username = 'w3bgrep'; 
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();
    const projectList = document.getElementById('project-list');

    repos.slice(0, 5).forEach(repo => { //  5 последних репозиториев
        const div = document.createElement('div');
        div.classList.add('project');
        div.innerHTML = `
            <strong>${repo.name}</strong><br>
            ${repo.description || 'Описание отсутствует'}<br>
            <a href="${repo.html_url}" target="_blank">go GitHub</a>
        `;
        projectList.appendChild(div);
    });
}

fetchProjects().catch(err => console.error('Ошибка загрузки проектов:', err));
