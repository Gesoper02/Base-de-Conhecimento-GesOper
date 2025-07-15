function searchContent() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const content = document.querySelector("main");
    const allElements = content.querySelectorAll("p, li, h2, h3");

    allElements.forEach(el => {
        // Remove marcas anteriores
        el.innerHTML = el.textContent;

        if (input !== "" && el.textContent.toLowerCase().includes(input)) {
            // Aplica destaque ao texto correspondente
            const regex = new RegExp(`(${input})`, "gi");
            el.innerHTML = el.textContent.replace(regex, `<mark>$1</mark>`);
        }
    });
}
