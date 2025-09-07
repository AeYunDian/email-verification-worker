// 导入处理函数
import { handleSendVerification } from './api/send.js';
import { handleVerifyCode } from './api/verify.js';

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
      if (path === '/api/send') {
        const response = await handleSendVerification(request, env);
        response.headers.set('Access-Control-Allow-Origin', '*');
        return response;
      } else if (path === '/api/verify') {
        const response = await handleVerifyCode(request, env);
        response.headers.set('Access-Control-Allow-Origin', '*');
        return response;
      }
    }

    return new Response('Not Found', { 
      status: 404,
      headers: corsHeaders
    });
  }
};