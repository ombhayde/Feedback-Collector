const fs = require('fs');
const path = require('path');

// Use Netlify-compatible paths
const dataPath = path.join(__dirname, 'data', 'feedbacks.json');

// Create data directory if missing
if (!fs.existsSync(path.dirname(dataPath))) {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
}

module.exports = {
  getFeedbacks: () => {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  },
  saveFeedback: (feedback) => {
    const feedbacks = module.exports.getFeedbacks();
    feedbacks.push({
      ...feedback,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(dataPath, JSON.stringify(feedbacks, null, 2));
  }
};