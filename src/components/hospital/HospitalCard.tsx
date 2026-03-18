import Link from 'next/link';
import { MapPin, Phone, Bed, Users, Building2, ArrowRight } from 'lucide-react';
import { Badge, getClassBadgeVariant } from '@/components/ui/Badge';
import type { Hospital } from '@/types/hospital';

interface HospitalCardProps {
  hospital: Hospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  const hasIGD = hospital.services.list.some(
    (service) => service.toLowerCase().includes('gawat darurat') || service.toLowerCase().includes('igd')
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant={getClassBadgeVariant(hospital.class)}>
          Kelas {hospital.class}
        </Badge>
        <Badge variant="default">{hospital.type}</Badge>
        {hasIGD && (
          <Badge variant="success">IGD 24 Jam</Badge>
        )}
      </div>

      <h3 className="font-bold text-lg text-slate-900 mb-3 line-clamp-2">{hospital.name}</h3>
      
      <div className="flex items-start gap-2 text-slate-600 text-sm mb-5">
        <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
        <span className="line-clamp-2">{hospital.address}</span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Bed className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <span className="font-semibold text-slate-900">{hospital.facilities.total_beds}</span>
            <span className="ml-1">Bed</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-green-50 p-2 rounded-lg">
            <Users className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <span className="font-semibold text-slate-900">{hospital.staff.total}</span>
            <span className="ml-1">Staff</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-purple-50 p-2 rounded-lg">
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <span className="font-semibold text-slate-900">{hospital.services.count}</span>
            <span className="ml-1">Layanan</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {hospital.phone && (
          <a
            href={`tel:${hospital.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Hubungi
          </a>
        )}
        <Link
          href={`/rs/${hospital.code}`}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-3 px-4 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
        >
          Detail
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
