//console.log(document);
function sendMessage() {
  chrome.runtime.sendMessage({ action: "popup" });
  console.log("Popup message send");
}

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    //console.log("It Ran");
    const alert = document.querySelector("p.alert");
    const func = async () => {
      //console.log("RUnning");
      const [ID] = await Promise.all([chrome.storage.local.get("lpuId")]);
      const [PASS] = await Promise.all([
        chrome.storage.local.get("lpuPassword"),
      ]);
      const id = ID.lpuId;
      const pass = PASS.lpuPassword;
      const input = document.querySelector(
        "#jsena > table > tbody > tr > td > div.container > div > div.col-lg-4.login-field > div:nth-child(2) > input[type=text]"
      );
      if (input) {
        input.value = id;
        console.log(id);
      }
      const password = document.querySelector(
        "#jsena > table > tbody > tr > td > div.container > div > div.col-lg-4.login-field > div:nth-child(3) > input[type=password]"
      );
      if (password) {
        password.value = pass;
        console.log(pass);
      }
      const agreePolicy = document.querySelector("#agreepolicy");
      if (agreePolicy) {
        console.log(agreePolicy);
        agreePolicy.click();
      }
      const loginBtn = document.querySelector("#loginbtn");
      if (loginBtn) {
        console.log(loginBtn);
        loginBtn.click();
      }
    };
    if (alert) {
      if (alert.innerHTML == "<strong>Wrong username/password</strong>") {
        console.log("Error");
        console.log(alert);
        sendMessage();
      } else {
        func();
        //sendMessage();
      }
    } else {
      //console.log("TRIGGERING");
      //sendMessage();
      func();
    }
  }
};
