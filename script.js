// Google Sheet CSV link
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTFz1yeNX1xDnzj2rqbnekapKB-TzZXu0x6FBvhHjnd2vBUC-Z8o_Vy9GYwscVbTBwBIAtDs-wfkwP/pub?output=csv";

let users = [];

// Fetch customer login data from Google Sheet
fetch(SHEET_CSV_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    rows.forEach(r => {
      const [customer_id, mobile, password, folder] = r.split(",");
      if (customer_id && mobile && password && folder) {
        users.push({
          id: customer_id.trim(),
          mobile: mobile.trim(),
          password: password.trim(),
          folder: folder.trim()
        });
      }
    });
  })
  .catch(err => console.error("Error loading sheet data:", err));

// Login function called from form
function login(event) {
  event.preventDefault();

  const m = document.getElementById("mobile").value.trim();
  const p = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  const user = users.find(u => u.mobile === m && u.password === p);

  if (user) {
    // Redirect to gallery page with their folder
    window.location.href = `gallery.html?folder=${user.folder}`;
  } else {
    msg.innerText = "Invalid mobile number or password";
  }
}