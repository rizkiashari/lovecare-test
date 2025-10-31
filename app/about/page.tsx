export const metadata = {
  title: "Tentang | Rick & Morty Explorer",
};

export default function AboutPage() {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>About untuk Cerita kenapa saya membuat ini</h1>
      <p>
        Ini adalah demo kecil yang dibangun dengan Next.js App Router untuk
        menjelajahi Rick & Morty API. Tujuannya adalah arsitektur yang bersih
        dengan pemisahan business logic dan UI, pengambilan data yang cepat,
        layout responsif, dan UX yang baik dengan loading states.
      </p>

      <h2>Arsitektur</h2>
      <p>
        Proyek ini mengikuti prinsip Clean Architecture dengan pemisahan concern
        yang jelas:
      </p>
      <ul>
        <li>
          <strong>Domain</strong> - Entitas bisnis inti dan tipe data (
          <code>domain/character.ts</code>)
        </li>
        <li>
          <strong>Model</strong> - Model response API dan fungsi mapping (
          <code>model/character.ts</code>)
        </li>
        <li>
          <strong>Repository</strong> - Layer akses data untuk panggilan API (
          <code>repository/characterRepository.ts</code>)
        </li>
        <li>
          <strong>Service</strong> - Layer business logic (
          <code>service/characterService.ts</code>)
        </li>
        <li>
          <strong>Hooks</strong> - React hooks untuk client-side data fetching (
          <code>hooks/character/</code>)
        </li>
        <li>
          <strong>UI Components</strong> - Komponen presentasional di{" "}
          <code>components/</code>
        </li>
      </ul>

      <h2>Keputusan Teknis</h2>
      <ul>
        <li>Next.js App Router dengan React untuk server-first rendering.</li>
        <li>TypeScript untuk type-safety dan maintainability.</li>
        <li>
          Tailwind CSS untuk styling yang cepat dan konsisten dalam layout
          responsif.
        </li>
        <li>
          Route-level loading UI menggunakan file <code>loading.tsx</code>.
        </li>
        <li>
          API client berbasis Axios dengan typed responses dan error handling.
        </li>
        <li>
          React Query (<code>@tanstack/react-query</code>) untuk client-side
          data fetching dan caching.
        </li>
        <li>
          Custom hooks untuk logic data fetching yang reusable dengan debounced
          search.
        </li>
        <li>
          Pagination ditangani di client untuk 50 hasil pertama untuk kecepatan.
        </li>
      </ul>

      <h2>Fitur</h2>
      <ul>
        <li>Daftar karakter dengan debounced search dan filter status.</li>
        <li>Pagination dengan preservasi state URL.</li>
        <li>
          Halaman detail dengan gambar, status, species, gender, lokasi, origin,
          dan episode.
        </li>
        <li>Desain responsif dan optimasi gambar.</li>
        <li>Pemisahan yang bersih antara business logic dan UI components.</li>
      </ul>

      <h2>Pembuat</h2>
      <p>
        <strong>RizkI Ashari</strong>
      </p>
    </div>
  );
}
