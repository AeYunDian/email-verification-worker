markdown
# 📧 邮件验证 API

基于 Cloudflare Workers + Resend 的轻量级邮件验证服务，无需服务器，全球边缘网络部署。

## ✨ 功能特性

- ✅ 无服务器架构，部署在 Cloudflare 边缘网络
- ✅ 使用 Resend 服务发送验证邮件
- ✅ Cloudflare KV 存储 token 和验证码
- ✅ RESTful API 设计，简单易用
- ✅ 支持 CORS，前端可直接调用
- ✅ 验证码 5 分钟自动过期
- ✅ 包含完整 Vue 3 前端示例

## 🏗️ 系统架构
前端页面 (Vue 3) → Cloudflare Worker API → Resend → 用户邮箱
↓
Cloudflare KV (数据库)

text

## 📁 项目结构
email-verification/
├── worker/
│ ├── index.js # Worker 主逻辑
│ ├── package.json # 依赖配置
│ └── wrangler.toml # 部署配置
├── frontend/
│ └── index.html # Vue 3 前端页面
├── .gitignore # Git 忽略配置
└── README.md # 项目说明

text

## 🚀 快速开始

### 前置要求

1. Cloudflare 账户
2. Resend 账户和 API 密钥
3. Node.js 16+ 和 npm

### 1. 克隆项目

```bash
git clone <你的仓库地址>
cd email-verification
2. 安装依赖
bash
cd worker
npm install
3. 配置环境
bash
# 登录 Cloudflare
npx wrangler login

# 创建 KV namespace
npx wrangler kv:namespace create kv

# 绑定 KV namespace
npx wrangler kv:namespace add --binding kv

# 设置 Resend API 密钥
npx wrangler secret put resend_key
4. 修改配置
在 frontend/index.html 中修改 API 地址：

javascript
const API_BASE_URL = 'https://your-worker.your-subdomain.workers.dev';
5. 部署到 Cloudflare
bash
npx wrangler deploy
📡 API 接口
发送验证码
端点: POST /api/send-code

请求体:

json
{
  "email": "user@example.com"
}
响应:

json
{
  "success": true,
  "message": "验证码已发送",
  "token": "dXNlckBleGFtcGxlLmNvbToxNjMzMDUwODAw"
}
验证验证码
端点: POST /api/verify-code

请求体:

json
{
  "token": "dXNlckBleGFtcGxlLmNvbToxNjMzMDUwODAw",
  "code": "123456"
}
响应:

json
{
  "verified": true,
  "message": "验证成功"
}
⚙️ 环境变量
变量名	说明	设置方式
resend_key	Resend API 密钥	wrangler secret put resend_key
KV Binding	KV 存储绑定	wrangler kv:namespace add --binding kv
🔧 开发说明
本地开发
bash
# 启动开发服务器
npm run dev

# 部署到生产环境
npm run deploy
文件说明
worker/index.js - 主要的 API 逻辑处理

worker/wrangler.toml - Cloudflare Worker 配置

frontend/index.html - 完整的 Vue 3 前端界面

🌐 前端使用
部署 frontend/index.html 到任意静态托管服务

修改 API_BASE_URL 为你的 Worker 地址

通过浏览器访问即可使用

🔒 安全特性
验证码 5 分钟自动过期

Token 与邮箱绑定，防止滥用

输入验证和错误处理

CORS 安全配置

📊 性能特点
⚡ 边缘网络部署，全球低延迟

🚀 无冷启动问题

💾 KV 存储快速读写

📨 Resend 高速邮件发送

🐛 故障排除
常见问题
邮件发送失败

检查 Resend API 密钥是否正确

确认发件邮箱已在 Resend 验证

KV 存储失败

检查 KV namespace 是否正确绑定

CORS 错误

确认前端地址与 API 地址匹配

日志查看
bash
# 查看 Worker 日志
npx wrangler tail
📝 更新日志
v1.2.0
初始版本发布

基础邮件验证功能

Vue 3 前端界面

📄 许可证
本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情

🙏 致谢
Cloudflare Workers

Resend

Vue.js

如有问题，请提交 Issue 或联系维护者。

text