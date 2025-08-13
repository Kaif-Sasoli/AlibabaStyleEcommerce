export const emailVerificationTemplate = (OTP) => {
  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Verify Your Email - AlibabaStyleEcommerce</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f6fc;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          background-color: #4A90E2;
          color: #ffffff;
          padding: 20px;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
        }
        .header p {
          margin: 5px 0 0;
          font-size: 16px;
        }
        .content {
          color: #333333;
          font-size: 16px;
          line-height: 1.6;
          padding: 20px 0;
        }
        .otp-box {
          font-size: 30px;
          letter-spacing: 6px;
          background-color: #e6f2ff;
          color: #0a3d62;
          padding: 18px 25px;
          text-align: center;
          border-radius: 8px;
          margin: 30px auto;
          font-weight: bold;
          width: fit-content;
        }
        .highlight {
          color: #4A90E2;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #eeeeee;
          font-size: 13px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>AlibabaStyleEcommerce</h2>
          <p>Email Verification Required</p>
        </div>
        <div class="content">
          <p>Hi there,</p>
          <p>Thank you for signing up with <span class="highlight">AlibabaStyleEcommerce</span>! To complete your registration, please enter the following One-Time Password (OTP) in the app or website:</p>
          
          <div class="otp-box">
            ${OTP}
          </div>

          <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>

          <p>If you didn’t request this code, you can safely ignore this email.</p>

          <p>Best regards,<br>
          <strong>The AlibabaStyleEcommerce Team</strong></p>
        </div>
        <div class="footer">
          &copy; ${currentYear} AlibabaStyleEcommerce. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};
