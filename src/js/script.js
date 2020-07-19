document.addEventListener("DOMContentLoaded", function(event) {

const search = document.querySelector('.header__search');
const searchExpanded = document.querySelector('.header__search__expanded');
const burger = document.querySelector('.burger-menu-wrap');
const navigation = document.querySelector('aside');
const bannerMenuItems = document.querySelectorAll('.image-wrap');


search.addEventListener('click', () => {
    search.style = 'display: none;';
    searchExpanded.style = 'display: flex;';
    if(search.classList.contains('search-extend')) {
        search.classList.remove('search-extend');
    } else {
        search.classList.add('search-extend');
    }
});

searchExpanded.addEventListener('click', (e) => {
    if(e.target.tagName.toUpperCase() !== 'INPUT' && e.target.tagName.toUpperCase() !== 'IMG') {
        searchExpanded.style = 'display: none;';
        search.style = 'display: flex;';
        search.classList.add('search-extend');
    }
});

burger.addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.toggle('burger-active');
    navigation.classList.toggle('burger-active');
});


if(document.documentElement.scrollWidth <= 500){
    bannerMenuItems[0].classList.add('active-link');
    document.querySelector('.banner-menu__img__wrap').style.display = "flex";
    document.querySelector('.banner-menu__img__text').textContent = bannerMenuItems[0].dataset.text;
    bannerMenuItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            if(document.querySelector('.active-link')){
                document.querySelector('.active-link').classList.remove('active-link');
            }
            document.querySelector('.banner-menu__img__text').textContent = e.currentTarget.dataset.text;
            e.currentTarget.classList.toggle('active-link');
        });
    });
}

//=============== готовность дома

    //=============== map tabs

    document.querySelectorAll('.colocation__btn').forEach(item => {
        item.addEventListener('click', event => {
            let parentGroup = event.target.closest(".colocation__btns-block");
            let justClicked = event.target;
            parentGroup.querySelectorAll('.colocation__btn').forEach(item => {
                item.classList.remove('active');
            });
            justClicked.classList.add('active')
            document.querySelectorAll('.colocation__map-switcher').forEach(item => {
                item.classList.remove('active');
            });

        })
    });

    //=============== map center switchers

    document.querySelectorAll('.colocation__map-switcher').forEach(item => {
        item.addEventListener('click', event => {
            let parentGroup = event.target.closest(".colocation__map");
            let justClicked = event.target;
            parentGroup.querySelectorAll('.colocation__map-switcher').forEach(item => {
                item.classList.remove('active');
            });
            justClicked.classList.add('active')

        })
    });

    // ===== slider


    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        speed: 400,
        slidesPerView: 'auto',
        autoplay: false,
        // centeredSlides: true,
        // centeredSlidesBounds: true,
        loop: true,
        loopedSlides: 8,
        // breakpoints: {
        //     440: {
        //         slidesPerView: 2,
        //     },
        //     768: {
        //         slidesPerView: 3,
        //     },
        //     1025: {
        //         slidesPerView: 4,
        //     }
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    })
});