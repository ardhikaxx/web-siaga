import Link from 'next/link';
import { ArrowLeft, Phone, AlertTriangle, CheckCircle, User, Heart, Shield } from 'lucide-react';

export default function EmergencyPage() {
  const emergencyNumbers = [
    { number: '119', name: 'SPGDT Nasional', description: 'Ambulans & Darurat', color: 'bg-red-600' },
    { number: '112', name: 'Nomor Darurat Universal', description: 'Semua jenis darurat', color: 'bg-blue-600' },
    { number: '110', name: 'Kepolisian', description: 'Keamanan & polisi', color: 'bg-blue-800' },
    { number: '113', name: 'Pemadam Kebakaran', description: 'Kebakaran & rescue', color: 'bg-red-500' },
  ];

  const emergencySteps = [
    {
      number: 1,
      title: 'Tetap Tenang & Amankan Lokasi',
      description: 'Pastikan lokasi aman untuk Anda dan korban. Jangan memindahkan korban kecuali ada bahaya langsung.',
      icon: Shield,
    },
    {
      number: 2,
      title: 'Hubungi 119 untuk Ambulans',
      description: 'Hubungi nomor darurat 119 dan jelaskan kondisi korban dengan jelas.',
      icon: Phone,
    },
    {
      number: 3,
      title: 'Cari RS Terdekat di SIAGA',
      description: 'Gunakan aplikasi SIAGA untuk menemukan rumah sakit terdekat dari lokasi Anda.',
      icon: Heart,
    },
    {
      number: 4,
      title: 'Lakukan P3K Dasar',
      description: 'Sambil menunggu bantuan arrive, lakukan pertolongan pertama sesuai kemampuan.',
      icon: User,
    },
    {
      number: 5,
      title: 'Siapkan Dokumen',
      description: 'Siapkan kartu identitas, kartu BPJS, dan dokumen medis lainnya jika ada.',
      icon: CheckCircle,
    },
  ];

  const firstAidSteps = [
    'Panggil korban dan periksa kesadaran',
    'Periksa napas dan denyut nadi',
    'Buka jalan napas (head-tilt, chin-lift)',
    'Hentikan pendarahan dengan tekanan langsung',
    'Jangan memberikan makanan/minuman pada korban tidak sadar',
    'Tetap bersama korban sampai bantuan arrive',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <div className="bg-red-600 text-white p-2 rounded-lg font-bold text-xl">
                S
              </div>
              <span className="font-display text-xl font-bold text-gray-900">SIAGA</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Panduan Kondisi Darurat
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tetap tenang dan ikuti langkah-langkah berikut untuk menghadapi kondisi darurat medis
          </p>
        </div>

        {/* Emergency Numbers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nomor Darurat Nasional</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyNumbers.map((item) => (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className={`${item.color} text-white rounded-xl p-6 hover:opacity-90 transition-opacity text-center`}
              >
                <div className="text-4xl font-bold mb-2">{item.number}</div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-white/80 text-sm">{item.description}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Emergency Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Langkah Darurat Medis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencySteps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      Langkah {step.number}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* First Aid Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Panduan P3K Dasar</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-6">
              Pertolongan Pertama Pada Kecelakaan (P3K) dasar yang dapat dilakukan sambil menunggu ambulans:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {firstAidSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Checklist Persiapan Darurat</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-6">
              Siapkan hal-hal berikut untuk kondisi darurat:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Kartu Identitas (KTP/SIM)',
                'Kartu BPJS Kesehatan',
                'Kartu Asuransi Lainnya',
                'Riwayat Penyakit (jika ada)',
                'Daftar Obat yang Dikonsumsi',
                'Kontak Keluarga',
                'Uang Tunai Kecil',
                'Botol Air Minum',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Butuh Bantuan Sekarang?</h2>
            <p className="text-blue-100 mb-6">
              Temukan rumah sakit terdekat dari lokasi Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Cari RS Terdekat
              </Link>
              <a
                href="tel:119"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Hubungi 119
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
