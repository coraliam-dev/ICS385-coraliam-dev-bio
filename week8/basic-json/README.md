# Week 8 - 5.2 JSON Assignment: basic-json

## Overview
This project demonstrates working with JSON data in a web application. It displays a searchable and filterable course catalog using data from a JSON file. The app is designed for ICS 385 Week 8, following all assignment deliverables and testing requirements.

## File Structure
```
week8/basic-json/
├── index.html
├── styles.css
├── course-catalog.js
├── sample-data.json
└── README.md
```

## Features
- Loads and displays a course catalog from sample-data.json
- Search courses by keyword (title, department, instructor, etc.)
- Filter by department and credits
- Responsive design for mobile and desktop
- Handles empty data, invalid JSON, and missing properties gracefully
- Well-commented code with meaningful variable names

## Setup Instructions
1. Clone or download this repository.
2. Navigate to the `week8/basic-json/` folder.
3. Open `index.html` in your web browser (no server required).

## Sample Data
- `sample-data.json` contains at least 8 courses across 3 departments (e.g., ICS, MATH, ENG).
- You can expand this file to test with 50+ courses for performance testing.

## Testing Requirements
- **Valid JSON:** App loads and displays all courses from a properly formatted JSON file.
- **Invalid JSON:** App shows a clear error message if the JSON is malformed.
- **Empty Data:** App displays a friendly message if there are no courses or missing properties.
- **Search Functionality:** Test with various keywords, including edge cases (e.g., partial matches, case sensitivity).
- **Filter Combinations:** Use department and credit filters together to refine results.
- **Data Limits:** App remains responsive with large datasets (50+ courses).
- **Mobile Testing:** Layout adapts for different screen sizes; test on phone/tablet.

## Live Demo
You can deploy this project to GitHub Pages for a live demo. To do so:
1. Push the `week8/basic-json/` folder to your GitHub repository.
2. In your repo settings, enable GitHub Pages and set the source to the `main` branch and `/week8/basic-json/` folder.
3. Share the provided GitHub Pages URL for grading.

---

For any issues or questions, please contact the project author.
