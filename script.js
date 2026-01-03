// Google Sheet CSV link
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTFz1yeNX1xDnzj2rqbnekapKB-TzZXu0x6FBvhHjnd2vBUC-Z8o_Vy9GYwscVbTBwBIAtDs-wfkwP/pub?output=csv";

let users = [];

// Fetch customer login data from Google Sheet
async function loadUsers() {
    try {
        const res = await fetch(SHEET_CSV_URL);
        const csv = await res.text();
        const rows = csv.split("\n").slice(1); // skip header

        users = rows.map(r => {
            const [customer_id, mobile, password, folder] = r.split(",");
            return {
                id: customer_id?.trim(),
                mobile: mobile?.trim(),
                password: password?.trim(),
                folder: folder?.trim()
            };
        }).filter(u => u.id && u.mobile && u.password && u.folder);

    } catch (err) {
        console.error("Error loading sheet data:", err);
    }
}

// Call loadUsers immediately
loadUsers();

// Login function
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
        // Redirect to gallery page with their folder
        window.location.href = `gallery.html?folder=${user.folder}`;
    } else {
        msg.innerText = "Invalid mobile number or password";
    }
}