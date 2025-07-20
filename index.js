export default function handler(req, res) {
  res.status(200).json({
    message: "✅ Vercel is working fine!",
    timestamp: new Date().toISOString(),
  });
}
