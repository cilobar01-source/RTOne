
# Portal RT Cilosari Barat v2.7b — Full Integration (Flat Logo + PWA Guide)

## 1) Konfigurasi Supabase
- Buat project di https://supabase.com
- Catat `SUPABASE_URL` dan `SUPABASE_ANON_KEY`
- Buka `script.js` dan ganti kedua nilai placeholder tersebut

### Tabel & Policy (jalankan di SQL Editor)
```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text check (role in ('RT','PKK','Karang','WARGA')) default 'WARGA',
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "profiles_self_read" on public.profiles for select using (auth.uid() = id);
create policy "profiles_self_upsert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_self_update" on public.profiles for update using (auth.uid() = id);

create table if not exists public.pengumuman (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  tanggal date not null,
  bidang text not null check (bidang in ('RT','PKK','Karang')),
  prioritas text not null default 'normal' check (prioritas in ('normal','darurat')),
  status text not null default 'aktif' check (status in ('aktif','selesai')),
  created_at timestamptz not null default now()
);
alter table public.pengumuman enable row level security;
create policy pengumuman_read on public.pengumuman for select to anon, authenticated using (true);
create policy pengumuman_insert on public.pengumuman for insert to authenticated with check (true);
create policy pengumuman_update on public.pengumuman for update to authenticated using (true) with check (true);
create policy pengumuman_delete on public.pengumuman for delete to authenticated using (true);
```

## 2) Membuat Akun & Role
- Auth → Users → buat akun untuk RT/PKK/Karang/Warga
- Isi tabel `profiles` untuk setiap user (id = auth user id), set kolom `role`

## 3) Hosting & PWA
- Upload seluruh folder ke **Vercel / Netlify / GitHub Pages**
- Pastikan HTTPS aktif
- `manifest.json` sudah menunjuk ke `/assets/icon-*.png`
- `service-worker.js` sudah aktif untuk cache halaman & aset

### Install di HP (Android/iOS)
1. Buka situs (contoh: https://rt-cilosaribarat.vercel.app)
2. Tap Menu (⋮) di Chrome atau Share (⬆️) di Safari
3. Pilih **Add to Home Screen / Tambahkan ke Layar Utama**
4. Aplikasi RT siap dibuka dari homescreen, termasuk saat offline (cache terakhir)

## 4) Smart Info
- `smartinfo.js` menampilkan tulisan berjalan dari tabel `pengumuman`
- Rotasi bidang per 15 detik; prioritas `darurat` selalu di depan
- Notifikasi kecil muncul saat ada pengumuman baru (INSERT realtime)

## 5) Struktur
- Logo penuh: `/assets/logo.png` (untuk header & banner)
- Ikon PWA/fav: `/assets/icon-*.png` (simbol rumah + warga tanpa teks)
- Banner: `/assets/hero-banner.png` (logo di tengah, latar putih)
- Letterhead: `/assets/letterhead-header.png`

Good luck & selamat launching! 🎉
