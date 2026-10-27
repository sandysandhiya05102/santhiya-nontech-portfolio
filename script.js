
// Animate sections when they appear on screen

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// Gentle mouse movement effect on the room

const room = document.querySelector(".room-wrapper");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (room && !reducedMotion) {
    room.addEventListener("mousemove", (event) => {
        if (window.innerWidth <= 800) return;

        const rect = room.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        room.style.transform =
            `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
    });

    room.addEventListener("mouseleave", () => {
        room.style.transform = "";
    });
}


// Smooth scrolling for internal navigation links

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });
        }
    });
});


// Small greeting in the browser console

console.log("Welcome to Santhiya B's portfolio!");

// Floating bubbles for About section
document.addEventListener("DOMContentLoaded", () => {
    const about = document.querySelector("#about");
    const container = about?.querySelector(".bubble-background");

    if (!container || container.children.length > 0) return;

    for (let i = 0; i < 32; i++) {
        const bubble = document.createElement("span");
        bubble.className = "bubble";

        const size = Math.random() * 9 + 4;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 10 + 8}s`;
        bubble.style.animationDelay = `${Math.random() * 15}s`;

        container.appendChild(bubble);
    }
});

// Mobile hamburger menu
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}