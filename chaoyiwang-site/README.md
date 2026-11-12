# Chao-Yi Wang 作品集網站

從 Wix 網站搬出來的靜態版本，網址結構和原網站相同（例如 `/wine`、`/graphic-design/nymphia`），舊連結搬家後仍然有效。原本 About 頁的網址是 `/home`，現在改成 `/about`，`/home` 會自動轉過去。

## 在電腦上預覽

解壓縮後雙擊 `index.html` 就能用瀏覽器打開，所有頁面、hover 效果、輪播都能正常使用。

## 用 GitHub Pages 預覽

1. GitHub 新增一個 **Public** 儲存庫（例如 `portfolio-preview`）。
2. 點 **uploading an existing file**，把這個資料夾**裡面的所有東西**拖進去（不是拖整個資料夾），按 **Commit changes**。
3. 到 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 **main**、資料夾選 **/ (root)**，按 **Save**。
4. 一到兩分鐘後，網址會出現在同一頁上方：`https://你的帳號.github.io/portfolio-preview/`

## 還需要補的圖片（29 張）

HAR 檔只記錄到看過的圖片，以下位置目前顯示灰色的「圖片待補」框。把原始圖片改成對應的檔名，放進 `img/` 裡相同的資料夾就會自動出現，不需要改程式碼。

| 頁面 | 資料夾 | 缺少的檔案 |
|---|---|---|
| Gua Sha | `img/gua-sha/` | 輪播第 3～6 張：slide-03.jpg ～ slide-06.jpg |
| Vibrator（Me Time） | `img/me-time/` | 輪播第 5～9 張：slide-05.jpg ～ slide-09.jpg |
| Fragrance（alluria） | `img/alluria-fragrance/` | 輪播第 4～7 張：slide-04.jpg ～ slide-07.jpg |
| Herbal Tea | `img/mofa-herbal-tea/` | 由上往下第 4、5 張：04.jpg、05.jpg |
| Tampons & Pads | `img/menstrualproducts/` | 由上往下第 6～8 張：06.jpg ～ 08.jpg |
| Drag Show | `img/gd-929-drag-show/` | 03、04、06、07、08、09.jpg |
| Wedding Invite | `img/gd-weddinginvite/` | 04、05、06.jpg |
| Taiwan Pride | `img/gd-taiwanpride/` | 07.jpg |
| Consciousness Poster | `img/gd-consciousness-poster/` | 04.jpg |

圖片建議寬度 2000px 以內、每張 1MB 以下（可用 squoosh.app 壓縮），網站會快很多。

**Cosmetic 頁**（`inii-cosmetic/index.html`）沒有取得內容，目前只有標題、基本資料和封面圖。說明文字請貼在檔案裡標有 `TODO` 的位置。

## 修改內容

- 文字：直接打開各頁的 `index.html`，用文字編輯器（推薦 VS Code）修改。
- 「Next Project」順序：Package Design 依序為 Wine → Gua Sha → Craft Beer → Tampon → Cosmetic → Vibrator → Herbal Tea → Tampons & Pads → Fragrance，再回到 Wine；Graphic Design 為 Nymphia → Techno Poster → Drag Show → Wedding Invite → Taiwan Pride → Pattern Design。要改的話修改每頁最下方 `class="next"` 的連結。
- 顏色與字體：`css/style.css` 最上方。

## 字體

原網站使用 Domaine Display（標題）和 Neuzeit S（內文），這兩套是商業字體，Wix 的授權不會跟著搬過來，所以目前用免費的 Newsreader 和 Jost 替代。如果你有網頁授權，把 woff2 字體檔放進 `fonts/` 資料夾，再依照 `css/style.css` 最上方的註解啟用即可。

## 聯絡表單

1. 到 https://formspree.io 免費註冊並建立表單，會拿到一串代碼（例如 `xyzabcd`）。
2. 把 `contact/index.html` 裡的 `YOUR_FORM_ID` 換成這串代碼。

## 正式上線（私人儲存庫 + Cloudflare Pages）

1. GitHub 新增 **Private** 儲存庫，上傳方式同上。
2. 登入 Cloudflare → **Workers & Pages → 建立 → Pages → 連接到 Git**，選擇該儲存庫。
3. 框架選「無」，建置命令留空，輸出目錄填 `/`，按儲存並部署。
4. 專案的 **自訂網域** 加入 `chaoyiwang.com` 和 `www.chaoyiwang.com`，依照畫面指示修改 DNS。確認新網站正常後再取消 Wix 方案。
