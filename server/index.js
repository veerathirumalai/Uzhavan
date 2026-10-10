const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// XAMPP MySQL தரவுத்தள இணைப்பு
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // உங்கள் XAMPP-ல் password இருந்தால் போடவும், இல்லையென்றால் காலியாக விடவும்
    database: "uzhavan_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Error:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// OTP-ஐ தற்காலிகமாக சேமிக்க
let tempOtpStore = {};

// 1. புதிய பதிவு (Register)
app.post('/register', (req, res) => {
    const { name, phone, role } = req.body;
    const sql = "INSERT INTO users (name, phone, role) VALUES (?, ?, ?)";
    db.query(sql, [name, phone, role], (err, result) => {
        if (err) return res.json({ status: "Error", message: "Phone number already registered" });
        return res.json({ status: "Success" });
    });
});

// 2. OTP அனுப்புதல் (Send OTP)
app.post('/send-otp', (req, res) => {
    const { phone } = req.body;
    const sql = "SELECT * FROM users WHERE phone = ?";
    db.query(sql, [phone], (err, data) => {
        if (err) return res.json({ status: "Error", message: "DB Error" });
        
        if (data.length > 0) {
            const otp = "1234"; // Testing-க்காக நிரந்தர OTP
            tempOtpStore[phone] = otp; 
            console.log(`[TESTING] OTP for ${phone} is ${otp}`);
            return res.json({ status: "Success" });
        } else {
            return res.json({ status: "Error", message: "User not found" });
        }
    });
});

// 3. OTP சரிபார்த்தல் (Verify OTP)
app.post('/verify-otp', (req, res) => {
    const { phone, otp } = req.body;
    
    if (tempOtpStore[phone] === otp) {
        const sql = "SELECT role FROM users WHERE phone = ?";
        db.query(sql, [phone], (err, data) => {
            if (err) return res.json({ status: "Error" });
            return res.json({ status: "Success", role: data[0].role });
        });
    } else {
        return res.json({ status: "Error", message: "Invalid OTP" });
    }
});

app.listen(5000, () => {
    console.log("Uzhavan Direct Server running on port 5000");
});