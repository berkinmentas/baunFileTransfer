// Gerekli form elemanlarını seçin
const loginForm = document.getElementById("loginForm");
const tcInput = document.getElementById("loginTC");
const passwordInput = document.getElementById("loginPswd");
const submitButton = document.getElementById("submit-btn");

// Formdaki input alanlarından herhangi biri değiştiğinde kontrol fonksiyonunu çağırın
tcInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);

// Formun geçerlilik durumunu kontrol eden fonksiyon
function validateForm() {
  const tcValue = tcInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // T.C. Kimlik Numarası 11 karakterden uzunsa hata mesajını göster
  if (tcValue.length > 11) {
    tcInput.classList.add("is-invalid");
    document.getElementById("tcNoError").style.display = "block";
  } else {
    tcInput.classList.remove("is-invalid");
    document.getElementById("tcNoError").style.display = "none";
  }

  // T.C. Kimlik Numarası ve Şifre alanları doluysa Gönder butonunu etkinleştir
  if (tcValue && passwordValue) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
loginTC.addEventListener("input", function () {
  if (loginTC.value.length !== 11) {
    loginTC.classList.add("is-invalid");
    tcNoError.style.display = "block";
  } else {
    loginTC.classList.remove("is-invalid");
    tcNoError.style.display = "none";
  }
});
