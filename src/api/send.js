export async function handleSendVerification(request, env) {
  try {
    // 解析请求体
    const { email } = await request.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 生成随机验证码和 token
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const token = generateToken();
    
    // 存储到 KV，有效期 5 分钟
    await env.EMAIL_VERIFICATION.put(
      `token:${token}`, 
      JSON.stringify({ email, code: verificationCode }),
      { expirationTtl: 300 } // 5 分钟
    );

    // 使用 Resend 发送邮件
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'verification@heiye.xin',
        to: email,
        subject: '[Heiye] Your Verification Code',
        html: `<p>Your verification code is: <strong>${verificationCode}</strong></p><p>This code will expire in 5 minutes.</p>`
      })
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error('Resend API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 返回 token
    return new Response(
      JSON.stringify({ token }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send verification:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// 生成随机 token
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}