// 导入处理函数
import { handleSendVerification } from './send.js';
import { handleVerifyCode } from './verify.js';

// 直接在代码中定义 ini 内容
const updateIniContent = `[update_info]
version = 1.2.0
build_number = 1200
release_date = 2025-10-01
download_url = https://e.seewo.com/download/file?code=EasiNote5&&version=5.2.4.9158
checksum = 0860b80f3918f665aba81002e085e24f548209affe344ba58c1ff6dfcae798bb
file_size = 173898112

[release_notes]
zh-CN = 本次只是测试更新功能`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 设置 CORS 头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 路由处理
    if (request.method === 'POST') {
      if (path === '/api/mail/send') {
        const response = await handleSendVerification(request, env);
        // 添加 CORS 头
        for (const [key, value] of Object.entries(corsHeaders)) {
          response.headers.set(key, value);
        }
        return response;
      } else if (path === '/api/qrcode/update') {
        // 直接返回硬编码的 ini 内容
        return new Response(updateIniContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            ...corsHeaders
          }
        });
      } else if (path === '/api/mail/verify') {
        const response = await handleVerifyCode(request, env);
        // 添加 CORS 头
        for (const [key, value] of Object.entries(corsHeaders)) {
          response.headers.set(key, value);
        }
        return response;
      }
    }

    return new Response('Not Found', { 
      status: 404,
      headers: corsHeaders
    });
  }
};
