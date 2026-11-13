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

原網站有 4 支影片。Wedding Invite 的影片已經放好；另外 3 支沒能從掃描紀錄取得，請從 Wix 媒體管理員下載後，改成下表的檔名放進對應資料夾，網頁就會自動播放，不需要改程式碼。放進來之前，自動播放的影片會先顯示封面圖，Gua Sha 的影片位置會顯示「影片待補」。

| 頁面 | 放置位置與檔名 | 說明 |
|---|---|---|
| Drag Show | `video/gd-929-drag-show/new-years-eve.mp4` | New Year’s Eve Drag Show 海報動畫，自動循環播放 |
| Taiwan Pride | `video/gd-taiwanpride/reel.mp4` | Instagram Reel，自動循環播放 |
| Gua Sha | `video/gua-sha/product-video.mp4` | 產品影片，按播放鍵才播放 |

自動播放的影片預設靜音（瀏覽器規定），右下角有聲音開關。

## 修改內容

- 文字：直接打開各頁的 `index.html`，用文字編輯器（推薦 VS Code）修改。
- 「Next Project」順序：Package Design 依序為 Wine → Gua Sha → Craft Beer → Tampon → Cosmetic → Vibrator → Herbal Tea → Tampons & Pads → Fragrance，再回到 Wine；Graphic Design 為 Nymphia → Techno Poster → Drag Show → Wedding Invite → Taiwan Pride → Pattern Design。要改的話修改每頁最下方 `class="next"` 的連結。
- 顏色與字體：`css/style.css` 最上方。

## 字體

原網站使用 Domaine Display（標題）和 Neuzeit S（內文），這兩套是商業字體，Wix 的授權不會跟著搬過來，所以目前用免費的 Newsreader 和 Jost 替代。如果你有網頁授權，把 woff2 字體檔放進 `fonts/` 資料夾，再依照 `css/style.css` 最上方的註解啟用即可。

## 正式上線（私人儲存庫 + Cloudflare Pages）

1. GitHub 新增 **Private** 儲存庫，上傳方式同上。
2. 登入 Cloudflare → **Workers & Pages → 建立 → Pages → 連接到 Git**，選擇該儲存庫。
3. 框架選「無」，建置命令留空，輸出目錄填 `/`，按儲存並部署。
4. 專案的 **自訂網域** 加入 `chaoyiwang.com` 和 `www.chaoyiwang.com`，依照畫面指示修改 DNS。確認新網站正常後再取消 Wix 方案。
