# Chao-Yi Wang 作品集網站

從 Wix 網站搬出來的靜態版本，網址結構和原網站相同（例如 `/wine`、`/graphic-design/nymphia`），舊連結搬家後仍然有效。原本 About 頁的網址是 `/home`，現在改成 `/about`，`/home` 會自動轉過去。Contact 頁已移除。

## 在電腦上預覽

解壓縮後雙擊 `index.html` 就能用瀏覽器打開，所有頁面、hover 效果、輪播都能正常使用。

## 用 GitHub Pages 預覽

1. GitHub 新增一個 **Public** 儲存庫（例如 `portfolio-preview`）。
2. 點 **uploading an existing file**，把這個資料夾**裡面的所有東西**拖進去（不是拖整個資料夾），按 **Commit changes**。
3. 到 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 **main**、資料夾選 **/ (root)**，按 **Save**。
4. 一到兩分鐘後，網址會出現在同一頁上方：`https://你的帳號.github.io/portfolio-preview/`

## 動畫與圖層

和原網站設定相同：

- 換頁時舊頁淡出、新頁淡入（各 0.35 秒）。Chrome、Edge、Safari 使用瀏覽器內建的換頁動畫；Firefox 用 JavaScript 模擬。
- 名字標誌每次進首頁（Package Design）都會從右側浮入；選單只在第一次進站時浮入，其他頁面不重播。
- 作品頁的標題、說明、Client／Category／Year 從右側浮入；首頁的展開圖、About 的照片從下方浮入。
- 名字標誌、選單、作品頁左側文字、Next Project 按鈕、版權文字都固定在畫面上，只有作品圖片會捲動，並從這些固定圖層的下方經過。
- 如果使用者在系統設定中開啟「減少動態效果」，所有動畫都會自動關閉。

## 手機版

螢幕寬度 820px 以下會切換成手機版。版面是照原網站手機版逐頁量出來的：以 320px 寬設計再等比放大，每張圖片的位置、大小、重疊方式和文字大小都和原網站相同。右上角是固定的選單按鈕，點開是白色全螢幕選單。手機版沒有 Next Project 按鈕，也和原網站一致。

首頁的手機版作品順序為：Gua Sha、Tampons & Pads、Wine、Fragrance、Herbal Tea、Cosmetic、Craft Beer、Vibrator、Tampon。原網站手機版有幾個重疊錯誤（Cosmetic 被 Herbal Tea 蓋住、Vibrator 被 Tampon 蓋住、Tampon 出現兩次），新版已修正，9 件作品都會完整顯示一次。

## 影片

原網站的 4 支影片都已放好（Wedding Invite、Drag Show、Gua Sha、Taiwan Pride），檔案都已壓縮成適合網頁的大小，放在 `video/` 資料夾。自動播放的影片預設靜音（瀏覽器規定），右下角有聲音開關。

## 修改內容

- 文字：直接打開各頁的 `index.html`，用文字編輯器（推薦 VS Code）修改。
- 「Next Project」順序：Package Design 依序為 Wine → Gua Sha → Craft Beer → Tampon → Cosmetic → Vibrator → Herbal Tea → Tampons & Pads → Fragrance，再回到 Wine；Graphic Design 為 Nymphia → Techno Poster → Drag Show → Wedding Invite → Taiwan Pride → Pattern Design。要改的話修改每頁最下方 `class="next"` 的連結。
- 顏色與字體：`css/style.css` 最上方。

## 字體

- **內文（Neuzeit S Book）**：使用原網站上傳到 Wix 的字體檔，放在 `fonts/NeuzeitS-Book.woff2`。這是商業字體，請確認你的授權包含網頁使用（當初上傳到 Wix 也需要同樣的授權）。
- **標題（Domaine Display）**：原網站用的是 Klim Type Foundry 的「Test Domaine Display」試用版，試用授權不允許用在正式網站，所以目前用外觀最接近的免費字體 Newsreader 代替。若購買了網頁授權，把字體檔命名為 `DomaineDisplay-Regular.woff2` 放進 `fonts/`，再依照 `css/style.css` 最上方的說明啟用即可。

## 正式上線（私人儲存庫 + Cloudflare Pages）

1. GitHub 新增 **Private** 儲存庫，上傳方式同上。
2. 登入 Cloudflare → **Workers & Pages → 建立 → Pages → 連接到 Git**，選擇該儲存庫。
3. 框架選「無」，建置命令留空，輸出目錄填 `/`，按儲存並部署。
4. 專案的 **自訂網域** 加入 `chaoyiwang.com` 和 `www.chaoyiwang.com`，依照畫面指示修改 DNS。確認新網站正常後再取消 Wix 方案。
