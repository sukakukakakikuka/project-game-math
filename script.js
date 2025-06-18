// script.js

let score = 0; // Inisialisasi skor
let currentQuestion = {}; // Variabel untuk menyimpan soal yang sedang aktif

// Fungsi untuk menghasilkan urutan matematika
function generateMathSequence() {
    // Definisi jenis-jenis urutan
    const sequenceTypes = [
        "arithmetic",
        "geometric",
        "fibonacci",
        "alternating",
        "squares",
        "primes",
        "mixed"
    ];

    // Pilih jenis urutan secara acak
    const chosenType = sequenceTypes[Math.floor(Math.random() * sequenceTypes.length)];
    let sequence = [];
    let answer = null;
    let questionString = ""; // String yang akan ditampilkan ke user

    // Logika pembuatan urutan berdasarkan jenis yang dipilih
    if (chosenType === "arithmetic") {
        const start = Math.floor(Math.random() * 10) + 1; // Angka awal 1-10
        const diff = Math.floor(Math.random() * 5) + 1; // Beda 1-5
        const length = 5; // Panjang urutan
        for (let i = 0; i < length; i++) {
            sequence.push(start + i * diff);
        }
        // Pilih indeks untuk angka yang hilang (bukan awal atau akhir)
        const missingIndex = Math.floor(Math.random() * (length - 3)) + 1; // Posisi 1, 2, atau 3
        answer = sequence[missingIndex];
        sequence[missingIndex] = "_";
    } else if (chosenType === "geometric") {
        const start = Math.floor(Math.random() * 3) + 1; // Angka awal 1-3
        const ratio = Math.floor(Math.random() * 3) + 2; // Rasio 2-4
        const length = 4;
        for (let i = 0; i < length; i++) {
            sequence.push(start * (ratio ** i));
        }
        const missingIndex = Math.floor(Math.random() * (length - 3)) + 1;
        answer = sequence[missingIndex];
        sequence[missingIndex] = "_";
    } else if (chosenType === "fibonacci") {
        let a = 1, b = 1;
        const length = 6;
        sequence = [a, b];
        for (let i = 2; i < length; i++) {
            [a, b] = [b, a + b];
            sequence.push(b);
        }
        // Pastikan angka yang hilang tidak terlalu awal atau terlalu akhir
        const missingIndex = Math.floor(Math.random() * (length - 4)) + 2; // Posisi 2, 3, atau 4
        answer = sequence[missingIndex];
        sequence[missingIndex] = "_";
    } else if (chosenType === "alternating") {
        const start = Math.floor(Math.random() * 5) + 1;
        const op1 = Math.floor(Math.random() * 3) + 1; // Untuk operasi pertama (misal +)
        const op2 = Math.floor(Math.random() * 3) + 1; // Untuk operasi kedua (misal -)
        const length = 6;
        sequence.push(start);
        for (let i = 1; i < length; i++) {
            if (i % 2 === 1) { // Indeks ganjil: tambahkan
                sequence.push(sequence[i - 1] + op1);
            } else { // Indeks genap: kurangkan
                sequence.push(sequence[i - 1] - op2);
            }
        }
        const missingIndex = Math.floor(Math.random() * (length - 3)) + 1;
        answer = sequence[missingIndex];
        sequence[missingIndex] = "_";
    } else if (chosenType === "squares") {
        const start = Math.floor(Math.random() * 3) + 1;
        const length = 5;
        for (let i = 0; i < length; i++) {
            sequence.push((start + i) ** 2);
        }
        const missingIndex = Math.floor(Math.random() * (length - 3)) + 1;
        answer = sequence[missingIndex];
        sequence[missingIndex] = "_";
    } else if (chosenType === "primes") {
        // Daftar bilangan prima yang cukup
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        if (primes.length >= 5) {
            const start_index = Math.floor(Math.random() * (primes.length - 5));
            // Ambil 5 bilangan prima berurutan
            sequence = primes.slice(start_index, start_index + 5);
            const missing_index = Math.floor(Math.random() * 3) + 1; // Posisi 1, 2, atau 3
            answer = sequence[missing_index];
            sequence[missing_index] = "_";
        } else {
            // Jika tidak cukup prima, coba generate ulang dengan tipe lain
            return generateMathSequence();
        }
    } else if (chosenType === "mixed") {
        // Contoh: menambahkan perbedaan yang meningkat (1, 2, 3, 4...)
        const start = Math.floor(Math.random() * 5) + 1;
        sequence.push(start);
        let diffAdder = 1;
        const length = 5;
        for (let i = 1; i < length; i++) {
            sequence.push(sequence[i - 1] + diffAdder);
            diffAdder += 1;
        }
        const missingIndex = Math.floor(Math.random() * 3) + 1;
        answer = sequence[missingIndex];
        sequence[missingIndex] = "_";
    }

    // Gabungkan array sequence menjadi string yang dipisahkan koma
    questionString = sequence.join(', ');
    return { question: questionString, answer: answer };
}

// Event listener untuk memastikan DOM sudah sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Mengambil referensi ke elemen-elemen HTML berdasarkan ID mereka
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');

    // Fungsi untuk memuat soal baru ke UI
    function loadNewQuestion() {
        currentQuestion = generateMathSequence(); // Panggil fungsi penghasil soal
        questionElement.textContent = currentQuestion.question; // Tampilkan soal di elemen <p>
        answerInput.value = ''; // Kosongkan input field
        feedbackElement.textContent = ''; // Hapus pesan feedback sebelumnya
        feedbackElement.className = ''; // Hapus class CSS feedback sebelumnya
        answerInput.focus(); // Atur fokus ke input field agar pengguna bisa langsung mengetik
    }

    // Fungsi untuk memperbarui tampilan skor
    function updateScoreDisplay() {
        scoreElement.textContent = `Score: ${score}`;
    }

    // Event listener untuk tombol 'Submit'
    submitButton.addEventListener('click', () => {
        const userAnswer = parseInt(answerInput.value); // Ambil nilai dari input dan konversi ke integer

        // Validasi input: pastikan pengguna memasukkan angka
        if (isNaN(userAnswer)) {
            feedbackElement.textContent = 'Please enter a number!';
            feedbackElement.className = 'warning'; // Tambahkan class warning untuk styling
            return; // Hentikan eksekusi jika bukan angka
        }

        // Cek apakah jawaban pengguna benar
        if (userAnswer === currentQuestion.answer) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.className = 'correct'; // Tambahkan class correct
            score += 1; // Tambah skor jika benar
            updateScoreDisplay(); // Perbarui tampilan skor
            // Muat soal baru setelah jeda 1.5 detik
            setTimeout(loadNewQuestion, 1500);
        } else {
            // Jika salah, tampilkan pesan salah dan jawaban yang benar
            feedbackElement.textContent = `Incorrect. The answer was ${currentQuestion.answer}.`;
            feedbackElement.className = 'incorrect'; // Tambahkan class incorrect
            // Tidak menambah skor jika salah, bisa juga dikurangi jika mau
        }
    });

    // Event listener untuk tombol 'Enter' pada input field
    answerInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitButton.click(); // Simulasikan klik tombol submit saat Enter ditekan
        }
    });

    // Panggil fungsi ini pertama kali saat halaman dimuat untuk menampilkan soal pertama
    loadNewQuestion();
    updateScoreDisplay(); // Tampilkan skor awal
});