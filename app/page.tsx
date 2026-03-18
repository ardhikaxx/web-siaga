'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Loader2, Phone, Shield, Heart, Activity } from 'lucide-react';
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
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg" 
                style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)' }}>
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl font-bold" style={{ color: '#1E293B' }}>SIAGA</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/rs', label: 'Cari RS' },
                { href: '/darurat', label: 'Darurat' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg font-medium transition-all hover:bg-black/5"
                  style={{ color: '#64748B' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}>
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(13, 148, 136, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)`,
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium" 
              style={{ background: 'rgba(13, 148, 136, 0.2)', color: '#5EEAD4' }}>
              <Shield className="w-4 h-4" />
              Sistem Informasi Kesehatan Darurat Masyarakat
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Temukan <span className="text-gradient">Rumah Sakit</span><br />
              Terdekat dalam<br />
              Kondisi Darurat
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#94A3B8' }}>
              Data 3.291+ rumah sakit di seluruh Indonesia — real-time, akurat, terpercaya
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-emergency text-lg px-8 py-4 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Cari Rumah Sakit Sekarang
                </span>
              </button>
              <button 
                onClick={handleUseLocation}
                disabled={locLoading}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border-2"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', background: 'rgba(255,255,255,0.1)' }}
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
              <p className="mt-4 text-sm" style={{ color: '#FCA5A5' }}>{locError}</p>
            )}
            {latitude && longitude && (
              <p className="mt-4 text-sm font-medium flex items-center justify-center gap-2" style={{ color: '#4ADE80' }}>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Lokasi ditemukan! Menampilkan rumah sakit di sekitar Anda.
              </p>
            )}
          </div>
          
          <div id="search-section" className="mt-16 animate-slide-up">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsSection />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1E293B' }}>
              Fitur Unggulan SIAGA
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
              Solusi cepat untuk menemukan fasilitas kesehatan saat Anda membutuhkannya
            </p>
          </div>
          <FeaturesSection />
        </div>
      </section>

      {/* Hospital Results */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold" style={{ color: '#1E293B' }}>
                {locationEnabled ? 'Rumah Sakit Terdekat' : 'Rumah Sakit'}
              </h2>
              <p className="mt-1" style={{ color: '#64748B' }}>
                Temukan fasilitas kesehatan terdekat dari lokasi Anda
              </p>
            </div>
            <Link
              href="/rs"
              className="hidden md:flex items-center gap-2 font-semibold transition-colors"
              style={{ color: '#0D9488' }}
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl h-80 animate-pulse" style={{ background: '#F1F5F9' }} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 rounded-2xl" style={{ background: '#FEF2F2' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#FEE2E2' }}>
                <Shield className="w-8 h-8" style={{ color: '#DC2626' }} />
              </div>
              <p className="mb-4 font-medium" style={{ color: '#DC2626' }}>{error}</p>
              <button
                onClick={() => handleSearch({})}
                className="font-semibold underline"
                style={{ color: '#0D9488' }}
              >
                Coba lagi
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalsToShow.map((hospital, index) => (
                <div key={hospital.code} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <HospitalCard hospital={hospital} />
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/rs"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ color: '#0D9488' }}
            >
              Lihat Semua RS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-20" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmergencyBanner />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16" style={{ background: '#0F172A', color: '#94A3B8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl" 
                  style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)' }}>
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-display text-2xl font-bold text-white">SIAGA</span>
              </div>
              <p className="max-w-md" style={{ color: '#94A3B8' }}>
                Sistem Informasi Kesehatan Darurat Masyarakat. Membantu Anda menemukan fasilitas kesehatan terdekat dalam kondisi darurat.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Menu</h4>
              <ul className="space-y-3">
                {['Beranda', 'Cari RS', 'Darurat'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={item === 'Beranda' ? '/' : item === 'Cari RS' ? '/rs' : '/darurat'} 
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Nomor Darurat</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: '#0D9488' }} />
                  <span className="font-medium text-white">119</span> — SPGDT
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: '#6366F1' }} />
                  <span className="font-medium text-white">112</span> — Universal
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: '#94A3B8' }} />
                  <span className="font-medium text-white">110</span> — Polisi
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #1E293B' }}>
            <p className="text-sm">Data bersumber dari SIRS Kementerian Kesehatan RI</p>
            <p className="text-sm">© 2026 SIAGA — Dibuat untuk masyarakat Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
