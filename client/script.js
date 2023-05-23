const submitBtn = document.getElementById("submit-btn");
const checkbox = document.getElementById("formCheck");
const select = document.getElementById("facultySelect");
const tcNoInput = document.getElementById("tcNo");
const tcNoError = document.getElementById("tcNoError");

tcNoInput.addEventListener("input", function () {
  if (tcNoInput.value.length !== 11) {
    tcNoInput.classList.add("is-invalid");
    tcNoError.style.display = "block";
  } else {
    tcNoInput.classList.remove("is-invalid");
    tcNoError.style.display = "none";
  }
});

var faculties = [
  {
    name: "NECATİBEY EĞİTİM FAKÜLTESİ",
    departments: [
      "BİLGİSAYAR VE ÖĞRETİM TEKNOLOJİLERİ EĞİTİMİ BÖLÜMÜ",
      "EĞİTİM BİLİMLERİ BÖLÜMÜ",
      "MATEMATİK VE FEN BİLİMLERİ EĞİTİMİ BÖLÜMÜ",
    ],
  },
  {
    name: "FEN-EDEBİYAT FAKÜLTESİ",
    departments: [
      "BİYOLOJİ BÖLÜMÜ",
      "COĞRAFYA BÖLÜMÜ",
      "FİZİK BÖLÜMÜ",
      "KİMYA BÖLÜMÜ",
    ],
  },
  {
    name: "MÜHENDİSLİK FAKÜLTESİ",
    departments: [
      "BİLGİSAYAR MÜHENDİSLİĞİ BÖLÜMÜ",
      "ÇEVRE MÜHENDİSLİĞİ BÖLÜMÜ",
      "ELEKTRİK-ELEKTRONİK MÜHENDİSLİĞİ BÖLÜMÜ",
      "ENDÜSTRİ MÜHENDİSLİĞİ BÖLÜMÜ",
    ],
  },
];

// Fakülte seçimi değiştiğinde çalışacak fonksiyon
function handleFacultySelect() {
  // İkinci açılır menüyü sıfırla
  var departmentSelect = document.getElementById("departmentSelect");
  departmentSelect.innerHTML =
    "<option value=''>Önce bir fakülte seçiniz.</option>";

  // Seçilen fakültenin ana bilim dallarını bul
  var selectedFaculty = document.getElementById("facultySelect").value;
  var selectedDepartments = faculties.find(function (faculty) {
    return faculty.name === selectedFaculty;
  }).departments;

  // Ana bilim dallarını ikinci açılır menüye ekle
  selectedDepartments.forEach(function (department) {
    var option = document.createElement("option");
    option.value = department;
    option.text = department;
    departmentSelect.appendChild(option);
  });

  // İkinci açılır menüyü etkinleştir
  departmentSelect.disabled = false;
}

faculties.forEach((faculty) => {
  const option = document.createElement("option");
  option.text = faculty.name;
  option.value = faculty.name;
  select.add(option);
});
checkbox.addEventListener("change", function () {
  if (this.checked && tcNoInput.value.length === 11) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});
var facultySelect = document.getElementById("facultySelect");
facultySelect.addEventListener("change", handleFacultySelect);
