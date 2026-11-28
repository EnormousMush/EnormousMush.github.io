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
