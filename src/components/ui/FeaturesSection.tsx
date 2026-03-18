import { Search, MapPin, Bed, Phone } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Cari Cepat',
    description: 'Filter RS berdasarkan lokasi, jenis, kelas, dan layanan',
  },
  {
    icon: MapPin,
    title: 'Deteksi Lokasi',
    description: 'Temukan RS terdekat dari posisi Anda sekarang',
  },
  {
    icon: Bed,
    title: 'Info Kapasitas',
    description: 'Lihat jumlah tempat tidur, ICU, dan HCU tersedia',
  },
  {
    icon: Phone,
    title: 'Hubungi Langsung',
    description: 'Tap-to-call nomor RS tanpa perlu copy-paste',
  },
];

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
            <feature.icon className="w-7 h-7 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
