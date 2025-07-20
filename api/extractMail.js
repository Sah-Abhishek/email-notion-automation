import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Only needed locally — not on Vercel

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { subject, body } = req.body;
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing or undefined' });
  }

  try {
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content:
              'You are an assistant that ONLY extracts company details from the provided text. Do NOT use web results or supplement with external information. Return the following as JSON: company_name, visit_date, company_type, contact_person, contact_email, contact_phone, address, salary_details, probation_period, posting_location, job_profile, job_designation, additional_notes. Leave fields blank if not present in the text.',
          },
          {
            role: 'user',
            content: `Extract the details from this email:\nSubject: ${subject}\nBody: ${body}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Send actual data received from Perplexity
    return res.status(200).json({ message: 'Extracted data', data: response.data });
  } catch (error) {
    console.error('Error calling Perplexity API:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to extract details from email', details: error?.response?.data || error.message });
  }
}
