// Google Sheet CSV link (publish as CSV)
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTFz1yeNX1xDnzj2rqbnekapKB-TzZXu0x6FBvhHjnd2vBUC-Z8o_Vy9GYwscVbTBwBIAtDs-wfkwP/pub?output=csv";

let users = [];

window.onload = async function() {
    const msg = document.getElementById("msg");
    const loginBtn = document.getElementById("loginBtn");

    try {
        const res = await fetch(SHEET_CSV_URL);
        const csv = await res.text();
        const rows = csv.split("\n").slice(1); // skip header

        users = rows.map(r => {
            const [id, mobile, password, folder] = r.split(",");
            return { id: id?.trim(), mobile: mobile?.trim(), password: password?.trim(), folder: folder?.trim() };
        }).filter(u => u.id && u.mobile && u.password && u.folder);

        loginBtn.disabled = false; // Enable login after data loads
    } catch (err) {
        console.error("Error loading sheet:", err);
        msg.innerText = "Cannot load data. Try again later.";
    }
}

function login(event) {
    event.preventDefault();

    const m = document.getElementById("mobile").value.trim();
    const p = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    if (users.length === 0) {
        msg.innerText = "Please wait, loading data...";
        return;
    }

    const user = users.find(u => u.mobile === m && u.password === p);

    if (user) {
        window.location.href = `gallery.html?folder=${user.folder}`;
    } else {
        msg.innerText = "Invalid mobile number or password";
    }
}