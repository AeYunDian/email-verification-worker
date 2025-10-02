// 导入处理函数
import { handleSendVerification } from './send.js';
import { handleVerifyCode } from './verify.js';

// 直接在代码中定义 ini 内容
const updateIniContent = `[update_info]
version = 1.3.0
build_number = 1300
release_date = 2025-10-02
download_url = https://www.heiye.xin/qrcode/1.3.0/updateSetup.exe
checksum = 2fc79f40a981f9ead34581e77ed81e828815ba32f605d80a05d34b9bdf217480
file_size = 1216512

[release_notes]
zh-CN = 1.为开发人员的优化 2.优化速度及用户体验`;

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

    if (request.method === 'GET') {
    if (path === '/api/qrcode/update') {
            // 直接返回硬编码的 ini 内容
            return new Response(updateIniContent, {
              status: 200,
              headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                ...corsHeaders
              }
            });
          }
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






