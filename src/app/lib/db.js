const fs = require('fs');
const path = require('path');

// Netlify-compatible path
const dataPath = path.join(process.cwd(), 'netlify', 'functions', 'data', 'feedbacks.json');

// Create directory if it doesn't exist
if (!fs.existsSync(path.dirname(dataPath))) {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
}

// Initialize empty array if file doesn't exist
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]');
}

module.exports = {
  getFeedbacks: () => {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading feedbacks:', err);
      return [];
    }
  },

  saveFeedback: (feedback) => {
    try {
      const feedbacks = module.exports.getFeedbacks();
      feedbacks.push({
        ...feedback,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(dataPath, JSON.stringify(feedbacks, null, 2));
      return true;
    } catch (err) {
      console.error('Error saving feedback:', err);
      throw err;
    }
  }
};