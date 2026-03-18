import { Search, MapPin, Bed, Phone } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Cari Cepat',
    description: 'Filter RS berdasarkan lokasi, jenis, kelas, dan layanan',
    color: '#0D9488',
    bg: 'rgba(13, 148, 136, 0.1)',
  },
  {
    icon: MapPin,
    title: 'Deteksi Lokasi',
    description: 'Temukan RS terdekat dari posisi Anda sekarang',
    color: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.1)',
  },
  {
    icon: Bed,
    title: 'Info Kapasitas',
    description: 'Lihat jumlah tempat tidur, ICU, dan HCU tersedia',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)',
  },
  {
    icon: Phone,
    title: 'Hubungi Langsung',
    description: 'Tap-to-call nomor RS tanpa perlu copy-paste',
    color: '#DC2626',
    bg: 'rgba(220, 38, 38, 0.1)',
  },
];

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="card p-6 hover:shadow-xl"
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: feature.bg }}>
            <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: '#1E293B' }}>{feature.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
