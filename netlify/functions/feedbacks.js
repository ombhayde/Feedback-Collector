const { getFeedbacks } = require('./lib/db');

exports.handler = async (event) => {
  try {
    const feedbacks = await getFeedbacks();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbacks)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};