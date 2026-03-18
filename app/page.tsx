'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Loader2, Phone, Shield } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { HospitalCard } from '@/components/hospital/HospitalCard';
import { EmergencyBanner } from '@/components/emergency/EmergencyBanner';
import { StatsSection } from '@/components/ui/StatsSection';
import { FeaturesSection } from '@/components/ui/FeaturesSection';
import { fetchHospitals } from '@/lib/api';
import { useGeolocation } from '@/hooks/useGeolocation';
import type { Hospital } from '@/types/hospital';

export default function Home() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const { latitude, longitude, loading: locLoading, error: locError, getLocation } = useGeolocation();

  useEffect(() => {
    async function loadHospitals() {
      try {
        setLoading(true);
        const response = await fetchHospitals({ size: 20 });
        setHospitals(response.data);
      } catch (err) {
        setError('Gagal memuat data rumah sakit');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHospitals();
  }, []);

  const handleSearch = async (filters: {
    name?: string;
    type?: string;
    class?: string;
    ownership?: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetchHospitals({ ...filters, size: 20 });
      setHospitals(response.data);
    } catch (err) {
      setError('Gagal mencari rumah sakit');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    getLocation();
    setLocationEnabled(true);
  };

  const hospitalsToShow = hospitals.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-2 rounded-xl font-bold text-xl shadow-lg shadow-red-500/25">
                S
              </div>
              <span className="font-display text-2xl font-bold text-slate-800">SIAGA</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Beranda
              </Link>
              <Link href="/darurat" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Darurat
              </Link>
              <Link href="/rs" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Cari RS
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6 border border-white/10">
              <Shield className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium">Sistem Informasi Kesehatan Darurat Masyarakat</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Temukan Rumah Sakit<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">Terdekat</span> dalam<br />
              Kondisi Darurat
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Data 3.291+ rumah sakit di seluruh Indonesia — real-time, akurat, terpercaya
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-1"
              >
                Cari Rumah Sakit Sekarang
              </button>
              <button 
                onClick={handleUseLocation}
                disabled={locLoading}
                className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-2xl font-medium text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:-translate-y-1"
              >
                {locLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
                {locLoading ? 'Mendapatkan Lokasi...' : 'Gunakan Lokasiku'}
              </button>
            </div>
            
            {locError && (
              <p className="text-red-300 mt-4 text-sm">{locError}</p>
            )}
            {latitude && longitude && (
              <p className="text-green-400 mt-4 text-sm font-medium flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Lokasi ditemukan! Menampilkan rumah sakit di sekitar Anda.
              </p>
            )}
          </div>
          
          <div id="search-section" className="mt-16">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsSection />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Fitur Unggulan SIAGA
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Solusi cepat untuk menemukan fasilitas kesehatan saat Anda membutuhkannya
            </p>
          </div>
          <FeaturesSection />
        </div>
      </section>

      {/* Hospital Results */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                {locationEnabled ? 'Rumah Sakit Terdekat' : 'Rumah Sakit'}
              </h2>
              <p className="text-slate-500 mt-1">
                Temukan fasilitas kesehatan terdekat dari lokasi Anda
              </p>
            </div>
            <Link
              href="/rs"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-600 mb-4 font-medium">{error}</p>
              <button
                onClick={() => handleSearch({})}
                className="text-blue-600 font-semibold hover:underline"
              >
                Coba lagi
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalsToShow.map((hospital) => (
                <HospitalCard 
                  key={hospital.code} 
                  hospital={hospital}
                />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/rs"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              Lihat Semua RS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmergencyBanner />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-2 rounded-xl font-bold text-xl">
                  S
                </div>
                <span className="font-display text-2xl font-bold text-white">SIAGA</span>
              </div>
              <p className="text-slate-400 max-w-md">
                Sistem Informasi Kesehatan Darurat Masyarakat. Membantu Anda menemukan fasilitas kesehatan terdekat dalam kondisi darurat.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Menu</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
                </li>
                <li>
                  <Link href="/rs" className="hover:text-white transition-colors">Cari RS</Link>
                </li>
                <li>
                  <Link href="/darurat" className="hover:text-white transition-colors">Darurat</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Nomor Darurat</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-white">119</span> — SPGDT
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-white">112</span> — Universal
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="font-medium text-white">110</span> — Polisi
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              Data bersumber dari SIRS Kementerian Kesehatan RI
            </p>
            <p className="text-sm">
              © 2026 SIAGA — Dibuat untuk masyarakat Indonesia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
