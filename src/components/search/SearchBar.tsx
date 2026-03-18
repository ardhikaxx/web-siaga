'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { fetchHospitalTypes, fetchHospitalClasses, fetchHospitalOwnership } from '@/lib/api';

interface SearchBarProps {
  onSearch: (filters: {
    name?: string;
    type?: string;
    class?: string;
    ownership?: string;
  }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [hospitalClass, setHospitalClass] = useState('');
  const [ownership, setOwnership] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [ownerships, setOwnerships] = useState<string[]>([]);

  useEffect(() => {
    async function loadFilterOptions() {
      try {
        const [typesRes, classesRes, ownershipRes] = await Promise.all([
          fetchHospitalTypes(),
          fetchHospitalClasses(),
          fetchHospitalOwnership(),
        ]);
        setTypes(typesRes.data.types);
        setClasses(classesRes.data.classes);
        setOwnerships(ownershipRes.data.ownership);
      } catch (error) {
        console.error('Failed to load filter options:', error);
      }
    }
    loadFilterOptions();
  }, []);

  const handleSearch = () => {
    onSearch({
      name: name || undefined,
      type: type || undefined,
      class: hospitalClass || undefined,
      ownership: ownership || undefined,
    });
  };

  const handleClear = () => {
    setName('');
    setType('');
    setHospitalClass('');
    setOwnership('');
    onSearch({});
  };

  const hasFilters = name || type || hospitalClass || ownership;

  return (
    <div className="card p-6 md:p-8 shadow-xl" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Cari nama rumah sakit..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-12 pr-4 py-4 rounded-xl text-base transition-all"
            style={{ 
              border: '1px solid var(--color-border)', 
              background: '#F8FAFC',
              color: '#1E293B'
            }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all"
          style={{
            background: showFilters || hasFilters ? '#0D9488' : '#F1F5F9',
            color: showFilters || hasFilters ? 'white' : '#64748B'
          }}
        >
          <Filter className="w-5 h-5" />
          Filter
        </button>
        <button
          onClick={handleSearch}
          className="btn-emergency px-8 py-4"
        >
          Cari RS
        </button>
      </div>

      {showFilters && (
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Jenis RS</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl transition-all"
                style={{ border: '1px solid var(--color-border)', background: '#F8FAFC' }}
              >
                <option value="">Semua Jenis</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Kelas RS</label>
              <select
                value={hospitalClass}
                onChange={(e) => setHospitalClass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl transition-all"
                style={{ border: '1px solid var(--color-border)', background: '#F8FAFC' }}
              >
                <option value="">Semua Kelas</option>
                {classes.map((c) => (
                  <option key={c} value={c}>Kelas {c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Kepemilikan</label>
              <select
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                className="w-full px-4 py-3 rounded-xl transition-all"
                style={{ border: '1px solid var(--color-border)', background: '#F8FAFC' }}
              >
                <option value="">Semua Kepemilikan</option>
                {ownerships.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          {hasFilters && (
            <button
              onClick={handleClear}
              className="mt-4 flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: '#64748B' }}
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
