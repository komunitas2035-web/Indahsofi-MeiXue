// ============================================================
// DOM CONTENT LOADED
// ============================================================

document.addEventListener('DOMContentLoaded', () => {


    // ========================================================
    // DARK / LIGHT THEME TOGGLE
    // ========================================================

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {

        const themeIcon = themeToggle.querySelector('i');

        // Check saved theme
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {

            body.classList.add('dark-mode');

            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }

        }


        themeToggle.addEventListener('click', () => {

            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {

                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }

                localStorage.setItem('theme', 'dark');

            } else {

                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }

                localStorage.setItem('theme', 'light');

            }

        });

    }



    // ========================================================
    // HAMBURGER MENU
    // ========================================================

    const hamburger =
        document.getElementById('hamburger');

    const navMenu =
        document.getElementById('nav-menu');

    const navBackdrop =
        document.getElementById('nav-backdrop');


    function toggleMenu() {

        if (!navMenu || !hamburger) {
            return;
        }

        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        if (navBackdrop) {
            navBackdrop.classList.toggle('active');
        }

        document.body.style.overflow =
            navMenu.classList.contains('active')
                ? 'hidden'
                : '';

    }


    if (hamburger) {
        hamburger.addEventListener(
            'click',
            toggleMenu
        );
    }


    if (navBackdrop) {

        navBackdrop.addEventListener(
            'click',
            toggleMenu
        );

    }


    document
        .querySelectorAll('.nav-link')
        .forEach(link => {

            link.addEventListener(
                'click',
                () => {

                    if (
                        navMenu &&
                        navMenu.classList.contains('active')
                    ) {

                        toggleMenu();

                    }

                }
            );

        });



    // ========================================================
    // ACTIVE NAVIGATION ON SCROLL
    // ========================================================

    const sections =
        document.querySelectorAll('section[id]');

    const navLinks =
        document.querySelectorAll('.nav-link');


    function highlightNavigation() {

        const scrollY = window.pageYOffset;

        sections.forEach(section => {

            const sectionHeight =
                section.offsetHeight;

            const sectionTop =
                section.offsetTop - 100;

            const sectionId =
                section.getAttribute('id');


            if (
                scrollY > sectionTop &&
                scrollY <=
                    sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove('active');


                    if (
                        link.getAttribute('href') ===
                        `#${sectionId}`
                    ) {

                        link.classList.add('active');

                    }

                });

            }

        });

    }


    window.addEventListener(
        'scroll',
        highlightNavigation
    );



    // ========================================================
    // MAIN SLIDER
    // ========================================================

    let currentSlide = 0;

    const slides =
        document.querySelectorAll('.slide');

    const sliderNavBtns =
        document.querySelectorAll(
            '.slider-nav-btn'
        );

    const prevBtn =
        document.getElementById('prev-btn');

    const nextBtn =
        document.getElementById('next-btn');

    const totalSlides =
        slides.length;


    function showSlide(index) {

        if (!totalSlides) {
            return;
        }


        // Keep index valid
        index =
            (index + totalSlides) %
            totalSlides;


        slides.forEach((slide, i) => {

            slide.classList.remove('active');

            if (sliderNavBtns[i]) {
                sliderNavBtns[i]
                    .classList.remove('active');
            }

        });


        slides[index]
            .classList.add('active');


        if (sliderNavBtns[index]) {

            sliderNavBtns[index]
                .classList.add('active');

        }


        currentSlide = index;

    }


    function nextSlide() {

        if (!totalSlides) {
            return;
        }

        currentSlide =
            (currentSlide + 1) %
            totalSlides;

        showSlide(currentSlide);

    }


    function prevSlide() {

        if (!totalSlides) {
            return;
        }

        currentSlide =
            (currentSlide - 1 + totalSlides) %
            totalSlides;

        showSlide(currentSlide);

    }


    if (nextBtn) {

        nextBtn.addEventListener(
            'click',
            () => {

                nextSlide();
                resetAutoSlide();

            }
        );

    }


    if (prevBtn) {

        prevBtn.addEventListener(
            'click',
            () => {

                prevSlide();
                resetAutoSlide();

            }
        );

    }


    sliderNavBtns.forEach(
        (btn, index) => {

            btn.addEventListener(
                'click',
                () => {

                    showSlide(index);
                    resetAutoSlide();

                }
            );

        }
    );


    let slideInterval = null;


    function resetAutoSlide() {

        if (!totalSlides) {
            return;
        }


        clearInterval(slideInterval);


        slideInterval =
            setInterval(
                nextSlide,
                5000
            );

    }


    if (totalSlides) {

        showSlide(0);
        resetAutoSlide();

    }



    // ========================================================
    // MUSIC PLAYER
    // ========================================================

    const musicToggle =
        document.getElementById('music-toggle');

    const bgMusic =
        document.getElementById('bg-music');


    if (musicToggle && bgMusic) {

        const musicIcon =
            musicToggle.querySelector('i');

        let isPlaying = false;


        // Volume
        bgMusic.volume = 0.3;


        // Play function
        function tryPlay() {

            bgMusic
                .play()
                .then(() => {

                    isPlaying = true;


                    if (musicIcon) {

                        musicIcon.classList.remove(
                            'fa-play'
                        );

                        musicIcon.classList.add(
                            'fa-pause'
                        );

                    }


                    localStorage.setItem(
                        'musicPlaying',
                        'true'
                    );


                    console.log(
                        '🎵 Music started playing!'
                    );

                })
                .catch(err => {

                    console.warn(
                        '⚠️ Autoplay blocked:',
                        err.message
                    );

                });

        }


        // Try autoplay
        setTimeout(
            tryPlay,
            500
        );

        setTimeout(
            tryPlay,
            1500
        );


        // Unlock music after interaction
        let musicUnlocked = false;


        const unlockMusic = () => {

            if (!musicUnlocked) {

                musicUnlocked = true;

                tryPlay();

            }

        };


        [
            'click',
            'touchstart',
            'keydown',
            'scroll',
            'mousemove'
        ].forEach(evt => {

            document.addEventListener(
                evt,
                unlockMusic,
                { once: true }
            );

        });


        // Music toggle
        musicToggle.addEventListener(
            'click',
            () => {

                if (isPlaying) {

                    bgMusic.pause();

                    if (musicIcon) {

                        musicIcon.classList.remove(
                            'fa-pause'
                        );

                        musicIcon.classList.add(
                            'fa-play'
                        );

                    }

                    localStorage.setItem(
                        'musicPlaying',
                        'false'
                    );


                    isPlaying = false;

                } else {

                    bgMusic
                        .play()
                        .then(() => {

                            if (musicIcon) {

                                musicIcon.classList.remove(
                                    'fa-play'
                                );

                                musicIcon.classList.add(
                                    'fa-pause'
                                );

                            }

                            localStorage.setItem(
                                'musicPlaying',
                                'true'
                            );

                            isPlaying = true;

                        })
                        .catch(err => {

                            console.warn(
                                'Music tidak dapat diputar:',
                                err.message
                            );

                        });

                }

            }
        );

    }



    // ========================================================
    // ALBUM SLIDESHOW
    // ========================================================

    let albumCurrentIndex = 0;

    const albumSlides =
        document.querySelectorAll(
            '.album-slide'
        );

    const albumSlidesContainer =
        document.getElementById(
            'album-slides'
        );

    const albumThumbs =
        document.querySelectorAll('.thumb');

    const albumPrevBtn =
        document.getElementById(
            'album-prev'
        );

    const albumNextBtn =
        document.getElementById(
            'album-next'
        );

    const totalAlbumSlides =
        albumSlides.length;


    function showAlbumSlide(index) {

        if (
            !totalAlbumSlides ||
            !albumSlidesContainer
        ) {
            return;
        }


        index =
            (index + totalAlbumSlides) %
            totalAlbumSlides;


        albumSlidesContainer.style.transform =
            `translateX(-${index * 100}%)`;


        albumThumbs.forEach(
            (thumb, i) => {

                thumb.classList.remove(
                    'active'
                );


                if (i === index) {

                    thumb.classList.add(
                        'active'
                    );

                }

            }
        );


        albumCurrentIndex = index;

    }


    function nextAlbumSlide() {

        if (!totalAlbumSlides) {
            return;
        }


        albumCurrentIndex =
            (albumCurrentIndex + 1) %
            totalAlbumSlides;


        showAlbumSlide(
            albumCurrentIndex
        );

    }


    function prevAlbumSlide() {

        if (!totalAlbumSlides) {
            return;
        }


        albumCurrentIndex =
            (
                albumCurrentIndex -
                1 +
                totalAlbumSlides
            ) %
            totalAlbumSlides;


        showAlbumSlide(
            albumCurrentIndex
        );

    }


    if (albumNextBtn) {

        albumNextBtn.addEventListener(
            'click',
            () => {

                nextAlbumSlide();
                resetAlbumAutoSlide();

            }
        );

    }


    if (albumPrevBtn) {

        albumPrevBtn.addEventListener(
            'click',
            () => {

                prevAlbumSlide();
                resetAlbumAutoSlide();

            }
        );

    }


    albumThumbs.forEach(
        (thumb, index) => {

            thumb.addEventListener(
                'click',
                () => {

                    showAlbumSlide(index);
                    resetAlbumAutoSlide();

                }
            );

        }
    );


    let albumInterval = null;


    function resetAlbumAutoSlide() {

        if (!totalAlbumSlides) {
            return;
        }


        clearInterval(
            albumInterval
        );


        albumInterval =
            setInterval(
                nextAlbumSlide,
                4000
            );

    }


    if (totalAlbumSlides) {

        showAlbumSlide(0);
        resetAlbumAutoSlide();

    }



    // ========================================================
    // MODAL
    // ========================================================

    const modal =
        document.getElementById('modal');

    const modalJurusan =
        document.getElementById(
            'modal-jurusan'
        );


    let closeModal = () => {};


    if (modal && modalJurusan) {


        function openModal(jurusan) {

            modalJurusan.textContent =
                jurusan;

            modal.classList.add(
                'active'
            );

        }


        closeModal = function () {

            modal.classList.remove(
                'active'
            );

        };


        // Expose if needed by inline HTML
        window.openModal = openModal;
        window.closeModal = closeModal;


        // Click outside
        modal.addEventListener(
            'click',
            (e) => {

                if (e.target === modal) {

                    closeModal();

                }

            }
        );


        // Escape
        document.addEventListener(
            'keydown',
            (e) => {

                if (
                    e.key === 'Escape' &&
                    modal.classList.contains(
                        'active'
                    )
                ) {

                    closeModal();

                }

            }
        );

    }



    // ========================================================
    // DAFTAR FORM
    // ========================================================

    const daftarForm =
        document.querySelector(
            '.daftar-form'
        );


    if (daftarForm) {

        daftarForm.addEventListener(
            'submit',
            (e) => {

                e.preventDefault();


                const formData =
                    new FormData(
                        daftarForm
                    );


                console.log(
                    'Form data:',
                    Object.fromEntries(
                        formData.entries()
                    )
                );


                alert(
                    'Terima kasih! Pendaftaran Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.'
                );


                daftarForm.reset();

                closeModal();

            }
        );

    }



    // ========================================================
    // SMOOTH SCROLL
    // ========================================================

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                'click',
                function (e) {

                    const href =
                        this.getAttribute(
                            'href'
                        );


                    if (
                        !href ||
                        href === '#'
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (target) {

                        e.preventDefault();


                        const offsetTop =
                            target.offsetTop - 80;


                        window.scrollTo({

                            top: offsetTop,

                            behavior: 'smooth'

                        });

                    }

                }
            );

        });



    // ========================================================
    // NAVBAR BACKGROUND ON SCROLL
    // ========================================================

    const navbar =
        document.getElementById(
            'navbar'
        );


    if (navbar) {

        window.addEventListener(
            'scroll',
            () => {

                if (
                    window.scrollY > 100
                ) {

                    navbar.classList.add(
                        'scrolled'
                    );

                } else {

                    navbar.classList.remove(
                        'scrolled'
                    );

                }

            }
        );

    }



    // ========================================================
    // GENERAL SCROLL ANIMATION
    // ========================================================

    const generalObserverOptions = {

        threshold: 0.1,

        rootMargin:
            '0px 0px -100px 0px'

    };


    const generalObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                '1';


                            entry.target.style.transform =
                                'translateY(0)';

                        }

                    }
                );

            },
            generalObserverOptions
        );


    document
        .querySelectorAll(
            '.jurusan-card, .misi-card, .tim-card, .visi-card, .guru-card'
        )
        .forEach(el => {

            el.style.opacity = '0';

            el.style.transform =
                'translateY(30px)';

            el.style.transition =
                'opacity 0.6s ease, transform 0.6s ease';


            generalObserver.observe(el);

        });



    // ========================================================
    // ANIMATION ON SCROLL
    // data-animate="fade"
    // ========================================================

    const revealObserverOptions = {

        root: null,

        rootMargin:
            '0px 0px -10% 0px',

        threshold: 0.2

    };


    const animatedItems =
        document.querySelectorAll(
            '[data-animate]'
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            'fade-in-up'
                        );


                        entry.target.classList.remove(
                            'opacity-0'
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            revealObserverOptions
        );


    animatedItems.forEach(
        (item, index) => {

            item.classList.add(
                'opacity-0'
            );


            item.style.animationDelay =
                `${index * 120}ms`;


            revealObserver.observe(
                item
            );

        }
    );



    // ========================================================
    // ANIMATED STATISTICS COUNTER
    // ========================================================

    function animateCounter(counter) {

        const target =
            parseInt(
                counter.getAttribute(
                    'data-target'
                )
            );


        if (
            isNaN(target) ||
            target <= 0
        ) {
            return;
        }


        const duration = 1000;

        const startTime =
            performance.now();


        const animate =
            (currentTime) => {

                const elapsed =
                    currentTime -
                    startTime;


                const progress =
                    Math.min(
                        elapsed /
                        duration,
                        1
                    );


                // Ease out
                const easeProgress =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const current =
                    Math.floor(
                        easeProgress *
                        target
                    );


                counter.textContent =
                    current;


                if (progress < 1) {

                    requestAnimationFrame(
                        animate
                    );

                } else {

                    counter.textContent =
                        target;

                }

            };


        requestAnimationFrame(
            animate
        );

    }


    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );


                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    document
        .querySelectorAll(
            '.statistik-number'
        )
        .forEach(counter => {

            counterObserver.observe(
                counter
            );

        });



    // ========================================================
    // TKJ WHATSAPP FORM
    // ========================================================

    const tkjWhatsappForm =
        document.getElementById(
            'tkj-whatsapp-form'
        );


    const whatsappNumber =
        '628988535900';


    if (tkjWhatsappForm) {

        tkjWhatsappForm.addEventListener(
            'submit',
            function (e) {

                e.preventDefault();


                const website =
                    document.getElementById(
                        'tkj-website'
                    )?.value.trim() || '';


                const name =
                    document.getElementById(
                        'tkj-name'
                    )?.value.trim() || '';


                const memory =
                    document.getElementById(
                        'tkj-memory'
                    )?.value.trim() || '';


                if (
                    name &&
                    memory
                ) {


                    const whatsappMessage =
                        `Website:\n${website || '-'}\n\nYour Name:\n${name}\n\nShare a memory about our TKJ journey, projects, or lessons learned...:\n${memory}`;


                    const encodedMessage =
                        encodeURIComponent(
                            whatsappMessage
                        );


                    const whatsappUrl =
                        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


                    window.open(
                        whatsappUrl,
                        '_blank'
                    );

                } else {

                    alert(
                        'Mohon isi semua kolom yang wajib diisi!'
                    );

                }

            }
        );

    }



    // ========================================================
    // WHATSAPP FORM
    // ========================================================

    const whatsappForm =
        document.getElementById(
            'whatsapp-form'
        );


    if (whatsappForm) {

        whatsappForm.addEventListener(
            'submit',
            function (e) {

                e.preventDefault();


                const name =
                    document.getElementById(
                        'wa-name'
                    )?.value.trim() || '';


                const message =
                    document.getElementById(
                        'wa-message'
                    )?.value.trim() || '';


                if (
                    name &&
                    message
                ) {


                    const whatsappMessage =
                        `Name:\n${name}\n\nMessage:\n${message}`;


                    const encodedMessage =
                        encodeURIComponent(
                            whatsappMessage
                        );


                    const whatsappUrl =
                        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


                    window.open(
                        whatsappUrl,
                        '_blank'
                    );

                } else {

                    alert(
                        'Mohon isi semua kolom!'
                    );

                }

            }
        );

    }



    // ========================================================
    // ========================================================
    // PROJECT LIGHTBOX
    // ========================================================
    // ========================================================

    const projectCards =
        Array.from(
            document.querySelectorAll(
                '.project-card'
            )
        );


    const lightbox =
        document.getElementById(
            'project-lightbox'
        );


    const lightboxImage =
        document.getElementById(
            'lightbox-image'
        );


    const lightboxPrev =
        document.getElementById(
            'lightbox-prev'
        );


    const lightboxNext =
        document.getElementById(
            'lightbox-next'
        );


    const lightboxClose =
        document.getElementById(
            'lightbox-close'
        );


    const slideCounter =
        document.getElementById(
            'slide-counter'
        );



    // ========================================================
    // LIGHTBOX IMAGE DATA
    // ========================================================

    const slideshowImages = {

        web: [

            'assets/web.png',

            'assets/web1.png',

            'assets/web2.png'

        ],


        poster: [

            'assets/poster.jpeg',

            'assets/poster1.jpeg',

            'assets/poster2.jpeg',

            'assets/poster3.jpeg',

            'assets/poster4.jpeg',

            'assets/poster5.jpeg',

            'assets/poster6.jpeg',

            'assets/poster7.jpeg'

        ]

    };


    let currentSlideshow = [];

    let currentSlideIndex = 0;



    // ========================================================
    // UPDATE LIGHTBOX IMAGE
    // ========================================================

    const updateLightboxImage = () => {

        if (
            !currentSlideshow.length ||
            !lightboxImage
        ) {

            return;

        }


        const src =
            currentSlideshow[
                currentSlideIndex
            ];


        lightboxImage.classList.remove(

            'fade-in',

            'fade-out',

            'slide-in-right',

            'slide-in-left'

        );


        lightboxImage.src =
            src;


        lightboxImage.alt =
            `Slide ${currentSlideIndex + 1}`;


        if (slideCounter) {

            slideCounter.textContent =
                `${currentSlideIndex + 1} / ${currentSlideshow.length}`;

        }


        setTimeout(() => {

            lightboxImage.classList.add(
                'fade-in'
            );

        }, 20);

    };



    // ========================================================
    // OPEN LIGHTBOX
    // ========================================================

    const openLightbox = (index) => {

        if (
            !lightbox ||
            !lightboxImage
        ) {

            return;

        }


        const card =
            projectCards[index];


        if (!card) {

            return;

        }


        const slideshowKey =
            card.dataset.slideshow ||
            'web';


        currentSlideshow =
            slideshowImages[
                slideshowKey
            ] || [];


        // Fallback
        if (
            !currentSlideshow.length
        ) {

            const projectImage =
                card.querySelector(
                    '.project-image'
                );


            const fallback =
                card.dataset.fullsrc ||
                projectImage?.dataset.fullsrc ||
                projectImage?.src;


            if (fallback) {

                currentSlideshow = [
                    fallback
                ];

            }

        }


        if (
            !currentSlideshow.length
        ) {

            console.warn(
                'Tidak ada gambar slideshow untuk project:',
                slideshowKey
            );

            return;

        }


        currentSlideIndex = 0;


        lightboxImage.classList.add(

            'w-full',

            'h-auto',

            'max-h-[85vh]',

            'object-contain',

            'rounded-lg'

        );


        lightbox.classList.remove(
            'hidden'
        );


        lightbox.classList.add(
            'flex'
        );


        updateLightboxImage();


        // Lock body scroll
        document.body.style.overflow =
            'hidden';

    };



    // ========================================================
    // CLOSE LIGHTBOX
    // ========================================================

    const closeLightbox = () => {

        if (!lightbox) {

            return;

        }


        lightbox.classList.add(
            'hidden'
        );


        lightbox.classList.remove(
            'flex'
        );


        // Restore scroll
        document.body.style.overflow =
            '';

    };



    // ========================================================
    // PROJECT CARD CLICK
    // ========================================================

    projectCards.forEach(
        (card, index) => {

            card.addEventListener(
                'click',
                (event) => {

                    // Jangan buka lightbox
                    // kalau klik link

                    if (
                        event.target.closest('a')
                    ) {

                        return;

                    }


                    openLightbox(index);

                }
            );

        }
    );



    // ========================================================
    // LIGHTBOX BACKGROUND CLICK
    // ========================================================

    if (lightbox) {

        lightbox.addEventListener(
            'click',
            (event) => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }



    // ========================================================
    // LIGHTBOX CLOSE BUTTON
    // ========================================================

    if (lightboxClose) {

        lightboxClose.addEventListener(
            'click',
            (event) => {

                event.stopPropagation();

                closeLightbox();

            }
        );

    }



    // ========================================================
    // LIGHTBOX PREVIOUS
    // ========================================================

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            'click',
            (event) => {

                event.stopPropagation();


                if (
                    !currentSlideshow.length
                ) {

                    return;

                }


                currentSlideIndex =
                    (
                        currentSlideIndex -
                        1 +
                        currentSlideshow.length
                    ) %
                    currentSlideshow.length;


                updateLightboxImage();

            }
        );

    }



    // ========================================================
    // LIGHTBOX NEXT
    // ========================================================

    if (lightboxNext) {

        lightboxNext.addEventListener(
            'click',
            (event) => {

                event.stopPropagation();


                if (
                    !currentSlideshow.length
                ) {

                    return;

                }


                currentSlideIndex =
                    (
                        currentSlideIndex +
                        1
                    ) %
                    currentSlideshow.length;


                updateLightboxImage();

            }
        );

    }



    // ========================================================
    // LIGHTBOX KEYBOARD
    // ========================================================

    document.addEventListener(
        'keydown',
        (event) => {

            if (
                !lightbox ||
                lightbox.classList.contains(
                    'hidden'
                )
            ) {

                return;

            }


            // Previous
            if (
                event.key ===
                'ArrowLeft'
            ) {

                currentSlideIndex =
                    (
                        currentSlideIndex -
                        1 +
                        currentSlideshow.length
                    ) %
                    currentSlideshow.length;


                updateLightboxImage();

            }


            // Next
            if (
                event.key ===
                'ArrowRight'
            ) {

                currentSlideIndex =
                    (
                        currentSlideIndex +
                        1
                    ) %
                    currentSlideshow.length;


                updateLightboxImage();

            }


            // Close
            if (
                event.key ===
                'Escape'
            ) {

                closeLightbox();

            }

        }
    );



    // ========================================================
    // INITIALIZE
    // ========================================================

    highlightNavigation();

});
