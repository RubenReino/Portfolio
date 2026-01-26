// 1. STICKY NAVBAR
const header = document.querySelector("header");
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 20);
});

// 2. THEME TOGGLE
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const icon = toggleBtn.querySelector("i");

// Cargar preferencia
if(localStorage.getItem('theme') === 'light'){
    body.setAttribute('data-theme', 'light');
    icon.classList.replace('fa-moon', 'fa-sun');
}

toggleBtn.addEventListener("click", () => {
    if(body.getAttribute('data-theme') === 'light'){
        body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    }
});

// 3. ANIMACIONES SCROLL 
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// 4. MODAL LOGIC & GALERÍA
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImage");

// IMÁGENES DE PROYECTO

const projectImages = [
    "assets/img/p1.png", 
    "assets/img/p2.png",
    "assets/img/p3.png",
    "assets/img/p4.png"
];


let currentImageIndex = 0;

function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
    updateImage();
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function changeImage(dir) {
    currentImageIndex += dir;
    
    if (currentImageIndex >= projectImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = projectImages.length - 1;
    }
    
    updateImage();
}

function updateImage() {
modalImg.src = projectImages[currentImageIndex];
}



//FOTO DE PERFIL
const profileModal = document.getElementById("profileModal");
const profileImg = document.getElementById("profilePic");
const expandedImg = document.getElementById("imgExpanded");
const closeProfileBtn = document.getElementById("closeProfileModal");


if(profileImg) {
    profileImg.addEventListener("click", function(){
        profileModal.style.display = "block";
        expandedImg.src = this.src;
        document.body.style.overflow = "hidden";
    });
}

if(closeProfileBtn) {
    closeProfileBtn.addEventListener("click", function() {
        profileModal.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

window.onclick = function(event) {
    // modal de proyectos
    if (event.target == document.getElementById("projectModal")) {
        closeModal();
    }
    if (event.target == profileModal) {
        profileModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}