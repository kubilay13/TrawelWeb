const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        var logoElement = document.getElementById("logo");
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        logoElement.src = "/images/logo1.png";
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        var logoElement = document.getElementById("logo");
        localStorage.setItem('theme', 'light');
        logoElement.src = "/images/logo2.png";
       
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);

function ReloadLogo() {
    if (currentTheme == 'dark') {
        var logoElement = document.getElementById("logo");
        logoElement.src = "/images/logo1.png";
    }
    else {
        var logoElement = document.getElementById("logo");
        logoElement.src = "/images/logo2.png";

    }
}
