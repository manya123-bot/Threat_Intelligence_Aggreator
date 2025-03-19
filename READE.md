# **Autonomous Threat Intelligence Aggregator (ATIA)**
🚀 **ATIA** is a full-stack web application that automates the collection and analysis of threat intelligence data from multiple security APIs. It helps in identifying **malicious IPs, vulnerabilities, and threats** in real time.

## **🌟 Features**
- 📡 Fetches threat intelligence data from:
  - **AbuseIPDB** – IP reputation & abuse history.
  - **VirusTotal** – Malware reports & domain analysis.
  - **Shodan** – Open ports, services, and vulnerabilities.
- 💾 **Stores data** in MongoDB for future reference.
- 🌍 **REST API** with Express.js for easy integration.
- 📊 **Simple Frontend UI** to enter IPs and view reports.
- 🔐 **Environment Variables** for security.

---

## **🛠 Tech Stack**
- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MongoDB (Mongoose ODM)
- **APIs Used:** AbuseIPDB, VirusTotal, Shodan
- **Other Dependencies:** Axios, dotenv, cors, body-parser

---

## **📂 Project Structure**
```
Project_ATIA/
│── node_modules/         # Installed dependencies
│── Project_ATIA/         # Main project directory
│── .env                  # API keys and configurations
│── app.js                # Main Express server
│── home.html             # Basic frontend UI
│── package.json          # Dependencies list
│── package-lock.json     # Ensures dependency consistency
```

---

## **🚀 Getting Started**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/Project_ATIA.git
cd Project_ATIA
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```
ABUSEIPDB_API_KEY=your_api_key
VIRUSTOTAL_API_KEY=your_api_key
SHODAN_API_KEY=your_api_key
MONGO_URI=mongodb://localhost:27017/ThreatIntel
```

### **4️⃣ Start the Server**
```sh
node app.js
```
Server runs at: **http://localhost:3000**

---

## **📌 API Endpoints**
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| GET    | `/`            | Loads `home.html` |
| POST   | `/fetch_data`  | Fetches threat intelligence for an IP |

---

## **📌 Future Enhancements**
✅ Improve frontend UI with **React.js**  
✅ Add **JWT authentication** for secure access  
✅ Implement **dashboard analytics** for visualizing threats  

---

## **📜 License**
This project is **open-source** and available under the **MIT License**.

---

### ⭐ **Contribute & Support**
If you find this useful, feel free to **star ⭐ the repo** and contribute!

🔗 GitHub: [Your Repository Link](https://github.com/your-username/Project_ATIA)
