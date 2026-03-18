'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama rumah sakit..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors ${
            showFilters || hasFilters
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filter
        </button>
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Cari RS
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis RS</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Jenis</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelas RS</label>
              <select
                value={hospitalClass}
                onChange={(e) => setHospitalClass(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Kelas</option>
                {classes.map((c) => (
                  <option key={c} value={c}>Kelas {c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kepemilikan</label>
              <select
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="mt-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
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
