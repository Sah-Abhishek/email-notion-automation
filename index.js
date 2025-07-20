
export default async function handler(req, res) {
  if (req.method() === 'GET') {

    res.status(200).json({
      message: "Email Recieved"
    })

  } else {
    res.status(405).json({
      message: "Method not allowed"
    })
  }
}
