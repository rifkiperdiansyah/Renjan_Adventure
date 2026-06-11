
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");
        const navbar = document.querySelector(".navbar"); // Ambil elemen navbar

        // Toggle menu saat hamburger diklik
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Smooth scroll untuk navigasi dan tutup menu
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault(); // Mencegah perilaku default anchor link

                const targetId = this.getAttribute("href");
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight; // Dapatkan tinggi navbar
                    const offsetTop = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth"
                    });

                    // Tutup menu setelah mengklik link
                    hamburger.classList.remove("active");
                    navLinks.classList.remove("active");
                }
            });
        });

        // Background Hero Auto Change (Slider)
        const hero = document.querySelector(".hero");
        const heroTitle = document.getElementById("hero-title");
        const heroDesc = document.getElementById("hero-desc");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        const heroData = [
            {
                img: 'img/bg1.jpeg',
                title: 'Jelajahi Alam Pangalengan <br> RENJANA ADVENTURE',
                desc: 'Nikmati pengalaman tak terlupakan dengan paket Rafting, Camping, dan Offroad terbaik di Bandung Selatan.'
            },
            {
                img: 'img/r1.jpg',
                title: 'Pacu Adrenalin <br> Arung Jeram',
                desc: 'Taklukkan jeram Sungai Palayangan yang menantang bersama instruktur profesional.'
            },
            {
                img: 'img/bg1.jpeg',
                title: 'Malam Tenang <br> Di Alam Pangalengan',
                desc: 'Rasakan kehangatan api unggun dan kenyamanan Luxury Camping di bawah bintang.'
            }
        ];

        let currentIndex = 0;
        let isTransitioning = false;

        function updateHero(index) {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex = index;

            // Tambahkan animasi keluar pada teks
            document.querySelector(".hero-content").style.opacity = "0";
            document.querySelector(".hero-content").style.transform = "translateY(20px)";

            setTimeout(() => {
                hero.style.backgroundImage = `url('${heroData[index].img}')`;
                heroTitle.innerHTML = heroData[index].title;
                heroDesc.innerHTML = heroData[index].desc;
                
                // Animasi masuk kembali
                document.querySelector(".hero-content").style.opacity = "1";
                document.querySelector(".hero-content").style.transform = "translateY(0)";
                
                setTimeout(() => { isTransitioning = false; }, 500);
            }, 500); // Setengah detik sinkron dengan transisi CSS
        }

        function nextSlide() {
            let next = (currentIndex + 1) % heroData.length;
            updateHero(next);
            resetHeroTimer();
        }

        function prevSlide() {
            let prev = (currentIndex - 1 + heroData.length) % heroData.length;
            updateHero(prev);
            resetHeroTimer();
        }

        // Inisialisasi tampilan pertama agar sesuai dengan heroData[0]
        updateHero(0);

        // Auto play slider agar teks dan BG berganti otomatis
        let heroTimer = setInterval(nextSlide, 5000);

        function resetHeroTimer() {
            clearInterval(heroTimer);
            heroTimer = setInterval(nextSlide, 5000);
        }

        // Event Listeners untuk Tombol
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        // Event Listener untuk Scroll (Mouse Wheel) di area Hero
        hero.addEventListener("wheel", (e) => {
            if (isTransitioning) return;
            
            if (e.deltaY > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        });

        // Floating Particles in Hero Section
        const particlesContainer = document.getElementById("particles-container");
        const numberOfParticles = 30; // Sesuaikan jumlah partikel sesuai keinginan

        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");

            const size = Math.random() * 10 + 5; // Ukuran antara 5px dan 15px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.left = `${Math.random() * 100}%`; // Posisi horizontal acak
            particle.style.top = `${Math.random() * 100}%`; // Posisi vertikal acak

            particle.style.animationDuration = `${Math.random() * 10 + 8}s`; // Durasi animasi 8s hingga 18s
            particle.style.animationDelay = `${Math.random() * -10}s`; // Penundaan animasi untuk efek staggered

            particlesContainer.appendChild(particle);
        }

        // --- Logic Modal Detail Paket ---
        const modal = document.getElementById("packageModal");
        const closeModal = document.querySelector(".close-modal");
        const modalPesanSekarangBtn = document.getElementById("modal-pesan-sekarang");

        document.querySelectorAll(".detail-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                const card = this.closest(".card");
                const imgSrc = card.querySelector(".card-img img").src;
                const title = card.querySelector("h3").innerText;
                const description = card.querySelector("p").innerText;
                const details = card.querySelector(".card-details").innerHTML;
                const price = card.querySelector(".price").innerText; // Ambil harga dari card
                const location = card.querySelector(".card-location").innerText; // Ambil lokasi

                document.getElementById("modal-img").src = imgSrc;
                document.getElementById("modal-title").innerText = title;
                document.getElementById("modal-desc").innerText = description;
                // Menambahkan harga dan lokasi ke modal-info
                document.getElementById("modal-info").innerHTML = `<p><strong>Harga:</strong> ${price}</p><p><strong>Lokasi:</strong> ${location}</p><span class="card-section-title">Termasuk:</span><ul class="card-details">${details}</ul>`;

                // Set link WhatsApp untuk tombol "Pesan Sekarang" di modal
                modalPesanSekarangBtn.href = `https://wa.me/6285842852643?text=Halo,%20saya%20tertarik%20dengan%20paket%20*${encodeURIComponent(title)}*%20(${encodeURIComponent(price)})%20yang%20berlokasi%20di%20${encodeURIComponent(location)}.%20Mohon%20informasi%20lebih%20lanjut.`;

                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Disable scroll saat modal buka
            });
        });

        closeModal.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }