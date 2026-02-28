// Initialize AOS Animation Library
AOS.init({
	duration: 800,
	easing: 'ease-in-out',
	once: true,
	offset: 100
});

// Initialize Typed.js for typing animation
document.addEventListener('DOMContentLoaded', function() {
	const typed = new Typed('#typed-role', {
		strings: ['DevOps Engineer', 'Platform Engineer', 'Site Reliability Engineer', 'Cloud Enthusiast', 'Kubernetes Expert'],
		typeSpeed: 80,
		backSpeed: 50,
		backDelay: 2000,
		loop: true,
		showCursor: true,
		cursorChar: '|'
	});
});

const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

  addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
	const scrollProgress = document.getElementById('scrollProgress');
	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const progress = (scrollTop / scrollHeight) * 100;
	scrollProgress.style.width = progress + '%';
})

// Qualification Tabs

const tabs = document.querySelectorAll('[data-target]'),
	  tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
	tab.addEventListener('click', () =>{
		const target = document.querySelector(tab.dataset.target)

		tabContents.forEach(tabContent =>{
			tabContent.classList.remove('qualification__active')
		})
		target.classList.add('qualification__active')

		tabs.forEach(tab =>{
			tab.classList.remove('qualification__active')
		})
		tab.classList.add('qualification__active')
	})
})

// Skills Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const skillItems = document.querySelectorAll('.skills__list-item');

filterBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		// Remove active class from all buttons
		filterBtns.forEach(b => b.classList.remove('active'));
		// Add active class to clicked button
		btn.classList.add('active');

		const filterValue = btn.getAttribute('data-filter');

		skillItems.forEach(item => {
			if (filterValue === 'all') {
				item.style.display = 'flex';
				item.style.animation = 'fadeIn 0.5s';
			} else {
				const categories = item.getAttribute('data-category');
				if (categories && categories.includes(filterValue)) {
					item.style.display = 'flex';
					item.style.animation = 'fadeIn 0.5s';
				} else {
					item.style.display = 'none';
				}
			}
		});
	});
});

// Contact Form - Web3Forms handles submission
// Form will POST directly to Web3Forms API and redirect back to the page

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		// Skip the CV download button
		if (this.id === 'downloadCV') {
			return;
		}
		e.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// ============================================================
// TODO: REMOVE THIS SECTION WHEN CV IS READY
// Download CV placeholder message
// When CV is ready:
// 1. In index.html: Change href="#" to href="./assets/CV.pdf" (2 places)
// 2. Delete this entire section (lines 168-183)
// ============================================================
const downloadCVBtn = document.getElementById('downloadCV');
const footerCVLink = document.querySelector('.footer__cv-link');

const cvClickHandler = function(e) {
	e.preventDefault();
	alert('CV will be available soon! Please contact me directly at pavel.dumenko.tech@gmail.com for more information.');
};

if (downloadCVBtn) {
	downloadCVBtn.addEventListener('click', cvClickHandler);
}

if (footerCVLink) {
	footerCVLink.addEventListener('click', cvClickHandler);
}
// ============================================================
// END OF CV PLACEHOLDER CODE
// ============================================================

