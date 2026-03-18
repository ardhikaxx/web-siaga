import Link from 'next/link';
import { Phone, AlertTriangle, ArrowRight } from 'lucide-react';

export function EmergencyBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-8 md:p-10" 
      style={{ 
        background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)',
        boxShadow: '0 25px 50px -12px rgba(220, 38, 38, 0.4)'
      }}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        }} />
      </div>
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-start gap-5">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Butuh Bantuan Darurat?</h2>
            <p className="text-red-100 text-lg">
              Hubungi nomor darurat di bawah ini atau cari RS terdekat sekarang
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:119"
            className="flex items-center justify-center gap-3 bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg"
          >
            <Phone className="w-5 h-5" />
            119 (Ambulans)
          </a>
          <Link
            href="/darurat"
            className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all"
          >
            Panduan Darurat
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
