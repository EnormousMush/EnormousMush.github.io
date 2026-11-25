/* ============ Section tabs ============ */
(function initTabs() {
    const sections = document.querySelectorAll('main > .section');
    if (!sections.length) return;
    document.body.classList.add('tabbed');

    function show(id) {
        let target = null;
        sections.forEach(s => { if (s.id === id) target = s; });
        if (!target) { target = sections[0]; id = target.id; }
        sections.forEach(s => s.classList.toggle('active', s === target));
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
            a.classList.toggle('active-tab', a.getAttribute('href') === '#' + id);
        });
        // keep the language toggle pointing at the same tab
        document.querySelectorAll('.lang-toggle .lang').forEach(a => {
            a.href = a.href.split('#')[0] + '#' + id;
        });
        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', () => show(location.hash.slice(1)));
    show(location.hash.slice(1));
})();

/* ============ Animal popup ============ */
const animalDataEN = {
    elephant: {
        title: 'Elephant',
        description: 'Chunky tasks that you have to complete in the present. A real analysis homework assignment would fall under this category.'
    },
    beaver: {
        title: 'Beaver',
        description: 'Tasks that connect directly with your future goals. Prepping for grad school applications would fall under this category.'
    },
    owl: {
        title: 'Owl',
        description: 'Tasks that are directed by yourself to learn things that you are interested in. Self-learning a new coding language would fall under here.'
    },
    dolphin: {
        title: 'Dolphin',
        description: 'Tasks that are considered creative and revolve around your hobbies and interests. Producing a new song would fall under here.'
    },
    bookworm: {
        title: 'Bookworm',
        description: 'Tasks that are considered "reading a book." Self-explanatory.'
    },
    bees: {
        title: 'Bees',
        description: 'Tasks that are related to planning and planning only.'
    }
};

const animalDataZH = {
    elephant: {
        title: '大象',
        description: '当下必须完成的，需要很多时间的任务。比如完成这周的实分析作业（我还没有完成）。'
    },
    beaver: {
        title: '河狸',
        description: '与你未来目标直接相关的任务。比如准备研究生申请。'
    },
    owl: {
        title: '猫头鹰',
        description: '由你自己主导去学习感兴趣事物的任务。比如自学一门新的编程语言。'
    },
    dolphin: {
        title: '海豚',
        description: '创意性强、围绕你的爱好和兴趣展开的任务。比如制作一首新歌。'
    },
    bookworm: {
        title: '书虫',
        description: '被视为"读书"的任务。很好理解。'
    },
    bees: {
        title: '蜜蜂',
        description: '仅与计划相关的任务。比如做一份计划...'
    }
};

// Detect language from the <body> class set in HTML
const animalData = document.body.classList.contains('zh') ? animalDataZH : animalDataEN;

const overlay = document.getElementById('popupOverlay');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');
const popupClose = document.querySelector('.popup-close');

document.querySelectorAll('.animal-block').forEach(block => {
    block.addEventListener('click', () => {
        const animal = block.dataset.animal;
        const data = animalData[animal];
        if (!data) return;
        popupTitle.textContent = data.title;
        popupDescription.textContent = data.description;
        overlay.classList.add('active');
    });
});

function hidePopup() {
    overlay.classList.remove('active');
}

popupClose.addEventListener('click', hidePopup);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hidePopup();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePopup();
});
