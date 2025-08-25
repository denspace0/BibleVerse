# BibleVerse

**BibleVerse** is a full-stack Bible reading application that provides an interactive and personalized Bible reading experience. Built with modern web technologies like **React**, **Express**, and **TypeScript**, **BibleVerse** enables users to explore the **King James Version (KJV)** Bible with rich features such as verse search, bookmarking, in-depth explanations, and customizable reading preferences. The app leverages a **PostgreSQL** database to store user data, including preferences and saved bookmarks, and integrates with an external Bible API to fetch the KJV text.

---

## Key Features

### 1. **Interactive Bible Reading**
- **Read the King James Version (KJV)** of the Bible directly within the app.
- A clean, **user-friendly interface** designed for a seamless scripture reading experience.
- **Adjustable text display options**:
  - **Font size** for comfortable reading.
  - **Theme** (dark/light mode) to suit your environment.
  - **Layout** adjustments for an optimal experience.

---

### 2. **Verse Search**
- **Instantly search** for any verse or chapter in the Bible.
- **Efficient search results** that allow users to quickly locate specific passages.

---

### 3. **Bookmarking**
- Easily **save your favorite verses** or passages.
- Access your **saved bookmarks** with one click for future reference.
- **User-specific bookmarks** that sync with their account for a personalized experience across devices.

---

### 4. **Explanations & Commentaries**
- Get additional **explanations or commentaries** for Bible verses to deepen your understanding.
- **Explanations** include:
  - **Historical context**
  - **Interpretations**
  - **Theological insights**

---

### 5. **Customizable Reading Preferences**
- **Personalize** your Bible reading experience to suit your needs and preferences:
  - **Font size adjustments** for better readability.
  - **Dark and light mode themes** for comfortable reading in different environments.
  - **Customizable layout** options to match your style and reading habits.

---

### 6. **User Authentication**
- **Secure sign-up** and **login** functionality.
- **Session management** using **JWT (JSON Web Tokens)** to keep users logged in securely.
- Save bookmarks, preferences, and reading history under your user account, ensuring a seamless experience across multiple devices.

---

## Tech Stack

### **Frontend:**
- **React**: A modern JavaScript library for building dynamic user interfaces.
- **TypeScript**: A statically typed superset of JavaScript for better code quality and maintainability.
- **Styled Components / CSS**: For styling the app, ensuring a responsive and visually appealing design.

---

### **Backend:**
- **Express.js**: A minimalist web framework used to build the server-side API.
- **TypeScript**: Ensures type safety in the backend code, making the app more reliable and maintainable.

---

### **Database:**
- **PostgreSQL**: A powerful relational database used to store user information, including accounts, bookmarks, and reading preferences.

---

### **Bible API:**
- **External API**: Provides the **King James Version (KJV)** Bible text, ensuring users have access to accurate and up-to-date scripture data.

---

## How to Run

1. **Clone the repository**:

   ```bash
   git clone https://github.com/denspace0/BibleVerse.git
   cd bibleverse
