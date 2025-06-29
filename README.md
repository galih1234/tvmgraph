# tvmgraph

## Penjelasan Implementasi

1. **Simulasi Pelatihan**:
   - `simulateTraining()` menghasilkan data simulasi epoch, loss, accuracy, dan learning rate
   - Menggunakan model decay eksponensial dengan noise acak untuk realisme
   - Menghasilkan array objek history untuk setiap epoch

2. **Visualisasi**:
   - `renderTrainingChart()` membuat visualisasi menggunakan Canvas API
   - Menampilkan kurva loss dan accuracy
   - Mendukung tema light/dark dan penempatan di elemen tertentu

3. **Integrasi TVMAI**:
   - Mengambil rekomendasi model dari `@galihridhoutomo/tvmai`
   - Menggunakan hyperparameter untuk konfigurasi simulasi
   - Menghasilkan visualisasi berdasarkan rekomendasi model

4. **Publikasi**:
   - Workflow GitHub Actions untuk publikasi otomatis
   - Publikasi ke npmjs dan GitHub Packages
   - Hanya di-trigger oleh tag versi (v*.*.*)

## Cara Menggunakan

1. Instal modul:
```bash
npm install @galih1234/tvmaigraph
