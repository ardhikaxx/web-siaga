import Link from 'next/link';
import { Phone, AlertTriangle, ArrowRight } from 'lucide-react';

export function EmergencyBanner() {
  return (
    <div className="bg-red-600 text-white rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Butuh Bantuan Darurat?</h2>
            <p className="text-red-100">
              Hubungi nomor darurat di bawah ini atau cari RS terdekat sekarang
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:119"
            className="flex items-center justify-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            119 (Ambulans)
          </a>
          <Link
            href="/darurat"
            className="flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
          >
            Panduan Darurat
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
