# Sistem Informasi Kesehatan Darurat Masyarakat (SIAGA)
## Panduan Lengkap Pengembangan Website

---

## 1. IDENTITAS PRODUK

| Atribut | Nilai |
|---|---|
| **Nama Sistem** | SIAGA |
| **Kepanjangan** | Sistem Informasi Kesehatan Darurat Masyarakat |
| **Tagline** | *"Satu Klik, Fasilitas Kesehatan Terdekat"* |
| **Misi** | Mempercepat akses masyarakat ke fasilitas kesehatan darurat di seluruh Indonesia |
| **Target Pengguna** | Masyarakat umum Indonesia, khususnya saat kondisi darurat medis |
| **Platform** | Web (Mobile-first, Progressive Web App) |

---

## 2. ARSITEKTUR HALAMAN

### 2.1 Landing Page (`/`)
Halaman utama yang berfungsi sebagai pintu masuk sistem. Terdiri dari:

- **Hero Section** — CTA utama pencarian RS + statistik nasional
- **Feature Section** — Fitur unggulan SIAGA (4 fitur utama)
- **Search Section** — Pencarian rumah sakit dengan filter lengkap
- **Hospital Card Section** — Daftar hasil pencarian / RS terdekat
- **Stats Section** — Data agregat nasional (total RS, total bed, dll)
- **Emergency Section** — Panduan darurat & nomor penting
- **Footer** — Kredit, sumber data, kontak

### 2.2 Halaman Detail RS (`/rs/[kode]`)
- Info lengkap rumah sakit
- Peta lokasi (Leaflet.js / Google Maps embed)
- Daftar layanan tersedia
- Data tempat tidur per kelas
- Data SDM (dokter, spesialis)
- Tombol "Hubungi" & "Navigasi"

### 2.3 Halaman Darurat (`/darurat`)
- Panduan P3K digital
- Nomor darurat nasional & regional
- Checklist persiapan darurat

---

## 3. DATA & API

### 3.1 Sumber Data
Data rumah sakit bersumber dari **SIRS (Sistem Informasi Rumah Sakit)** melalui API:

```
Base URL: https://use.api.co.id/hospitals/indonesia
Auth Header: x-api-co-id: {{API_KEY}}
```

### 3.2 Endpoint Utama

#### List Rumah Sakit
```http
GET /hospitals/indonesia/
Query: page, size, name, type, class, ownership, province_code, regency_code, blu_status
```

#### Detail Rumah Sakit
```http
GET /hospitals/indonesia/{code}/
```

#### Filter & Metadata
```http
GET /hospitals/indonesia/types/       → Jenis RS
GET /hospitals/indonesia/classes/     → Kelas RS (A, B, C, D)
GET /hospitals/indonesia/ownership/   → Kepemilikan
GET /hospitals/indonesia/blu-status/  → Status BLU
```

### 3.3 Struktur Data Rumah Sakit
```json
{
  "code": "1113012",
  "name": "RS Umum Muhammad Ali Kasim",
  "address": "Jalan Pangur",
  "phone": "0123-456789",
  "type": "Rumah Sakit Umum",
  "class": "C",
  "blu_status": "BLUD",
  "ownership": "Pemkab",
  "director": "dr. Nama Direktur, Sp.XX",
  "facilities": {
    "land_area": "99.652 M2",
    "building_area": "-",
    "total_beds": 126
  },
  "beds": {
    "class_i": 14,
    "class_ii": 12,
    "class_iii": 68,
    "hcu": 4,
    "perinatology": 20,
    "icu_with_ventilator": 8
  },
  "services": {
    "count": 10,
    "list": ["Pelayanan medik dasar / umum", "IGD 24 jam", "..."]
  },
  "staff": {
    "total": 56,
    "general_practitioner": 38,
    "basic_specialist": 11,
    "other_specialist": 7
  },
  "province_code": "11",
  "regency_code": "1113",
  "scraped_at": "2026-01-25T14:26:04.857537"
}
```

### 3.4 Pagination
```json
"paging": {
  "page": 1,
  "size": 100,
  "total_item": 3291,
  "total_page": 33
}
```

---

## 4. FITUR UTAMA

### F01 — Pencarian Rumah Sakit
- Input nama RS (partial match, case-insensitive)
- Filter berdasarkan:
  - Provinsi (dropdown dinamis dari API)
  - Kabupaten/Kota (dropdown dinamis, dependent ke provinsi)
  - Jenis RS (Umum, Khusus, Jiwa, Ibu & Anak)
  - Kelas RS (A, B, C, D)
  - Kepemilikan (Pemkab, Pemkot, Pemprov, Swasta, TNI/Polri)
- Hasil menampilkan card RS dengan info ringkas
- Pagination infinite scroll atau numbered

### F02 — Deteksi Lokasi (Geolocation)
- Tombol "Cari RS Terdekat" menggunakan browser Geolocation API
- Tampilkan RS berdasarkan kedekatan geografis (hitung jarak dari koordinat user)
- Badge "Terdekat" pada RS dalam radius < 5 km

