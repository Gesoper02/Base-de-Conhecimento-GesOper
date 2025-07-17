// Variáveis globais
let currentTheme = localStorage.getItem('theme') || 'light';
let sidebarOpen = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeSearch();
    initializeSidebar();
    initializeMenuToggle();
});

// Gerenciamento de tema
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Aplicar tema salvo
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Event listener para toggle de tema
    themeToggle.addEventListener('click', function() {
        if (currentTheme === 'light') {
            currentTheme = 'dark';
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            currentTheme = 'light';
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('theme', currentTheme);
    });
}

// Sistema de busca
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // Dados para busca
    const searchData = [
        {
            title: 'Escala',
            description: 'Submódulo de controle de escalas',
            url: 'operacional/escala/index.html',
            category: 'Operacional'
        },
        {
            title: 'Cadastro de Jornada',
            description: 'Submódulo de controle de jornada',
            url: 'operacional/cadastro-jornada/index.html',
            category: 'Operacional'
        },
        {
            title: 'Conciliação Bancária',
            description: 'Processo de validação de lançamentos bancários',
            url: 'financeiro/conciliacao/index.html',
            category: 'Financeiro'
        },
        {
            title: 'Financeiro',
            description: 'Módulo de gestão financeira',
            url: 'financeiro/index.html',
            category: 'Financeiro'
        },
        {
            title: 'Benefícios',
            description: 'Módulo de gestão de benefícios',
            url: 'beneficios/index.html',
            category: 'Benefícios'
        }
    ];
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            hideSearchResults();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query, searchData, searchResults);
        }, 300);
    });
    
    // Fechar resultados ao clicar fora
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            hideSearchResults();
        }
    });
}

function performSearch(query, data, resultsContainer) {
    const results = data.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        showNoResults(resultsContainer);
        return;
    }
    
    displaySearchResults(results, resultsContainer);
}

function displaySearchResults(results, container) {
    const html = results.map(result => `
        <div class="search-result-item" onclick="navigateToResult('${result.url}')">
            <div class="result-title">${highlightText(result.title)}</div>
            <div class="result-description">${highlightText(result.description)}</div>
            <div class="result-category">${result.category}</div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    container.style.display = 'block';
}

function showNoResults(container) {
    container.innerHTML = `
        <div class="search-no-results">
            <i class="fas fa-search"></i>
            <p>Nenhum resultado encontrado</p>
        </div>
    `;
    container.style.display = 'block';
}

function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    searchResults.style.display = 'none';
}

function highlightText(text) {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function navigateToResult(url) {
    window.location.href = url;
}

// Gerenciamento da sidebar
function initializeSidebar() {
    // Restaurar estado dos submenus
    const openMenus = JSON.parse(localStorage.getItem('openMenus') || '[]');
    openMenus.forEach(menuId => {
        const submenu = document.getElementById(menuId);
        const button = document.querySelector(`[onclick="toggleSubmenu('${menuId}')"]`);
        if (submenu && button) {
            submenu.classList.add('open');
            button.classList.add('active');
        }
    });
}

function toggleSubmenu(menuId) {
    const submenu = document.getElementById(menuId);
    const button = document.querySelector(`[onclick="toggleSubmenu('${menuId}')"]`);
    
    if (!submenu || !button) return;
    
    const isOpen = submenu.classList.contains('open');
    
    if (isOpen) {
        submenu.classList.remove('open');
        button.classList.remove('active');
    } else {
        submenu.classList.add('open');
        button.classList.add('active');
    }
    
    // Salvar estado
    saveMenuState();
}

function saveMenuState() {
    const openMenus = [];
    document.querySelectorAll('.submenu.open').forEach(submenu => {
        openMenus.push(submenu.id);
    });
    localStorage.setItem('openMenus', JSON.stringify(openMenus));
}

// Menu toggle para mobile
function initializeMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebarOpen = !sidebarOpen;
        sidebar.classList.toggle('open', sidebarOpen);
        
        // Adicionar overlay para fechar sidebar ao clicar fora
        if (sidebarOpen) {
            createOverlay();
        } else {
            removeOverlay();
        }
    });
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
    `;
    
    overlay.addEventListener('click', function() {
        closeSidebar();
    });
    
    document.body.appendChild(overlay);
}

function removeOverlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');
    sidebarOpen = false;
    removeOverlay();
}

// Adicionar estilos CSS dinamicamente para elementos que não estão no CSS principal
const additionalStyles = `
    .search-result-item {
        padding: 12px 16px;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    
    .search-result-item:hover {
        background-color: var(--secondary-color);
    }
    
    .search-result-item:last-child {
        border-bottom: none;
    }
    
    .result-title {
        font-weight: 600;
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 4px;
    }
    
    .result-description {
        font-size: 12px;
        color: var(--text-secondary);
        margin-bottom: 4px;
    }
    
    .result-category {
        font-size: 11px;
        color: var(--accent-color);
        font-weight: 500;
    }
    
    .search-no-results {
        padding: 24px;
        text-align: center;
        color: var(--text-secondary);
    }
    
    .search-no-results i {
        font-size: 24px;
        margin-bottom: 8px;
        display: block;
    }
    
    mark {
        background-color: #fff3cd;
        color: #856404;
        padding: 0 2px;
        border-radius: 2px;
    }
    
    [data-theme="dark"] mark {
        background-color: #664d03;
        color: #fff3cd;
    }
`;

// Adicionar estilos ao head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Função global para ser chamada pelos botões
window.toggleSubmenu = toggleSubmenu;