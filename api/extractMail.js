export default async function handler(req, res) {
  if (req.method() === 'POST') {
    const { subject, body } = req.body;

    console.log("Webhook Recieved");

    console.log("Subject: ", subject);
    console.log("Body: ", body);

    res.status(200).json({
      message: "Email Recieved"
    })

  } else {
    res.status(405).json({
      message: "Method not allowed"
    })
  }
}
