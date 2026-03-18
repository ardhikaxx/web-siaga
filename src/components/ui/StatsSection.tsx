'use client';

import { Building2, MapPin, Bed, Clock } from 'lucide-react';

const stats = {
  hospitals: 3291,
  provinces: 34,
  beds: 500000,
};

const statItems = [
  { icon: Building2, value: stats.hospitals, label: 'Rumah Sakit', suffix: '+', color: '#0D9488' },
  { icon: MapPin, value: stats.provinces, label: 'Provinsi', suffix: '', color: '#6366F1' },
  { icon: Bed, value: stats.beds, label: 'Tempat Tidur', suffix: '+', color: '#F59E0B' },
  { icon: Clock, value: '24/7', label: 'Akses Informasi', suffix: '', color: '#DC2626' },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="card p-5 text-center hover:shadow-xl transition-all"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" 
            style={{ background: `${item.color}15` }}>
            <item.icon className="w-6 h-6" style={{ color: item.color }} />
          </div>
          <div className="text-3xl font-bold mb-1" style={{ color: '#1E293B' }}>
            {item.value}
            {item.suffix}
          </div>
          <div className="text-sm" style={{ color: '#64748B' }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
