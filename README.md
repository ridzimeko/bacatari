<div align="center">
    <img src="./public/icon/128.png" alt="Bacatari" width="64" height="64" >
    <h1>Bacatari</h1>
    <h2>Baca berita tanpa ribet.</h2>
</div>

Membantu pengalaman baca kamu jadi lebih simpel, dan nyaman di berbagai situs berita favoritmu!

### [For English version please click here](./README_EN.md)

## 📥 Install Bacatari

<a href="https://addons.mozilla.org/en-US/firefox/addon/bacatari/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get Bacatari for Firefox"></a>

> Untuk browser berbasis Chromium saat ini masih belum tersedia di Chrome Web Store, tapi kamu bisa menginstalnya secara manual di [Releases](https://github.com/ridzimeko/bacatari-extension/releases).

## ✨ Fitur Utama

### Baca Full Artikel

Bacatari otomatis membuka semua halaman artikel dalam satu tampilan penuh, tanpa klik "next" atau "selanjutnya".

### Baca Artikel Medium Gratis

Baca artikel Medium gratis tanpa login menggunakan platform <a href="https://freedium.cfd/" target="_blank">Freedium</a>.

### Anti-Sabotase Clipboard

Blokir script nakal yang menyisipkan teks ke clipboard saat menyalin konten dari website, biasanya berisi iklan atau konten yang tidak berguna.

### Tema Gelap dan Terang

Bacatari menyesuaikan tampilan berdasarkan preferensi tema browsermu.

### Ringan dan Cepat

Dibangun dengan fokus kecepatan, kompatibilitas, dan minimalisme.

## 🔥 Situs yang Didukung

Saat ini Bacatari fokus untuk situs-situs berita populer seperti:

- Detik
- Kompas
- Tribunnews
- Liputan6
- Suara
- Antaranews
- Medium (termasuk custom domain Medium)

...dan akan terus bertambah!

## ⚙️ Development

Bacatari dikembangkan menggunakan framework [wxt](https://wxt.dev/) yang dibangun diatas [Vite](https://vitejs.dev/).

### install dependencies

```bash
pnpm install
```

### jalankan development

```bash
pnpm dev
```

### build untuk production

```bash
pnpm build:chrome    # untuk chrome
pnpm build:firefox   # untuk firefox
```

### untuk melakukan zip extension gunakan perintah berikut

```bash
pnpm zip:chrome      # untuk chrome
pnpm zip:firefox     # untuk firefox
```

## 📜 Lisensi

GPL-3.0-only. Bacatari bebas digunakan dan bisa berkontribusi!
