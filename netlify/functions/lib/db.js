const fs = require('fs');
const path = require('path');
const os = require('os');

// Cross-platform temp directory
const tempDir = os.tmpdir();
const dataPath = path.join(tempDir, 'feedbacks.json');

// Create file if it doesn't exist
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf8');
}

module.exports = {
  getFeedbacks: () => {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Read error:', err);
      return [];
    }
  },

  saveFeedback: (feedback) => {
    try {
      const feedbacks = module.exports.getFeedbacks();
      const newFeedback = {
        ...feedback,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      fs.writeFileSync(dataPath, JSON.stringify([...feedbacks, newFeedback], null, 2));
      return true;
    } catch (err) {
      console.error('Write error:', err);
      throw err;
    }
  }
};