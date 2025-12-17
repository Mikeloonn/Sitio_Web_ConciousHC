//Selector CSS de la barra de menú
var navMenu = document.querySelector(".main-nav");

//Selector CSS del botón Hamburguesa
var menuToggle = document.querySelector(".menu-toggle");

//Intercepta el evento click sobre el botón hamburguesa 
menuToggle.onclick = () => {
    navMenu.classList.toggle("show");
}