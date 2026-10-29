# 📺 The Special Index™ — YouTube Uploads Master Dashboard

Welcome to the centralized repository dashboard for all **Is It Special? / The Special Index™** YouTube video productions.

In accordance with our **Dual-Format Video Mandate** in [`PLAYBOOK.md`](PLAYBOOK.md), every investigated product is paired with:
1. **Master Video Essay:** 16:9 Landscape (`1920×1080`), ~3m 30s to 4m 00s, deep engineering teardown.
2. **Shorts / Reels Video:** 9:16 Vertical (`1080×1920`), 55 to 58 seconds (<60s ceiling), high-retention hook.
3. **Dedicated Upload Package:** Ready-to-copy metadata in the `youtube/` folder.

---

## 📊 Video Production Status & Quick Access

| # | Product | Special Score | Master Video (16:9) | Short Video (9:16) | Upload Guide (.md) | YouTube Status |
| :-: | :--- | :---: | :--- | :--- | :--- | :---: |
| **01** | **AeroPress Coffee Maker** | `9.4 / 10` | `public/videos/aeropress_master_video_1080p.mp4` (3m 48s) | `public/videos/aeropress-shorts-sample.mp4` (58s) | [`youtube/01_aeropress_coffee_maker.md`](youtube/01_aeropress_coffee_maker.md) | 🟢 **Live** ([`t-943tZGD00`](https://youtu.be/t-943tZGD00)) |
| **02** | **Bic Cristal Ballpoint Pen** | `8.8 / 10` | `public/videos/bic_cristal_master_video_1080p.mp4` (2m 34s) | `public/videos/bic-cristal-shorts-sample.mp4` (58s) | [`youtube/02_bic_cristal_ballpoint_pen.md`](youtube/02_bic_cristal_ballpoint_pen.md) | 🟡 **Ready to Upload** |
| **03** | **Casio F-91W Watch** | `9.6 / 10` | `public/videos/casio_f91w_master_video_1080p.mp4` (4m 00s) | `public/videos/casio_f91w_shorts_1080x1920.mp4` (57.35s) | [`youtube/03_casio_f91w_digital_watch.md`](youtube/03_casio_f91w_digital_watch.md) | 🟡 **Ready to Upload** |
| **04** | **Bialetti Moka Express** | `9.1 / 10` | `public/videos/moka_express_master_video_1080p.mp4` (3m 34s) | `public/videos/moka_express_shorts_1080x1920.mp4` (58.2s) | [`youtube/04_bialetti_moka_express.md`](youtube/04_bialetti_moka_express.md) | 🟢 **Scheduled** ([`9Jj35L0J3pA`](https://youtu.be/9Jj35L0J3pA)) • Short Ready |
| **05** | **Lodge Cast Iron Skillet** | `9.2 / 10` | `public/videos/lodge_cast_iron_master_video_1080p.mp4` (4m 05s) | `public/videos/lodge_cast_iron_shorts_1080x1920.mp4` (57.14s) | [`youtube/05_lodge_cast_iron_skillet.md`](youtube/05_lodge_cast_iron_skillet.md) | 🟡 **Ready to Upload** |

---

## 📁 Individual Upload Packages

Whenever you want to upload a video to YouTube, simply open the corresponding Markdown file below. Each file contains pre-formatted **Titles**, **Descriptions with Links & Timestamps**, **Search Tags**, **Pinned Comments**, and recommended **Thumbnails**:

* ☕ **[01. AeroPress Coffee Maker](youtube/01_aeropress_coffee_maker.md)**
* 🖊️ **[02. Bic Cristal Ballpoint Pen](youtube/02_bic_cristal_ballpoint_pen.md)**
* ⏱️ **[03. Casio F-91W Digital Watch](youtube/03_casio_f91w_digital_watch.md)**
* 🇮🇹 **[04. Bialetti Moka Express](youtube/04_bialetti_moka_express.md)**
* 🍳 **[05. Lodge Cast Iron Skillet](youtube/05_lodge_cast_iron_skillet.md)**

---

## 🛠️ YouTube Upload Workflow Checklist

### For Master Videos (16:9 Landscape):
1. **Open YouTube Studio:** Click **Create** $\to$ **Upload videos**.
2. **Select Master MP4 File:** Select the file from `public/videos/[name]_master_video_1080p.mp4`.
3. **Copy Metadata from `youtube/[file].md`:**
   - Paste **Option 1 Title** (or whichever you prefer).
   - Paste **Video Description** (includes web article link, WhatsApp channel link, chapter timestamps, score verdict, and disclosure).
   - Upload **Option 1 Thumbnail** (`public/images/[name]-youtube-thumbnail-beat.jpg`).
   - Paste **Search Tags**.
4. **Publish / Schedule:** Select Public or Schedule premiere.
5. **Post Pinned Comment:** Immediately copy and paste the pinned comment from the markdown file, post it, and click **Pin to top**.
6. **Embed into Website Article:**
   - Once scheduled or published, add `<YouTubeEmbed id="[VIDEO_ID]" />` into the corresponding article in `src/content/blog/` (and Hindi in `src/content/hi-blog/` if available).

### For Shorts (9:16 Vertical):
1. **Upload Vertical MP4 File:** Select `public/videos/[name]_shorts_1080x1920.mp4`.
2. **Copy Shorts Metadata:**
   - Paste the **Shorts Title** (with `#Shorts` and topic tags).
   - Paste the short description with links.
3. **Link Related Video in YouTube Studio:**
   - In the video details tab, click **Related video** and select the long-form master video essay. This funnels Shorts viewers directly into the 4-minute master video!
4. **Post Pinned Comment:** Copy and pin the comment provided in the guide.