### F03 — Filter Layanan Darurat
- Quick-filter: IGD 24 Jam, ICU, NICU, Hemodialisis, Bedah, Kebidanan
- Deteksi layanan dari field `services.list`
- Highlight RS yang punya IGD 24 jam aktif

### F04 — Info Tempat Tidur (Bed Availability)
- Tampilkan ringkasan tempat tidur: total, ICU, HCU, Perinatologi
- Indikator kapasitas (berdasarkan data statis dari API)
- Catatan: data bersifat statis (bukan real-time)

### F05 — Panduan Darurat
- Nomor darurat nasional: 119 (SPGDT), 112 (Emergency), 021-500-454 (Kemenkes)
- Checklist tindakan P3K pertama
- Panduan menghubungi ambulans
- Daftar RS rujukan nasional

### F06 — Mode Berbagi (Share)
- Tombol share link detail RS (Web Share API)
- Copy-to-clipboard alamat & nomor telepon RS
- Generate QR Code lokasi RS

---

## 5. DESAIN SISTEM (UI/UX)

### 5.1 Palet Warna
```css
--color-emergency:   #DC2626;  /* Merah darurat */
--color-primary:     #1D4ED8;  /* Biru kepercayaan */
--color-accent:      #F59E0B;  /* Kuning peringatan */
--color-success:     #16A34A;  /* Hijau aman */
--color-neutral-900: #0F172A;  /* Teks utama */
--color-neutral-100: #F1F5F9;  /* Background */
--color-white:       #FFFFFF;
```

### 5.2 Tipografi
- **Display/Hero**: Font dramatik, bold — contoh: `Bebas Neue`, `DM Serif Display`
- **UI/Body**: Bersih & mudah dibaca — contoh: `Plus Jakarta Sans`, `Nunito`
- **Monospace** (kode/data): `JetBrains Mono`

### 5.3 Komponen UI

#### Card Rumah Sakit
```
┌─────────────────────────────────────────┐
│ [Badge Kelas] [Badge Jenis]             │
│ Nama Rumah Sakit                        │
│ 📍 Alamat, Kab/Kota, Provinsi          │
│ ─────────────────────────────────────── │
│ 🛏 126 Bed  │ 👨‍⚕️ 56 Staff │ 🏥 10 Layanan│
│ ─────────────────────────────────────── │
│ [📞 Hubungi]           [→ Detail]       │
└─────────────────────────────────────────┘
```

#### Badge Kelas RS
- Kelas A: `bg-purple-600 text-white` (Tersier/Rujukan Nasional)
- Kelas B: `bg-blue-600 text-white` (Rujukan Provinsi)
- Kelas C: `bg-green-600 text-white` (Rujukan Kab/Kota)
- Kelas D: `bg-yellow-500 text-white` (Pelayanan Dasar)

#### Status IGD
- IGD 24 Jam Aktif: `🟢 IGD 24 Jam`
- Tidak ada IGD: `⚪ IGD Tidak Terdata`

### 5.4 Prinsip UX
1. **Mobile-first** — mayoritas pengguna akses via HP saat darurat
2. **Speed** — halaman harus load < 3 detik pada koneksi 4G
3. **Contrast tinggi** — mudah dibaca di bawah sinar matahari
4. **One-thumb navigation** — semua aksi penting dalam jangkauan ibu jari
5. **Offline-ready** — simpan hasil pencarian terakhir di localStorage
6. **Aksesibilitas** — WCAG 2.1 AA minimum (kontras, ARIA label, keyboard nav)

---

## 6. KONTEN HALAMAN

### 6.1 Hero Section
**Judul utama:**
> "Temukan Rumah Sakit Terdekat dalam Kondisi Darurat"

**Sub-judul:**
> Data 3.291+ rumah sakit di seluruh Indonesia — real-time, akurat, terpercaya

**CTA Utama:** `Cari Rumah Sakit Sekarang →`
**CTA Sekunder:** `📍 Gunakan Lokasiku`

**Statistik Hero (animated counter):**
- `3.291+` Rumah Sakit Terdaftar
- `34` Provinsi Tercakup
- `500.000+` Tempat Tidur
- `24/7` Akses Informasi

### 6.2 Fitur Unggulan
| Ikon | Judul | Deskripsi |
|------|-------|-----------|
| 🔍 | Cari Cepat | Filter RS berdasarkan lokasi, jenis, kelas, dan layanan |
| 📍 | Deteksi Lokasi | Temukan RS terdekat dari posisi Anda sekarang |
| 🛏 | Info Kapasitas | Lihat jumlah tempat tidur, ICU, dan HCU tersedia |
| 📞 | Hubungi Langsung | Tap-to-call nomor RS tanpa perlu copy-paste |

### 6.3 Panduan Darurat (Emergency Section)
**Nomor Darurat:**
- `119` — SPGDT Nasional (Ambulans & Darurat)
- `112` — Nomor Darurat Universal
- `110` — Kepolisian
- `113` — Pemadam Kebakaran

