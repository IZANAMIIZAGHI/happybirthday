document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const mainContent = document.getElementById('mainContent');
    const playMusicBtn = document.getElementById('playMusic');
    const bgMusic = document.getElementById('bgMusic');
    const rsvpForm = document.getElementById('rsvpForm');
    const countdownElement = document.getElementById('countdown');
    const jsConfetti = new JSConfetti();

    // Buka amplop
    envelope.addEventListener('click', function() {
        this.classList.add('open');
        setTimeout(() => {
            mainContent.classList.remove('hidden');
            envelope.classList.add('hidden');
        }, 1000);
    });

    // Putar musik
    playMusicBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.play();
            this.textContent = 'Jeda Musik';
        } else {
            bgMusic.pause();
            this.textContent = 'Putar Musik';
        }
    });

    // Form RSVP
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value;
        
        // Simpan data (bisa diganti dengan AJAX request ke server)
        console.log('RSVP Data:', { name, attendance, message });
        
        // Tampilkan konfetti
        jsConfetti.addConfetti({
            emojis: ['🎉', '🎊', '🎈', '🎁', '🥳'],
            emojiSize: 50,
            confettiNumber: 50,
        });
        
        alert('Terima kasih atas konfirmasinya!');
        this.reset();
    });

    // Countdown timer
    function updateCountdown() {
        const birthdayDate = new Date('June 15, 2024 19:00:00').getTime();
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = "Acara sudah berlangsung!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Tampilkan konfetti acak sesekali
    setInterval(() => {
        if (Math.random() > 0.7) {
            jsConfetti.addConfetti();
        }
    }, 5000);
});