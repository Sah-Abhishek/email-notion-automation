export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Body received:', req.body);
    return res.status(200).json({ message: 'Mail received', body: req.body });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
