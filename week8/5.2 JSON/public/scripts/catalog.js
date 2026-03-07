// Comprehensive validation for JSON course data
function validateCourseData(course) {
  const errors = [];
  // Required string fields
  const requiredStrings = ['courseCode', 'title', 'description'];
  requiredStrings.forEach(field => {
    if (!course[field] || typeof course[field] !== 'string' || course[field].trim().length === 0) {
      errors.push('Missing or invalid ' + field);
    }
  });
  // Validate credits (must be positive integer 1-6)
  if (!course.credits || !Number.isInteger(course.credits) || course.credits < 1 || course.credits > 6) {
    errors.push('Credits must be an integer between 1 and 6');
  }
  // Validate instructor object
  if (!course.instructor || typeof course.instructor !== 'object') {
    errors.push('Instructor information is required');
  } else {
    if (!course.instructor.name || !course.instructor.email) {
      errors.push('Instructor name and email are required');
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (course.instructor.email && !emailRegex.test(course.instructor.email)) {
      errors.push('Invalid instructor email format');
    }
  }
  // Validate schedule object
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
  // Validate topics array
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

// Error handling for JSON operations
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
  // Log technical details for debugging
  console.error('JSON Operation Error:', {
    operation: operation,
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  // Display user-friendly message
  if (typeof showErrorMessage === 'function') {
    showErrorMessage(userMessage);
  } else {
    alert(userMessage);
  }
}
// CourseCatalogManager - Core Implementation
class CourseCatalogManager {
      setupExportButton() {
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
          exportBtn.addEventListener('click', () => {
            this.exportCatalogJSON();
          });
        }
      }

      exportCatalogJSON() {
        const dataStr = JSON.stringify(this.courseCatalog, null, 2);
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
    updateStatistics() {
      // Total courses
      const totalCourses = this.filteredCourses.length;
      const totalCoursesElem = document.getElementById('totalCourses');
      if (totalCoursesElem) totalCoursesElem.textContent = totalCourses;

      // Unique departments
      const departments = new Set(this.filteredCourses.map(c => c.departmentName));
      const totalDepartmentsElem = document.getElementById('totalDepartments');
      if (totalDepartmentsElem) totalDepartmentsElem.textContent = departments.size;

      // Average enrollment (as percent of capacity)
      let avg = 0;
      if (totalCourses > 0) {
        avg = Math.round(
          this.filteredCourses.reduce((sum, c) => sum + (c.schedule.enrolled / c.schedule.capacity), 0) / totalCourses * 100
        );
      }
      const avgElem = document.getElementById('averageEnrollment');
      if (avgElem) avgElem.textContent = avg + '%';
    }
  constructor() {
    this.courseCatalog = null;
    this.filteredCourses = [];
    this.currentView = 'all';
    this.searchCache = new Map();
    this.initializeApp();
  }
  initializeApp() {
    try {
      this.setupEventListeners();
      this.setupExportButton();
      this.loadCourseData(JSON.stringify(window.catalogJSON));
      this.displayStatistics();
    } catch (error) {
      this.handleError('Application initialization failed', error);
    }
  }
  setupEventListeners() {
    // Search bar event listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchCourses(e.target.value);
      });
    }

    // Department filter
    const deptFilter = document.getElementById('departmentFilter');
    if (deptFilter) {
      deptFilter.addEventListener('change', () => {
        this.applyFilters();
      });
    }

    // Credits filter
    const creditsFilter = document.getElementById('creditsFilter');
    if (creditsFilter) {
      creditsFilter.addEventListener('change', () => {
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    const deptFilter = document.getElementById('departmentFilter');
    const creditsFilter = document.getElementById('creditsFilter');
    const searchInput = document.getElementById('searchInput');
    let courses = this.getAllCourses();

    // Department filter
    if (deptFilter && deptFilter.value !== 'all') {
      courses = courses.filter(course => course.departmentCode === deptFilter.value);
    }

    // Credits filter
    if (creditsFilter && creditsFilter.value !== 'all') {
      courses = courses.filter(course => String(course.credits) === creditsFilter.value);
    }

    // Search filter
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (query.length > 0) {
      courses = courses.filter(course =>
        course.courseCode.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.name.toLowerCase().includes(query) ||
        course.topics.some(topic => topic.toLowerCase().includes(query)) ||
        course.departmentName.toLowerCase().includes(query)
      );
    }

    this.filteredCourses = courses;
    this.displayAllCourses();
    this.updateStatistics();
  }
    searchCourses(query) {
      if (!query || query.trim().length === 0) {
        this.filteredCourses = this.getAllCourses();
        this.displayAllCourses();
        return;
      }
      const searchTerm = query.toLowerCase().trim();
      // Check cache for performance
      if (this.searchCache.has(searchTerm)) {
        this.filteredCourses = this.searchCache.get(searchTerm);
        this.displayAllCourses();
        return;
      }
      // Perform comprehensive search
      const results = this.getAllCourses().filter(course => {
        return course.courseCode.toLowerCase().includes(searchTerm) ||
          course.title.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm) ||
          course.instructor.name.toLowerCase().includes(searchTerm) ||
          course.topics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
          course.departmentName.toLowerCase().includes(searchTerm);
      });
      // Cache results
      this.searchCache.set(searchTerm, results);
      this.filteredCourses = results;
      this.displayAllCourses();
      // Optionally update search stats here
    }
  async loadCourseData(jsonString) {
    try {
      if (!jsonString || typeof jsonString !== 'string') {
        throw new Error('Invalid input: JSON string required');
      }
      const data = JSON.parse(jsonString);
      this.validateCatalogStructure(data);
      this.courseCatalog = data;
      this.filteredCourses = this.getAllCourses();
      this.displayAllCourses();
      this.displayStatistics();
      console.log('Course catalog loaded successfully');
      this.showSuccessMessage('Course catalog loaded with ' + this.filteredCourses.length + ' courses');
    } catch (error) {
      console.error('JSON parsing error:', error);
      this.handleError('Failed to load course data', error);
    }
  }
  validateCatalogStructure(data) {
    const required = ['university', 'semester', 'departments', 'metadata'];
    const missing = required.filter(field => !data.hasOwnProperty(field));
    if (missing.length > 0) {
      throw new Error('Missing required fields: ' + missing.join(', '));
    }
    if (!Array.isArray(data.departments) || data.departments.length === 0) {
      throw new Error('Departments array is required and must contain at least one department');
    }
    data.departments.forEach((dept, index) => {
      if (!dept.code || !dept.name || !Array.isArray(dept.courses)) {
        throw new Error('Department ' + index + ' missing required fields');
      }
    });
  }
  getAllCourses() {
    if (!this.courseCatalog) return [];
    const allCourses = [];
    this.courseCatalog.departments.forEach(dept => {
      dept.courses.forEach(course => {
        allCourses.push({
          ...course,
          departmentCode: dept.code,
          departmentName: dept.name
        });
      });
    });
    return allCourses;
  }
  createCourseCard(course) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'course-card';
    cardDiv.dataset.courseCode = course.courseCode;
    const enrollmentPercent = Math.round((course.schedule.enrolled / course.schedule.capacity) * 100);
    const enrollmentStatus = enrollmentPercent >= 90 ? 'full' : enrollmentPercent >= 70 ? 'filling' : 'open';
    const cardHTML =
      '<div class="course-header">' +
      '<h3 class="course-code">' + course.courseCode + '</h3>' +
      '<span class="credits">' + course.credits + ' credits</span>' +
      '</div>' +
      '<h4 class="course-title">' + course.title + '</h4>' +
      '<p class="course-description">' + this.truncateText(course.description, 120) + '</p>' +
      '<div class="instructor-info">' +
      '<strong>Instructor:</strong> ' + course.instructor.name +
      '</div>' +
      '<div class="schedule-info">' +
      '<strong>Schedule:</strong> ' + course.schedule.days.join(', ') + ' ' + course.schedule.time +
      '</div>' +
      '<div class="enrollment-info ' + enrollmentStatus + '">' +
      'Enrolled: ' + course.schedule.enrolled + '/' + course.schedule.capacity + ' (' + enrollmentPercent + '%)' +
      '</div>' +
      '<div class="topics">' +
      course.topics.map(topic => '<span class="topic-tag">' + topic + '</span>').join('') +
      '</div>' +
      '<button class="details-btn" onclick="app.showCourseDetails(\'' + course.courseCode + '\')">' +
      'View Details' +
      '</button>';
    cardDiv.innerHTML = cardHTML;
      cardDiv.addEventListener('click', () => {
        this.showCourseModal(course);
      });
    return cardDiv;
  }

    showCourseModal(course) {
      const modal = document.getElementById('courseModal');
      if (!modal) return;
      document.getElementById('modalTitle').textContent = course.title;
      document.getElementById('modalCode').textContent = course.courseCode;
      document.getElementById('modalCredits').textContent = course.credits;
      document.getElementById('modalInstructor').textContent = course.instructor.name;
      document.getElementById('modalDescription').textContent = course.description;
      document.getElementById('modalDepartment').textContent = course.departmentName;
      const topicsList = document.getElementById('modalTopics');
      if (topicsList) {
        topicsList.innerHTML = '';
        course.topics.forEach(topic => {
          const li = document.createElement('li');
          li.textContent = topic;
          topicsList.appendChild(li);
        });
      }
      modal.style.display = 'block';
      const closeBtn = document.getElementById('modalClose');
      if (closeBtn) {
        closeBtn.onclick = () => { modal.style.display = 'none'; };
      }
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    }
  displayAllCourses() {
    const container = document.getElementById('coursesContainer');
    if (!container) {
      console.error('Courses container not found');
      return;
    }
    container.innerHTML = '';
    if (this.filteredCourses.length === 0) {
      container.innerHTML = '<div class="no-results">No courses found matching your criteria.</div>';
      return;
    }
    this.filteredCourses.forEach(course => {
      const courseCard = this.createCourseCard(course);
      container.appendChild(courseCard);
    });
    this.updateStatistics();
  }
  displayStatistics() {
    // Placeholder for statistics display
  }
  showSuccessMessage(msg) {
    // Placeholder for user feedback
  }
  handleError(msg, error) {
    alert(msg + ': ' + (error && error.message ? error.message : error));
  }
  truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }
  showCourseDetails(courseCode) {
    alert('Show details for ' + courseCode);
  }
  updateDisplayStats() {
    // Placeholder for updating stats
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.app = new CourseCatalogManager();
});
