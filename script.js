function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    if (!container) return;
    
    const colors = ['#4caf50', '#8bc34a', '#cddc39', '#2e7d32'];
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        const size = Math.random() * 100 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = `radial-gradient(circle, ${color}40, transparent)`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 20 + 10}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(element);
    }
}

// SEO-оптимизированные заголовки страниц под тематику ремонта и строительства
const pageTitles = {
    home: 'PROF REMONT — Инструменты, материалы и оборудование для ремонта и строительства | Главная',
    services: 'Каталог инструментов и строительных материалов | PROF REMONT',
    expertise: 'Услуги и аренда строительного оборудования | PROF REMONT',
    about: 'О компании PROF REMONT | Магазин и склад для ремонта и строительства',
    contacts: 'Контакты PROF REMONT — магазин инструментов и стройматериалов'
};

const pageDescriptions = {
    home: 'PROF REMONT — магазин и склад инструментов, материалов и оборудования для ремонта и строительства в Красноярске. Электроинструмент, расходники, строительные смеси, леса, вышки, СИЗ. Быстрая отгрузка со склада и доставка на объект.',
    services: 'Каталог инструментов, строительных материалов и оборудования в Красноярске: электроинструмент, расходники, смеси, леса, оборудование для отделки и защиты. PROF REMONT — все для ремонта и стройки.',
    expertise: 'Услуги по подбору комплекта под объект, комплектация по смете, аренда перфораторов, виброплит, лесов, резчиков, а также сервис и ремонт инструмента в Красноярске.',
    about: 'PROF REMONT — магазин и склад инструментов, материалов и оборудования для ремонта и строительства. Работаем с подрядчиками, ИП и частными мастерами, помогаем комплектовать объекты под ключ.',
    contacts: 'Контакты магазина и склада PROF REMONT в Красноярске: ул. Строительная, 10. Телефон 8(999)999-99-99, email info@stroiprof-krsk.ru. Как до нас добраться и как оформить заказ.'
};

function updatePageSEO(pageId) {
    document.title = pageTitles[pageId] || pageTitles['home'];
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', pageDescriptions[pageId] || pageDescriptions['home']);
    }
}

function setupForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            setTimeout(() => {
                alert('🎉 Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    });
}

function setupAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    document.querySelectorAll('.about-section, .services-section, .question-section, .page-content, .service-card, .feature-card').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Мобильное меню
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Закрытие меню при клике на ссылку
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    setupForms();
    setupAnimations();
    setupMobileMenu();
    
    // Обновляем SEO для текущей страницы
    const currentPage = getCurrentPage();
    updatePageSEO(currentPage);
});

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    const routes = {
        'index.html': 'home',
        'services.html': 'services',
        'expertise.html': 'expertise',
        'about.html': 'about',
        'contacts.html': 'contacts'
    };
    return routes[filename] || 'home';
}
