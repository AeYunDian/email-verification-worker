export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 路由处理
    if (request.method === 'POST') {
      if (path === '/api/send') {
        return handleSendVerification(request, env);
      } else if (path === '/api/verify') {
        return handleVerifyCode(request, env);
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};

// 导入处理函数
import { handleSendVerification } from './api/send.js';
import { handleVerifyCode } from './api/verify.js';