**Langkah Darurat Medis:**
1. Tetap tenang & pastikan keamanan lokasi
2. Hubungi 119 untuk ambulans
3. Cari RS terdekat di SIAGA
4. Lakukan P3K dasar sambil menunggu bantuan
5. Siapkan kartu identitas & kartu BPJS

### 6.4 Footer
```
SIAGA — Sistem Informasi Kesehatan Darurat Masyarakat
Data bersumber dari SIRS Kementerian Kesehatan RI
API by api.co.id | Dibuat untuk masyarakat Indonesia

Kontak: siaga@example.id | © 2026 SIAGA
```

---

## 7. TEKNOLOGI

### 7.1 Stack Utama
| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 14+ / React 18+ |
| Styling | Tailwind CSS v3 |
| State | Zustand / React Query (TanStack Query) |
| HTTP | Axios / Fetch API |
| Peta | Leaflet.js (open source) |
| Icons | Lucide React / Heroicons |
| Animasi | Framer Motion |
| Font | Google Fonts (self-hosted) |

### 7.2 Alternatif Stack (Ringan)
- HTML + Tailwind CDN + Alpine.js + Vanilla JS (untuk landing page statis)

### 7.3 Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=https://use.api.co.id
NEXT_PUBLIC_API_KEY=your_api_key_here
```

---

## 8. PERFORMA & SEO

### 8.1 Performa
- Lighthouse Score target: ≥ 90 (Performance, Accessibility, SEO)
- Lazy-load gambar & komponen
- API response caching (stale-while-revalidate: 300 detik)
- Debounce search input 300ms

### 8.2 SEO
```html
<title>SIAGA — Cari Rumah Sakit Darurat di Indonesia</title>
<meta name="description" content="Temukan rumah sakit terdekat saat darurat. 
  Data 3.291+ RS seluruh Indonesia dari SIRS Kemenkes RI.">
<meta property="og:image" content="/og-image-siaga.png">
```

### 8.3 Schema.org (Structured Data)
- `MedicalOrganization` untuk setiap RS
- `EmergencyService` untuk fitur darurat

---

## 9. KEAMANAN & PRIVASI

- API key disimpan di server-side (tidak expose ke client)
- Tidak menyimpan data lokasi pengguna ke server
- HTTPS wajib (HSTS)
- Rate limiting: 100 request/menit per IP
- Data lokasi user hanya digunakan lokal (browser)
- Privacy Policy: lokasi tidak dikirim ke server, hanya untuk kalkulasi jarak lokal

---

## 10. AKSESIBILITAS

- Semua gambar memiliki `alt` text
- Tombol darurat memiliki `aria-label` yang jelas
- Keyboard navigation penuh (Tab, Enter, Escape)
- Focus indicator visible (outline merah untuk mode darurat)
- Skip-to-content link
- Ukuran touch target minimum: 44x44px (WCAG 2.5.5)
- Teks minimum: 16px body, 14px caption
- Color contrast: ≥ 4.5:1 untuk teks normal, ≥ 3:1 untuk teks besar

---

## 11. KONVENSI KODE

### Penamaan Komponen (React)
```
HospitalCard.tsx
HospitalSearchBar.tsx
EmergencyBanner.tsx
BedAvailabilityBadge.tsx
ProvinceDropdown.tsx
```

### Penamaan Fungsi
```javascript
fetchHospitals(params)      // ambil data RS
searchByLocation(lat, lng)  // cari RS terdekat
formatPhoneNumber(phone)    // format nomor telpon
calculateDistance(a, b)     // hitung jarak 2 koordinat
filterByService(list, svc)  // filter berdasar layanan
```

### Struktur Folder
```
/src
  /components
    /hospital     → HospitalCard, HospitalDetail, HospitalGrid
    /search       → SearchBar, FilterPanel, ProvinceSelect
    /emergency    → EmergencyBanner, EmergencyNumbers, FirstAidGuide
    /ui           → Button, Badge, Modal, Skeleton
  /pages (atau /app jika Next.js 14)
  /hooks          → useHospitals, useGeolocation, useDebounce
  /lib            → api.ts, utils.ts, constants.ts
  /types          → hospital.types.ts
```

---

## 12. CHECKLIST PELUNCURAN

- [ ] Landing page responsive di mobile, tablet, desktop
- [ ] Pencarian & filter berfungsi dengan data real dari API
- [ ] Detail halaman RS lengkap
- [ ] Halaman darurat dengan nomor penting
- [ ] Lighthouse score ≥ 90
- [ ] HTTPS aktif
- [ ] Meta tags & OG image terpasang
- [ ] Uji aksesibilitas dengan screen reader
- [ ] Uji di kondisi koneksi lambat (throttle 3G)
- [ ] Error handling jika API tidak merespons
- [ ] Loading skeleton saat fetch data
- [ ] Empty state jika tidak ada hasil pencarian

---

*Dokumen ini adalah rule utama pengembangan SIAGA.*  
*Semua keputusan desain, fitur, dan arsitektur mengacu ke dokumen ini.*  
*Versi: 1.0.0 — Maret 2026*
