import Link from 'next/link';
import { MapPin, Phone, Bed, Users, Building2 } from 'lucide-react';
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant={getClassBadgeVariant(hospital.class)}>
          Kelas {hospital.class}
        </Badge>
        <Badge variant="default">{hospital.type}</Badge>
        {hasIGD && (
          <Badge variant="success">IGD 24 Jam</Badge>
        )}
      </div>

      <h3 className="font-semibold text-lg text-gray-900 mb-2">{hospital.name}</h3>
      
      <div className="flex items-start gap-2 text-gray-600 text-sm mb-4">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{hospital.address}</span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4 mb-4">
        <div className="flex items-center gap-1.5">
          <Bed className="w-4 h-4" />
          <span>{hospital.facilities.total_beds} Bed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{hospital.staff.total} Staff</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Building2 className="w-4 h-4" />
          <span>{hospital.services.count} Layanan</span>
        </div>
      </div>

      <div className="flex gap-3">
        {hospital.phone && (
          <a
            href={`tel:${hospital.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Hubungi
          </a>
        )}
        <Link
          href={`/rs/${hospital.code}`}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-900 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Detail
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
