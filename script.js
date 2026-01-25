// TypeScript version of the script with all requested features
// Hamburger menu toggle
function toggleMenu() {
    var menu = document.querySelector('.menu-links');
    var icon = document.querySelector('.hamburger-icon');
    if (menu && icon) {
        menu.classList.toggle('open');
        icon.classList.toggle('open');
    }
}
// Theme Switcher (Light/Dark Mode)
var themeSwitcher = document.getElementById('theme-switcher');
if (themeSwitcher) {
    themeSwitcher.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            themeSwitcher.textContent = '☀️';
        }
        else {
            themeSwitcher.textContent = '🌙';
        }
    });
}
var Typewriter = /** @class */ (function () {
    function Typewriter(element, options) {
        var _a;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.element = element;
        this.texts = options.texts;
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pause = options.pause || 1500;
        this.loop = (_a = options.loop) !== null && _a !== void 0 ? _a : true;
        this.type();
    }
    Typewriter.prototype.type = function () {
        var _this = this;
        var currentText = this.texts[this.textIndex];
        if (this.isDeleting) {
            this.charIndex--;
            this.element.textContent = currentText.substring(0, this.charIndex);
        }
        else {
            this.charIndex++;
            this.element.textContent = currentText.substring(0, this.charIndex);
        }
        var timeout = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        if (!this.isDeleting && this.charIndex === currentText.length) {
            timeout = this.pause;
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            timeout = this.typeSpeed;
            if (!this.loop && this.textIndex === 0)
                return;
        }
        setTimeout(function () { return _this.type(); }, timeout);
    };
    return Typewriter;
}());
var typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    new Typewriter(typewriterElement, {
        texts: [
            'Building beautiful web apps.',
            'Turning ideas into code.',
            'Let\'s work together!',
        ],
        typeSpeed: 80,
        deleteSpeed: 40,
        pause: 1200,
        loop: true,
    });
}
