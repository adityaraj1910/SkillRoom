document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Apply saved theme
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        toggleBtn.classList.add("dark-mode");
        toggleBtn.setAttribute("data-hover-text", "Switch to Light Mode");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        toggleBtn.classList.add("light-mode");
        toggleBtn.setAttribute("data-hover-text", "Switch to Dark Mode");
    }

    // Toggle theme on button click
    toggleBtn.addEventListener("click", () => {
        const isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";

        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "light");
            toggleBtn.classList.replace("dark-mode", "light-mode");
            toggleBtn.setAttribute("data-hover-text", "Switch to Dark Mode");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            toggleBtn.classList.replace("light-mode", "dark-mode");
            toggleBtn.setAttribute("data-hover-text", "Switch to Light Mode");
            localStorage.setItem("theme", "dark");
        }
    });
});
