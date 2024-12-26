// Referensi ke elemen input tampilan
const display = document.getElementById('display');
const historyList = document.getElementById('history');

// Fungsi untuk membersihkan tampilan
function clearDisplay() {
    display.value = '';
}

// Fungsi untuk menambahkan karakter ke tampilan
function appendToDisplay(value) {
    display.value += value;
}

// Fungsi untuk menghapus karakter terakhir
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Fungsi untuk menghitung hasil ekspresi
function calculate() {
    try {
        let expression = display.value;

        // Proses persentase untuk berbagai operasi
        expression = expression.replace(/([\d.]+)\s*([\+\-\*\/])\s*([\d.]+)%/g, (match, num, operator, percent) => {
            num = parseFloat(num.replace(/\./g, '')); // Hapus titik ribuan
            const percentageValue = (num * parseFloat(percent)) / 100;

            switch (operator) {
                case '+':
                    return `${num} + ${percentageValue}`;
                case '-':
                    return `${num} - ${percentageValue}`;
                case '*':
                    return `${num} * (${parseFloat(percent)} / 100)`;
                case '/':
                    return `${num} / (${parseFloat(percent)} / 100)`;
                default:
                    return match; // Tidak ada perubahan jika operator tidak valid
            }
        });

        // Evaluasi ekspresi
        const result = eval(expression);

        if (result !== undefined) {
            const formattedResult = result.toLocaleString('id-ID');
            addToHistory(`${display.value} = ${formattedResult}`);
            display.value = formattedResult;
        }
    } catch (error) {
        alert('Perhitungan tidak valid');
    }
}

// Fungsi untuk menambahkan simbol persen
function percentage() {
    if (display.value !== '') {
        display.value += '%';
    }
}

// Fungsi untuk menambahkan ke riwayat
function addToHistory(entry) {
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    listItem.onclick = function () {
        display.value = entry.split(' = ')[0];
    };
    historyList.appendChild(listItem);
}

// Fungsi untuk menghapus riwayat
function clearHistory() {
    historyList.innerHTML = '';
}

// Fungsi untuk menangani input dari keyboard
function handleKeyboardInput(event) {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

// Tambahkan event listener untuk mendeteksi input keyboard
document.addEventListener('keydown', handleKeyboardInput);
