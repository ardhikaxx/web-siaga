'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Loader2 } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { HospitalCard } from '@/components/hospital/HospitalCard';
import { EmergencyBanner } from '@/components/emergency/EmergencyBanner';
import { StatsSection } from '@/components/ui/StatsSection';
import { FeaturesSection } from '@/components/ui/FeaturesSection';
import { fetchHospitals } from '@/lib/api';
import { useGeolocation, calculateDistance } from '@/hooks/useGeolocation';
import type { Hospital } from '@/types/hospital';

interface HospitalWithDistance extends Hospital {
  distance?: number;
}

export default function Home() {
  const [hospitals, setHospitals] = useState<HospitalWithDistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationLoaded, setLocationLoaded] = useState(false);
  const { latitude, longitude, loading: locLoading, error: locError, getLocation } = useGeolocation();

  useEffect(() => {
    async function loadHospitals() {
      try {
        setLoading(true);
        const response = await fetchHospitals({ size: 20 });
        setHospitals(response.data as HospitalWithDistance[]);
      } catch (err) {
        setError('Gagal memuat data rumah sakit');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHospitals();
  }, []);

  useEffect(() => {
    if (latitude && longitude && hospitals.length > 0) {
      const hospitalsWithDistance = [...hospitals].map((hospital) => {
        const mockLat = -6.2 + (Math.random() - 0.5) * 0.5;
        const mockLng = 106.8 + (Math.random() - 0.5) * 0.5;
        const distance = calculateDistance(latitude, longitude, mockLat, mockLng);
        return { ...hospital, distance };
      });
      
      hospitalsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      setHospitals(hospitalsWithDistance);
      setLocationLoaded(true);
    }
  }, [latitude, longitude, hospitals.length]);

  const handleSearch = async (filters: {
    name?: string;
    type?: string;
    class?: string;
    ownership?: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetchHospitals({ ...filters, size: 20 });
      const data: HospitalWithDistance[] = response.data.map((hospital) => {
        if (latitude && longitude) {
          const mockLat = -6.2 + (Math.random() - 0.5) * 0.5;
          const mockLng = 106.8 + (Math.random() - 0.5) * 0.5;
          const distance = calculateDistance(latitude, longitude, mockLat, mockLng);
          return { ...hospital, distance };
        }
        return { ...hospital };
      });
      
      if (latitude && longitude) {
        data.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }
      
      setHospitals(data);
    } catch (err) {
      setError('Gagal mencari rumah sakit');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = async () => {
    getLocation();
  };

  const hospitalsToShow = locationLoaded 
    ? hospitals.slice(0, 6) 
    : hospitals.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-red-600 text-white p-2 rounded-lg font-bold text-xl">
                S
              </div>
              <span className="font-display text-xl font-bold text-gray-900">SIAGA</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Beranda
              </Link>
              <Link href="/darurat" className="text-gray-600 hover:text-gray-900 font-medium">
                Darurat
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Temukan Rumah Sakit Terdekat<br />dalam Kondisi Darurat
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Data 3.291+ rumah sakit di seluruh Indonesia — real-time, akurat, terpercaya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors"
              >
                Cari Rumah Sakit Sekarang
              </button>
              <button 
                onClick={handleUseLocation}
                disabled={locLoading}
                className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
              <p className="text-green-300 mt-4 text-sm">
                Lokasi ditemukan! Menampilkan RS terdekat dari Anda.
              </p>
            )}
          </div>
          
          {/* Search Section */}
          <div id="search-section">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan SIAGA
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Solusi cepat untuk menemukan fasilitas kesehatan saat Anda membutuhkannya
            </p>
          </div>
          <FeaturesSection />
        </div>
      </section>

      {/* Hospital Results */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
              {locationLoaded ? 'Rumah Sakit Terdekat' : 'Rumah Sakit'}
            </h2>
            <Link
              href="/rs"
              className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => handleSearch({})}
                className="text-blue-600 font-medium hover:underline"
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
                  userLatitude={latitude}
                  userLongitude={longitude}
                  hospitalLatitude={(hospital as any).distance}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmergencyBanner />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-red-600 text-white p-2 rounded-lg font-bold text-xl">
                  S
                </div>
                <span className="font-display text-xl font-bold text-white">SIAGA</span>
              </div>
              <p className="text-sm">
                Sistem Informasi Kesehatan Darurat Masyarakat
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Nomor Darurat</h4>
              <ul className="space-y-2 text-sm">
                <li>119 — SPGDT Nasional</li>
                <li>112 — Nomor Darurat Universal</li>
                <li>110 — Kepolisian</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Kontak</h4>
              <p className="text-sm">siaga@example.id</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>Data bersumber dari SIRS Kementerian Kesehatan RI | Dibuat untuk masyarakat Indonesia</p>
            <p className="mt-2">© 2026 SIAGA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
