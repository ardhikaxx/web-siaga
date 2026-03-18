'use client';

import { useEffect, useState } from 'react';
import { Building2, MapPin, Bed, Clock } from 'lucide-react';

export function StatsSection() {
  const [stats, setStats] = useState({
    hospitals: 0,
    provinces: 0,
    beds: 0,
  });

  useEffect(() => {
    setStats({
      hospitals: 3291,
      provinces: 34,
      beds: 500000,
    });
  }, []);

  const statItems = [
    { icon: Building2, value: stats.hospitals, label: 'Rumah Sakit', suffix: '+' },
    { icon: MapPin, value: stats.provinces, label: 'Provinsi', suffix: '' },
    { icon: Bed, value: stats.beds, label: 'Tempat Tidur', suffix: '+' },
    { icon: Clock, value: '24/7', label: 'Akses Informasi', suffix: '' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-5 text-center border border-gray-100 hover:shadow-md transition-shadow"
        >
          <item.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {typeof item.value === 'number' ? (
              <Counter value={item.value} />
            ) : (
              item.value
            )}
            {item.suffix}
          </div>
          <div className="text-gray-600 text-sm">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count.toLocaleString('id-ID')}</>;
}
