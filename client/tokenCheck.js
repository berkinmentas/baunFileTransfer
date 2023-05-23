let authToken;
const authCookies = document.cookie;
const authCookieArray = authCookies.split("; ");
for (let i = 0; i < authCookieArray.length; i++) {
  const [name, value] = authCookieArray[i].split("=");
  if (name === "token") {
    authToken = value;
    break;
  } else {
    window.location.href = "login.html";
  }
}
TokenCheck(authToken);
async function TokenCheck(token) {
  try {
    const data = JSON.parse(atob(token.split(".")[1]));
    console.log(data);
    if (!data.role) {
      window.location.href = "login.html";
    } else {
      localStorage.setItem("user", data.role);
      return (role = data.role);
    }
  } catch {
    window.location.href = "login.html";
  }
}
