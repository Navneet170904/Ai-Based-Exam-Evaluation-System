# 🧠 AI-Based Exam Evaluation System

An intelligent, end-to-end exam evaluation platform that leverages **Artificial Intelligence** to automate the grading of student answer sheets. This system enhances the speed, accuracy, and consistency of exam evaluations by utilizing modern OCR and NLP models, with a full-stack architecture built using **React.js**, **Flask**, and **MongoDB**.

---

## 🚀 Tech Stack

| Layer         | Technology                |
|---------------|----------------------------|
| **Frontend**  | React.js                   |
| **Backend**   | Python (Flask)             |
| **Database**  | MongoDB                    |
| **AI Model**  | OCR (e.g., Tesseract), NLP models (custom or pretrained) |
| **Others**    | OpenCV, Pandas, NumPy, Excel (xlsxwriter / openpyxl) |

---

## ⚙️ Key Features

- 📤 **Image Upload** – Upload scanned answer sheets.
- 🧠 **AI-Powered Grading** – Automated answer extraction and evaluation.
- 📊 **Marksheet Generation** – Export evaluated scores to Excel.
- 🔁 **Batch Processing** – Upload and evaluate multiple sheets at once.
- 🖼️ **Visual Confirmation** – View predictions and extracted content.
- 💾 **MongoDB Integration** – Store student data and evaluations persistently.
- 🌐 **RESTful API** – Seamless frontend-backend communication.

---

## 📁 Folder Structure

| Path / Folder            | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `app.py`                 | Main Flask backend application file.                                        |
| `frontend/`              | React.js frontend interface for uploading sheets and displaying results.    |
| `model/`                 | Contains OCR/NLP models and evaluation logic.                               |
| `uploads/`               | Stores uploaded student answer sheet images.                                |
| `test_images/`           | Contains sample images used for testing the model.                          |
| `confirm_images/`        | AI-confirmed output images after processing and evaluation.                 |
| `predict/results/`       | Generated predictions and annotated result images.                          |
| `roll1.jpg`              | Sample image file for demonstration/testing.                                |
| `student_marks.xlsx`     | Final Excel sheet containing evaluated student marks.                       |
| `.gitignore`             | Specifies files and directories to be ignored by Git version control.       |
| `README.md`              | Documentation file describing the project structure and usage.              |


---

## 🖼️ Frontend (React.js)

### Path: `frontend/`

- Built using React with functional components and hooks.
- Connects to Flask API for evaluation and result fetch.
- Provides a clean and intuitive UI for examiners/admins.

> Run the frontend:

```bash
cd frontend
npm install
npm start
```

### App will run at http://localhost:5173

---

## 🔙 Backend (Flask)

**Path**: `app.py`, `model/`

- Built with Python’s **Flask** framework.
- Accepts file uploads via REST APIs.
- Calls OCR/NLP model for text extraction and grading logic.
- Connects to **MongoDB** for storing student evaluations.

### ▶️ Run the Backend

```bash

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

### 🖥️ Server runs at: http://localhost:5000

---

## 🧪 Evaluation Workflow

1. Upload **Answer Sheet(s)** via the React.js frontend interface.
2. An **API call** is made to the Flask backend.
3. Flask invokes the OCR/NLP model located in the `model/` directory to extract and evaluate answers.
4. The evaluation result is stored in **MongoDB** and also exported to an Excel file (`student_marks.xlsx`).
5. Final marks and results are displayed and visualized on the frontend.

---

## ✅ Future Enhancements

- 📝 Integrate deep learning models for **subjective answer evaluation** (e.g., BERT, RoBERTa).
- ☁️ Deploy the entire application on the **cloud using Docker** and platforms like **AWS** or **GCP**.
- 🔐 Add **authentication**, **role-based access**, and **student dashboards**.
- 📉 Incorporate **data analytics** modules for performance trends, reports, and heatmaps.

---

## 🧑‍💻 Author

**Navneet Kumar Yadav**  
CSE (AI & ML) Graduate | Backend & AI Developer

📫 [LinkedIn](https://www.linkedin.com/in/navneet-kumar-yadav/)  
🔗 GitHub: (https://github.com/Navneet170904)


