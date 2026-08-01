(() => {
    const links = Array.from(document.querySelectorAll(".docs-nav a"));
    const sections = links
        .map(link => document.getElementById(link.getAttribute("href").slice(1)))
        .filter(Boolean);

    const setActive = id => {
        links.forEach(link =>
            link.classList.toggle("active", link.getAttribute("href") === "#" + id),
        );
    };

    const onScroll = () => {
        let current = sections[0].id;
        const marker = window.scrollY + window.innerHeight / 3;
        for (const section of sections) {
            if (section.getBoundingClientRect().top + window.scrollY <= marker) {
                current = section.id;
            } else {
                break;
            }
        }
        setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
})();
