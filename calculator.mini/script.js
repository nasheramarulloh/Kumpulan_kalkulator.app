// Ambil elemen input untuk tampilan kalkulator dan elemen histori
const display = document.querySelector('.display');
const historyList = document.getElementById('history-list');

// Fungsi untuk menambahkan item ke histori
function addHistory(expression, result) {
  const historyItem = document.createElement('li');
  historyItem.textContent = `${expression} = ${result}`;
  
  // Tambahkan event listener untuk mengklik histori dan menampilkan ekspresi di input
  historyItem.addEventListener('click', function () {
    display.value = expression; // Menampilkan ekspresi di input kalkulator
  });

  historyList.appendChild(historyItem);
}

// Fungsi untuk menghapus pemisah ribuan (titik) sebelum melakukan perhitungan
function parseNumber(number) {
  return parseFloat(number.replace(/\./g, '').replace(',', '.'));
}

// Fungsi untuk menambahkan kembali pemisah ribuan (titik)
function formatNumber(number) {
  return number.toLocaleString('id-ID', { maximumFractionDigits: 2 });
}

// Fungsi untuk menghitung persentase
function calculatePercentage(total, percentage) {
  return total - (total * (percentage / 100));
}

// Fungsi untuk menghitung hasil
function calculateResult() {
  try {
    let expression = display.value;

    // Tangani persentase
    if (expression.includes('%')) {
      const [total, percentage] = expression.split('-');
      const totalValue = parseNumber(total.trim());
      const percentageValue = parseNumber(percentage.trim().replace('%', ''));
      const result = calculatePercentage(totalValue, percentageValue);

      display.value = formatNumber(result); // Format hasil dengan pemisah ribuan
      addHistory(expression, formatNumber(result)); // Tambahkan ke histori
      return;
    }

    // Hapus pemisah ribuan sebelum menghitung
    expression = expression.replace(/\./g, '').replace(',', '.');
    const result = eval(expression);

    display.value = formatNumber(result);
    addHistory(expression, formatNumber(result));
  } catch (e) {
    display.value = 'Error';
  }
}

// Event listener untuk tombol kalkulator
document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', function () {
    const value = button.getAttribute('data-value');
    if (value === 'AC') {
      display.value = '';
    } else if (value === 'backspace') {
      display.value = display.value.slice(0, -1);
    } else if (value === '=') {
      calculateResult();
    } else {
      display.value += value;
    }
  });
});

// Event listener untuk keyboard input
document.addEventListener('keydown', function (event) {
  const key = event.key;

  // Cek apakah tombol yang ditekan adalah angka atau operator yang valid
  if (/[\d\/*+\-\.%]/.test(key)) {
    display.value += key;
  }

  // Jika tombol enter (=) ditekan, lakukan perhitungan
  if (key === 'Enter') {
    calculateResult();
  }

  // Jika tombol backspace ditekan, hapus karakter terakhir
  if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  }

  // Jika tombol escape (AC) ditekan, reset tampilan kalkulator
  if (key === 'Escape') {
    display.value = '';
  }
});

// Menambahkan fungsionalitas untuk tombol clear history
const clearHistoryButton = document.getElementById('clear-history');
clearHistoryButton.addEventListener('click', function () {
  historyList.innerHTML = ''; // Menghapus semua item dalam histori
});
