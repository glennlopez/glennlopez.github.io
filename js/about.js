<!-- Certificate Carousel -->
$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        items: 5,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 2700,
        autoplayHoverPause: true,
        dots: false, // set dots to false to remove dots
        responsive: {
            0: {
                items: 3
            },
            375: {
                items: 3
            },
            500: {
                items: 4
            },
            992: {
                items: 5
            },
            1660: {
                items: 6
            }
        }
    });
});
<!-- Certificate Carousel -->

<!-- Class Toggle for Nav selection element -->
const elementToObserve1 = document.querySelector("#icebreakers_observe");
const elementToObserve2 = document.querySelector("#about_observe");

const elementToChange1 = document.querySelector("#nav_icebreaker");
const elementToChange2 = document.querySelector("#nav_about");

const observer1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            elementToChange1.classList.add("glenn-active");
            elementToChange2.classList.remove("glenn-active");
            observer1.unobserve(elementToObserve1);
        }
    });
});
observer1.observe(elementToObserve1);
<!-- END Class Toggle for Nav selection element -->