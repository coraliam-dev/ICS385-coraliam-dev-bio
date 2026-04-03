// Course Catalog App (Vanilla JS, client-side)
// Author: UH Maui College
// Description: Interactive course catalog with validation, search, filter, modal, and export

let courseCatalog = null;
let filteredCourses = [];

// Load sample data on page load
fetch('sample-data.json')
  .then(res => res.json())
  .then(data => {
    courseCatalog = data;
    filteredCourses = getAllCourses();
    populateFilters();
    displayAllCourses();
    updateStatistics();
  })
  .catch(err => handleJSONError('Load Sample Data', err));

function getAllCourses() {
  if (!courseCatalog) return [];
  const all = [];
  courseCatalog.departments.forEach(dept => {
    dept.courses.forEach(course => {
      all.push({ ...course, departmentCode: dept.code, departmentName: dept.name });
    });
  });
  return all;
}

function populateFilters() {
  // Department filter
  const deptFilter = document.getElementById('departmentFilter');
  deptFilter.innerHTML = '<option value="all">All Departments</option>';
  courseCatalog.departments.forEach(dept => {
    deptFilter.innerHTML += `<option value="${dept.code}">${dept.name}</option>`;
  });
  // Credits filter
  const creditsFilter = document.getElementById('creditsFilter');
  creditsFilter.innerHTML = '<option value="all">All Credit Hours</option>';
  [1,2,3,4,5,6].forEach(cred => {
    creditsFilter.innerHTML += `<option value="${cred}">${cred} Credit${cred>1?'s':''}</option>`;
  });
}

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('departmentFilter').addEventListener('change', applyFilters);
document.getElementById('creditsFilter').addEventListener('change', applyFilters);
document.getElementById('exportBtn').addEventListener('click', exportCatalogJSON);

function applyFilters() {
  let courses = getAllCourses();
  const dept = document.getElementById('departmentFilter').value;
  const cred = document.getElementById('creditsFilter').value;
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (dept !== 'all') courses = courses.filter(c => c.departmentCode === dept);
  if (cred !== 'all') courses = courses.filter(c => String(c.credits) === cred);
  if (query.length > 0) {
    courses = courses.filter(c =>
      c.courseCode.toLowerCase().includes(query) ||
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.instructor.name.toLowerCase().includes(query) ||
      c.topics.some(t => t.toLowerCase().includes(query)) ||
      c.departmentName.toLowerCase().includes(query)
    );
  }
  filteredCourses = courses;
  displayAllCourses();
  updateStatistics();
}

function displayAllCourses() {
  const container = document.getElementById('coursesContainer');
  container.innerHTML = '';
  if (filteredCourses.length === 0) {
    container.innerHTML = '<div class="no-results">No courses found.</div>';
    return;
  }
  filteredCourses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-header">
        <span class="course-code">${course.courseCode}</span>
        <span class="course-title">${course.title}</span>
      </div>
      <div class="course-meta">
        <span class="course-credits">${course.credits} credits</span>
        <span class="course-instructor">${course.instructor.name}</span>
      </div>
      <div class="course-description">${course.description}</div>
    `;
    card.addEventListener('click', () => showCourseModal(course));
    container.appendChild(card);
  });
}

function showCourseModal(course) {
  document.getElementById('modalTitle').textContent = course.title;
  document.getElementById('modalCode').textContent = course.courseCode;
  document.getElementById('modalCredits').textContent = course.credits;
  document.getElementById('modalInstructor').textContent = course.instructor.name;
  document.getElementById('modalDescription').textContent = course.description;
  document.getElementById('modalDepartment').textContent = course.departmentName;
  const topicsList = document.getElementById('modalTopics');
  topicsList.innerHTML = '';
  course.topics.forEach(topic => {
    const li = document.createElement('li');
    li.textContent = topic;
    topicsList.appendChild(li);
  });
  const modal = document.getElementById('courseModal');
  modal.style.display = 'flex';
  document.getElementById('modalClose').onclick = () => { modal.style.display = 'none'; };
  window.onclick = function(event) {
    if (event.target === modal) modal.style.display = 'none';
  };
}

function updateStatistics() {
  document.getElementById('totalCourses').textContent = filteredCourses.length;
  const departments = new Set(filteredCourses.map(c => c.departmentName));
  document.getElementById('totalDepartments').textContent = departments.size;
  let avg = 0;
  if (filteredCourses.length > 0) {
    avg = Math.round(filteredCourses.reduce((sum, c) => sum + (c.schedule.enrolled / c.schedule.capacity), 0) / filteredCourses.length * 100);
  }
  document.getElementById('averageEnrollment').textContent = avg + '%';
}

function exportCatalogJSON() {
  const dataStr = JSON.stringify(courseCatalog, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'course_catalog.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Validation and error handling (reuse from previous step)
function validateCourseData(course) {
  const errors = [];
  const requiredStrings = ['courseCode', 'title', 'description'];
  requiredStrings.forEach(field => {
    if (!course[field] || typeof course[field] !== 'string' || course[field].trim().length === 0) {
      errors.push('Missing or invalid ' + field);
    }
  });
  if (!course.credits || !Number.isInteger(course.credits) || course.credits < 1 || course.credits > 6) {
    errors.push('Credits must be an integer between 1 and 6');
  }
  if (!course.instructor || typeof course.instructor !== 'object') {
    errors.push('Instructor information is required');
  } else {
    if (!course.instructor.name || !course.instructor.email) {
      errors.push('Instructor name and email are required');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (course.instructor.email && !emailRegex.test(course.instructor.email)) {
      errors.push('Invalid instructor email format');
    }
  }
  if (!course.schedule || typeof course.schedule !== 'object') {
    errors.push('Schedule information is required');
  } else {
    if (!Array.isArray(course.schedule.days) || course.schedule.days.length === 0) {
      errors.push('Schedule days must be a non-empty array');
    }
    if (typeof course.schedule.capacity !== 'number' || course.schedule.capacity < 1) {
      errors.push('Schedule capacity must be a positive number');
    }
    if (typeof course.schedule.enrolled !== 'number' || course.schedule.enrolled < 0) {
      errors.push('Schedule enrolled must be a non-negative number');
    }
    if (course.schedule.enrolled > course.schedule.capacity) {
      errors.push('Enrolled students cannot exceed capacity');
    }
  }
  if (!Array.isArray(course.topics)) {
    errors.push('Topics must be an array');
  } else if (course.topics.length === 0) {
    errors.push('At least one topic is required');
  }
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

function handleJSONError(operation, error) {
  let userMessage = 'An error occurred';
  if (error instanceof SyntaxError) {
    userMessage = 'Invalid JSON format: Please check your data structure';
  } else if (error.message && error.message.includes('Missing required fields')) {
    userMessage = 'Data validation failed: ' + error.message;
  } else if (error.message && error.message.includes('network')) {
    userMessage = 'Network error: Please check your connection';
  } else {
    userMessage = operation + ' failed: ' + error.message;
  }
  console.error('JSON Operation Error:', {
    operation: operation,
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  alert(userMessage);
}
