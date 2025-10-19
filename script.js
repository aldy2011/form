// Logic
// === Fungsi halaman utama (main.html) ===
if (document.title === 'Daftar Klub Bola') {
  const tableBody = document.querySelector('#clubTable tbody');
  const clubs = JSON.parse(localStorage.getItem('clubs') || '[]');

  function renderTable() {
    tableBody.innerHTML = '';
    clubs.forEach((club, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${club.nama}</td>
          <td>${club.tahun}</td>
          <td>${club.logo}</td>
          <td>
            <button class="action-btn edit" onclick="editClub(${index})">Edit</button>
            <button class="action-btn delete" onclick="deleteClub(${index})">Hapus</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } window.editClub = (index) => {
    localStorage.setItem('editIndex', index);
    window.location.href = 'form.html';
  }
  
  window.deleteClub = function(index) {
    if (confirm('Apakah Anda yakin ingin menghapus klub ini?')) {
      clubs.splice(index, 1);
      localStorage.setItem('clubs', JSON.stringify(clubs));
      renderTable();
    }
  }
  window.goToForm = () => window.location.href = 'form.html';
  renderTable();
}
    
// === Fungsi halaman form (form.html) ===
if (document.title === 'Form Klub Bola') {
  const form = document.getElementById('clubForm');
  const editIndex = localStorage.getItem('editIndex');
  const clubs = JSON.parse(localStorage.getItem('clubs') || '[]');

  if (editIndex !== null) {
    document.getElementById('formTitle').textContent = 'Edit Klub';
    const club = clubs[editIndex];
    document.getElementById('nama').value = club.nama;
    document.getElementById('tahun').value = club.tahun;
    document.getElementById('logo').value = club.logo;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const tahun = document.getElementById('tahun').value.trim();
    const logo = document.getElementById('logo').value.trim();

    if (editIndex !== null) {
      clubs[editIndex] = { nama, tahun, logo };
      localStorage.removeItem('editIndex');
    } else {
      clubs.push({ nama, tahun, logo });
    }

    localStorage.setItem('clubs', JSON.stringify(clubs));
    window.location.href = 'main.html';
  });

  window.cancelForm = () => window.location.href = 'main.html';
}
