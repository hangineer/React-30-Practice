# GitHub Token 設定說明

## 為什麼需要 GitHub Token？

GitHub API 對未認證的請求有嚴格的速率限制（每小時 60 次），這會導致 403 錯誤。使用 GitHub Token 可以將限制提升到每小時 5000 次
Token 只會在前端使用，不會發送到後端

## 如何獲取 GitHub Token

1. **前往 GitHub Settings**
   - 登入 GitHub
   - 點擊右上角頭像 → Settings

2. **生成 Personal Access Token**
   - 左側選單 → Developer settings
   - Personal access tokens → Tokens (classic)
   - Generate new token → Generate new token (classic)

3. **設定權限**
   - 選擇 `public_repo` 權限即可
   - 設定過期時間（建議 30 天或更長）

4. **複製 Token**
   - 生成後會顯示 token（格式：`ghp_xxxxxxxxxxxxxxxxxxxx`）
   - **重要**: 只會顯示一次，請立即複製

## 設定環境變數

1. **在專案根目錄建立 `.env.local` 檔案**
   ```bash
   touch .env.local
   ```

2. **在 `.env.local` 中添加以下內容**
   ```
   VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   ```
   將 `ghp_xxxxxxxxxxxxxxxxxxxx` 替換為實際 Token

3. **重新啟動**
   ```bash
   npm run dev
   ```

## 驗證設定
設定完成後，在 /day13 會看到「✅ GitHub Token 已設定」

