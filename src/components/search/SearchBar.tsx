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
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama rumah sakit..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
            showFilters || hasFilters
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filter
        </button>
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25"
        >
          Cari RS
        </button>
      </div>

      {showFilters && (
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Jenis RS</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50"
              >
                <option value="">Semua Jenis</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kelas RS</label>
              <select
                value={hospitalClass}
                onChange={(e) => setHospitalClass(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50"
              >
                <option value="">Semua Kelas</option>
                {classes.map((c) => (
                  <option key={c} value={c}>Kelas {c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kepemilikan</label>
              <select
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50"
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
              className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
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
