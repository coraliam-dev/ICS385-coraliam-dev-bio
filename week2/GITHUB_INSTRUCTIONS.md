# GitHub Repository Creation & Submission Guide

## Your Bio Website Project

Your bio website files are located at:
```
/Users/corita/Downloads/ics385spring2026/week2/ics385codepen-montalvo/dist/
```

### Files Included:
- ✅ `index.html` - Your personal bio page
- ✅ `style.css` - CSS stylesheet with custom styling
- ✅ All content personalized for Coralia Montalvo

---

## Part 1: Test Your Bio Locally ✓

**Before creating the GitHub repo, verify your website works:**

1. Open VS Code
2. Navigate to: `week2/ics385codepen-montalvo/dist/`
3. Right-click on `index.html`
4. Select "Open with Live Server" (or open directly in browser)
5. Verify:
   - Title appears: "I'm Coralia!"
   - Images display correctly
   - CSS styling is applied (colors, fonts, layout)
   - All text is readable
   - Contact button works

---

## Part 2: Create GitHub Public Repository

### Step 1: Go to GitHub
1. Visit https://github.com
2. Sign in to your account

### Step 2: Create New Repository
1. Click **+** icon (top right corner)
2. Select **New repository**
3. Fill in details:
   - **Repository name:** `ics385-bio` or `ics385spring2026-bio`
   - **Description:** "Bio website for ICS385 Spring 2026"
   - **Public** (IMPORTANT - must be public, not private)
   - **Add a README file** (optional but recommended)
4. Click **Create repository**

### Step 3: You'll see your repository URL
```
https://github.com/YOUR_USERNAME/ics385-bio
```
**Save this URL - you'll need it for Lamaku!**

---

## Part 3: Push Your Code to GitHub

### Using Terminal in VS Code:

1. **Open Terminal in VS Code**
   - View → Terminal (or Ctrl+`)

2. **Navigate to your bio folder:**
   ```bash
   cd /Users/corita/Downloads/ics385spring2026/week2/ics385codepen-montalvo/dist
   ```

3. **Initialize Git and add files:**
   ```bash
   git init
   git add .
   git commit -m "Add bio website with CSS styling"
   ```

4. **Connect to GitHub** (replace YOUR_USERNAME and YOUR_REPO_NAME):
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ics385-bio.git
   git push -u origin main
   ```

5. **If prompted for authentication:**
   - GitHub will open a browser window
   - Log in and authorize VS Code
   - Return to terminal - it should complete automatically

### After pushing:
✅ Your files are now on GitHub!
✅ Visit your repository URL to verify files are there

---

## Part 4: Create PDF with GitHub URL

### Option A: Using Google Docs (Recommended)
1. Open Google Docs
2. Create a simple document with:
   ```
   CORALIA MONTALVO - BIO WEBSITE SUBMISSION
   
   Course: ICS385 Spring 2026
   
   GitHub Repository URL:
   https://github.com/YOUR_USERNAME/ics385-bio
   
   Project includes:
   - Personal bio HTML page
   - Custom CSS styling
   - Responsive design with images
   - Contact section
   ```
3. File → Download → PDF Document
4. Save as `Coralia_Montalvo_Bio_GitHub.pdf`

### Option B: Using Word
1. Create a document with the same content
2. File → Export as PDF
3. Save the PDF file

---

## Part 5: Upload PDF to Lamaku

1. Log in to Lamaku (your course management system)
2. Navigate to **ICS385 Spring 2026** course
3. Find the **Bio Website Assignment** submission area
4. Click **Submit Assignment** or **Add Submission**
5. Upload your PDF file (the one with your GitHub URL)
6. Click **Submit**

---

## Verification Checklist

Before submitting, verify:
- ✅ HTML file displays correctly in browser
- ✅ CSS styling is applied
- ✅ GitHub repository is PUBLIC (not private)
- ✅ All files pushed to GitHub (you can see them at your repo URL)
- ✅ PDF created with GitHub URL
- ✅ PDF uploaded to Lamaku assignment

---

## Reference
Your assignment format is similar to:
https://github.com/debasisb/ics385spring2026

---

## Need Help?

If you encounter issues:
1. **GitHub authentication issues:** Use GitHub's token authentication
2. **CSS not showing:** Ensure `style.css` is in the same folder as `index.html`
3. **Files not on GitHub:** Run `git push -u origin main` again
4. **Can't find Lamaku submission:** Check course syllabus for assignment details

