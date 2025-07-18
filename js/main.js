// Funcionalidades principais do site
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Menu toggle para mobile
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            } else {
                searchResults.style.display = 'none';
            }
        });
        
        // Fechar resultados ao clicar fora
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    function performSearch(query) {
        // Dados de busca simplificados
        const searchData = [
            { title: 'Conciliação Bancária', url: 'financeiro/conciliacao/index.html', category: 'Financeiro' },
            { title: 'Escala', url: 'operacional/escala/index.html', category: 'Operacional' },
            { title: 'Cadastro de Jornada', url: 'operacional/cadastro-jornada/index.html', category: 'Operacional' },
            { title: 'Cadastro de Clientes', url: 'operacional/clientes/index.html', category: 'Operacional' },
            { title: 'Cadastro de Funcionários', url: 'operacional/funcionarios/index.html', category: 'Operacional' },
            { title: 'Cadastro de Patrimônio', url: 'operacional/patrimonio/index.html', category: 'Operacional' },
            { title: 'Serviços Complementares', url: 'operacional/servicos/index.html', category: 'Operacional' },
            { title: 'Benefícios', url: 'beneficios/index.html', category: 'Benefícios' }
        ];
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div style="padding: 16px; color: #666;">Nenhum resultado encontrado</div>';
        } else {
            searchResults.innerHTML = results.map(result => `
                <div style="padding: 12px 16px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="window.location.href='${result.url}'">
                    <div style="font-weight: 500; color: #333;">${result.title}</div>
                    <div style="font-size: 12px; color: #666;">${result.category}</div>
                </div>
            `).join('');
        }
        searchResults.style.display = 'block';
    }
});

// Função global para toggle de submenus
function toggleSubmenu(menuId) {
    const submenu = document.getElementById(menuId);
    const button = submenu.previousElementSibling;
    
    if (submenu.classList.contains('open')) {
        submenu.classList.remove('open');
        button.classList.remove('active');
    } else {
        // Fechar outros submenus
        document.querySelectorAll('.submenu.open').forEach(menu => {
            menu.classList.remove('open');
            menu.previousElementSibling.classList.remove('active');
        });
        
        submenu.classList.add('open');
        button.classList.add('active');
    }
}