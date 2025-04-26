import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'public', 'data', 'feedbacks.json');

export const getFeedbacks = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

export const saveFeedback = (feedback) => {
  const feedbacks = getFeedbacks();
  feedbacks.push(feedback);
  fs.writeFileSync(dataPath, JSON.stringify(feedbacks, null, 2));
};