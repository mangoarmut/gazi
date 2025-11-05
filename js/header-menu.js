const openMobileMenuBtn = document.querySelector(".btn-mobile-menu");
const closeMobileMenuBtn = document.querySelector(".btn-close-menu");
const mobileMenu = document.querySelector("#header nav");

openMobileMenuBtn.addEventListener("click", function()
{
    mobileMenu.style.right = "0";
    closeMobileMenuBtn.classList.add("active");

    setTimeout(function()
    {
        mobileMenu.style.backgroundColor = "rgba(0,0,0,0.5)";
    }, 200);
});

closeMobileMenuBtn.addEventListener("click", function()
{
    mobileMenu.style.backgroundColor = "transparent";
    setTimeout(function()
    {
        mobileMenu.style.right = "-100%";
        closeMobileMenuBtn.classList.remove("active");
    }, 200);
});

// Lang DropDown
const langBtn = document.querySelector(".lang-dropdown");
const langDetail = document.querySelector(".lang-dropdown .lang-detail");
var langSelected = false;

langBtn.addEventListener('click', function()
{
    if (!langSelected)
    {
        langDetail.style.height = langDetail.scrollHeight + "px";
        langSelected = true;
    }
    else
    {
        langDetail.style.height = 0;
        langSelected = false;
    }
});