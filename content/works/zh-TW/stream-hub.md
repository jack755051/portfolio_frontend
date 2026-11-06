---
title: Sanring Stream Hub
summary: 收集案場監視器畫面、統一授權後供各網站即時播放的串流服務
kind: side-project
visibility: private
status: wip
period:
  start: '2026-10'
role: [全端]
team: 個人
stack: [.NET, Angular, MediaMTX, FFmpeg, WebRTC, SQLite]
cover: /works/stream-hub/01.png
gallery:
  - src: /works/stream-hub/01.png
    alt: 管理總覽
    caption: MediaMTX 連線、推流中與被拒的路數、正在看的連線數，以及目前播出中的攝影機
  - src: /works/stream-hub/02.png
    alt: 攝影機列表
    caption: 各編號的推流狀態與編碼、認領的網站與正在看的連線；拉流與內建測試畫面另有標示
  - src: /works/stream-hub/03.png
    alt: 網站列表
    caption: 各網站認領的路數、正在看的連線數與金鑰設定狀態
highlights:
  - 播放憑證以 HMAC 簽章、兩分鐘內有效；網站取消認領後，正在看的連線立即中斷
  - 案場可推流，不會推流的 NVR 改由服務主動拉流；H.265 自動轉成瀏覽器可播的 H.264
  - 第一個案場已上線，掉線狀態回報監控中台統一告警
order: 8
featured: true
---

## 背景與目標

官網要在網頁上播放案場監視器的即時畫面，原本影像收發跟網站綁在一起。Stream Hub 把它拆成獨立服務，部署在一台 Mac mini：案場只負責把畫面送進來，各網站認領自己要播的攝影機，播放權限集中在這裡控管。

一支攝影機只有一路畫面，多個網站認領同一支也不會重複拉流。

## 核心功能

- **接收畫面**：案場以 RTMP／RTSP 推流（需帳密）；NVR 不會推流時，由服務主動拉 RTSP，斷線自動重連
- **轉碼與播放**：H.264 原樣轉出，H.265 才轉成 H.264；瀏覽器以 WebRTC（WHEP）播放，影像不經 Cloudflare
- **認領與授權**：各網站認領可播的攝影機；網站後端用金鑰換短效播放憑證，瀏覽器帶憑證才播得到
- **管理畫面**：查看各攝影機推流狀態、哪個網站正在看哪一路，並提供測試推流與 tunnel 連線檢查
- **掉線通報**：每 30 秒把被認領攝影機的狀態回報給監控中台，由中台判定掉線並寄信

## 技術架構

- **串流**：MediaMTX 收 RTMP／RTSP、以 WebRTC 播放；FFmpeg 負責主動拉流與 H.265 轉碼
- **認領服務**：.NET 10 minimal API 與 SQLite；MediaMTX 每次推流、播放都向它確認授權；管理、授權、網站 API 分開三個埠
- **管理畫面**：Angular、Tailwind CSS、[Sanring UI](/works/ui-sanring)，跟認領服務建在同一個映像
- **對外連線**：Cloudflare Tunnel 只開放 WebRTC 信令與網站 API，管理畫面只綁本機
- **系統整合**：[官網](/works/sanring-tech-site)的即時監控改由這裡供應畫面；掉線狀態回報[監控中台](/works/sanring-middle-platform)
- **測試與部署**：xUnit 測試涵蓋授權、拉流、網站 API 與中台回報；arm64 映像推上 Docker Hub，Mac mini 以 Docker Compose 啟動

## 挑戰與解法

- **只靠網站代號擋不住盜播**：改為網站後端用金鑰換憑證，內容含網站、編號與期限並以 HMAC 簽章；MediaMTX 每次播放都回問認領服務，取消認領後新播放立即被拒，正在看的連線也會被中斷。
- **案場的 NVR 不會推流**：認領服務透過 MediaMTX API 動態新增拉流設定，在容器內以 FFmpeg 拉 RTSP；MediaMTX 重啟後每 30 秒自動補回設定。現場兩層 NAT 的轉發只對服務的 IP 開放。
- **瀏覽器不支援 H.265**：只在來源是 H.265 時轉碼，H.264 原樣轉出，降低 Mac mini 的負載。
- **掉線通報不想在 mini 上寄信**：mini 只回報攝影機狀態快照，掉線判定、寄信與靜音規則都交給監控中台，mini 不存寄信用的金鑰。
