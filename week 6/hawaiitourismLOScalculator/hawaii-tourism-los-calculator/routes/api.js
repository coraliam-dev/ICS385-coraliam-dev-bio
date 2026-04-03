const express = require('express');
const router = express.Router();
const TourismData = require('../models/TourismData');

// Get all unique categories (groups)
// GenAI: Returns a sorted list of all unique visitor categories from the database.
router.get('/categories', async (req, res) => {
  try {
    const categories = await TourismData.distinct('group');
    res.json({ success: true, data: categories.sort() });
  } catch (error) {
    // GenAI: Handles unexpected errors and returns a 500 status code.
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all unique locations (indicators)
// GenAI: Returns a sorted list of all unique location indicators from the database.
router.get('/locations', async (req, res) => {
  try {
    const locations = await TourismData.distinct('indicator');
    res.json({ success: true, data: locations.sort() });
  } catch (error) {
    // GenAI: Handles unexpected errors and returns a 500 status code.
    res.status(500).json({ success: false, error: error.message });
  }
});

// Calculate average length of stay
// GenAI: This endpoint calculates statistics for the average length of stay based on category and optional location.
router.post('/calculate', async (req, res) => {
  try {
    // GenAI: Input validation for security - ensures category is present and both fields are strings of reasonable length.
    const { category, location } = req.body;
    if (!category || typeof category !== 'string' || category.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Valid category is required'
      });
    }
    if (location && (typeof location !== 'string' || location.length > 100)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid location format'
      });
    }

    // GenAI: Build MongoDB query based on input
    const query = { group: category };
    if (location) {
      query.indicator = location;
    }

    // GenAI: Find all records matching the query
    const records = await TourismData.find(query);

    if (records.length === 0) {
      // GenAI: No data found for the given criteria
      return res.status(404).json({
        success: false,
        error: 'No data found for the specified criteria'
      });
    }

    // GenAI: Collect all yearly values for statistics
    const allValues = [];
    records.forEach(record => {
      record.yearlyData.forEach(yearData => {
        allValues.push({
          year: yearData.year,
          value: yearData.value,
          location: record.indicator
        });
      });
    });

    if (allValues.length === 0) {
      // GenAI: No valid data points found
      return res.status(404).json({
        success: false,
        error: 'No valid data points found'
      });
    }

    // GenAI: Calculate statistics (average, min, max)
    const values = allValues.map(v => v.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    // GenAI: Find the year/location for min and max
    const minEntry = allValues.find(v => v.value === min);
    const maxEntry = allValues.find(v => v.value === max);

    // GenAI: Prepare year-over-year data for charting
    const yearlyAverages = {};
    allValues.forEach(item => {
      if (!yearlyAverages[item.year]) {
        yearlyAverages[item.year] = [];
      }
      yearlyAverages[item.year].push(item.value);
    });

    // GenAI: Calculate average for each year for chart display
    const chartData = Object.keys(yearlyAverages).sort().map(year => ({
      year,
      average: yearlyAverages[year].reduce((a, b) => a + b, 0) / yearlyAverages[year].length
    }));

    // GenAI: Return all calculated statistics and chart data
    res.json({
      success: true,
      data: {
        category,
        location: location || 'All locations',
        statistics: {
          average: parseFloat(average.toFixed(2)),
          min: {
            value: min,
            year: minEntry.year,
            location: minEntry.location
          },
          max: {
            value: max,
            year: maxEntry.year,
            location: maxEntry.location
          },
          dataPoints: values.length
        },
        chartData
      }
    });

  } catch (error) {
    // GenAI: Handles unexpected errors and returns a 500 status code.
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all data (for admin/debugging)
// GenAI: Returns up to 100 records for admin or debugging purposes.
router.get('/data', async (req, res) => {
  try {
    const data = await TourismData.find().limit(100);
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    // GenAI: Handles unexpected errors and returns a 500 status code.
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
