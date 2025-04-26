const { saveFeedback, getFeedbacks } = require('./lib/db');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    // Parse the request body
    const feedback = JSON.parse(event.body);

    // Validate required fields
    if (!feedback.name || !feedback.email || !feedback.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Save the feedback
    await saveFeedback(feedback);

    // Get all feedbacks to return (optional)
    const feedbacks = await getFeedbacks();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        feedbacks // Now properly defined
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Internal Server Error' 
      })
    };
  }
};