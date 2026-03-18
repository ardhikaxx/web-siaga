import { Search, MapPin, Bed, Phone } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Cari Cepat',
    description: 'Filter RS berdasarkan lokasi, jenis, kelas, dan layanan',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MapPin,
    title: 'Deteksi Lokasi',
    description: 'Temukan RS terdekat dari posisi Anda sekarang',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Bed,
    title: 'Info Kapasitas',
    description: 'Lihat jumlah tempat tidur, ICU, dan HCU tersedia',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Phone,
    title: 'Hubungi Langsung',
    description: 'Tap-to-call nomor RS tanpa perlu copy-paste',
    color: 'bg-red-50 text-red-600',
  },
];

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
            <feature.icon className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
