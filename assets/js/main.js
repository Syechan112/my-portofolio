        const texts = ["Explore my portfolio and discover brilliance!", "Unveil creativity through my portfolio!", "Step into my world of innovation!"];
        let textIndex = 0;
        let charIndex = 0;
        let currentText = '';
        let isDeleting = false;

        function type() {
            if (textIndex < texts.length) {
                if (!isDeleting && charIndex < texts[textIndex].length) {
                    currentText += texts[textIndex].charAt(charIndex);
                    charIndex++;
                } else if (isDeleting && charIndex > 0) {
                    currentText = currentText.substring(0, charIndex - 1);
                    charIndex--;
                }

                document.getElementById("typing-text").innerHTML = currentText;

                if (!isDeleting && charIndex === texts[textIndex].length) {
                    setTimeout(() => isDeleting = true, 2000); // Tunggu 2 detik sebelum mulai menghapus
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex++;
                    if (textIndex === texts.length) {
                        textIndex = 0; // Reset ke teks pertama setelah mencapai akhir
                    }
                }

                setTimeout(type, isDeleting ? 50 : 100); // Kecepatan mengetik dan menghapus
            }
        }

        // Mulai animasi mengetik
        type();

        
        document.addEventListener("DOMContentLoaded", () => {
            const lazyElements = document.querySelectorAll(".lazy");
        
            const lazyLoad = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
        
                        // Jika elemen adalah gambar, load src
                        const img = element.querySelector("img");
                        if (img) {
                            img.src = element.getAttribute("data-src");
                            img.onload = () => {
                                element.classList.add("loaded");  // Menambahkan kelas loaded
                            };
                        } else {
                            element.classList.add("loaded");  // Menambahkan kelas loaded untuk elemen lain
                        }
        
                        observer.unobserve(element);  // Hentikan pengamatan setelah elemen dimuat
                    }
                });
            };
        
            const observer = new IntersectionObserver(lazyLoad, {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,  // 10% elemen harus terlihat sebelum dimuat
            });
        
            lazyElements.forEach((el) => observer.observe(el));  // Mulai mengamati elemen lazy
        });
        



        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah form dari pengiriman default

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const chatId = '7067377059'; // Ganti dengan Chat ID Anda
            const token = '7826033315:AAHp5_qziUuqRsb2lgD-CBuMue4Kp2T25jg'; // Ganti dengan token bot Anda

            const text = `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`;
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        document.getElementById('successModal').classList.remove('hidden'); // Tampilkan modal
                        document.getElementById('contactForm').reset(); // Reset form setelah pengiriman
                    } else {
                        alert('Terjadi kesalahan saat mengirim pesan.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan saat mengirim pesan.');
                });
        });

        document.getElementById('closeModal').addEventListener('click', function() {
            document.getElementById('successModal').classList.add('hidden'); // Sembunyikan modal
        });
