// netlify/functions/lib/db.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = {
  getFeedbacks: async () => {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase read error:', error);
      return [];
    }
    return data;
  },
  
  saveFeedback: async (feedback) => {
    const { error } = await supabase
      .from('feedbacks')
      .insert({
        name: feedback.name,
        email: feedback.email,
        message: feedback.message
      });
    
    if (error) {
      console.error('Supabase write error:', error);
      throw error;
    }
  }
};
