# Chaoyi Wang 作品集網站

## 要修改哪裡

所有需要修改的地方都標了 ✏️ 符號，用文字編輯器（推薦 VS Code）搜尋 ✏️ 就能找到。

- `index.html`：名字、自我介紹、經歷、Email、社群連結、聯絡表單代碼
- `js/main.js`：作品清單（圖片、名稱、年份、分類）
- `css/style.css`：最上方的顏色與字體設定
- `images/`：把你的圖片放進來，取代原本的示意圖

圖片建議先壓縮（可用 squoosh.app），單張控制在 500KB 以內，網站會快很多。

## 聯絡表單設定

1. 到 https://formspree.io 免費註冊
2. 建立新表單，會得到一串代碼，例如 `xyzabcd`
3. 把 `index.html` 裡的 `YOUR_FORM_ID` 換成這串代碼

## 上傳到 GitHub（私人儲存庫）

1. 登入 GitHub，點右上角 + → New repository
2. 名稱隨意（例如 `portfolio`），選 **Private**，按 Create
3. 在新儲存庫頁面點 uploading an existing file，把這個資料夾內的所有檔案和資料夾拖進去，按 Commit changes

## 用 Cloudflare Pages 發佈

1. 註冊並登入 https://dash.cloudflare.com
2. 左側選 Workers & Pages → 建立 → Pages → 連接到 Git
3. 授權 GitHub，選擇剛剛的私人儲存庫
4. 建置設定：框架選「無」，建置命令留空，輸出目錄填 `/`
5. 按儲存並部署，完成後會得到一個 `xxx.pages.dev` 網址

之後只要在 GitHub 更新檔案，Cloudflare 會自動重新發佈。

## 綁定 chaoyiwang.com

在 Cloudflare Pages 專案 → 自訂網域 → 新增 `chaoyiwang.com` 和 `www.chaoyiwang.com`，照畫面指示到你的域名註冊商修改 DNS（如果域名已經交給 Cloudflare 管理，會自動設定）。確認新網站正常後，再取消 Wix 方案。
