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
    <div className="card p-6 hover:shadow-2xl" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant={getClassBadgeVariant(hospital.class)}>
          Kelas {hospital.class}
        </Badge>
        <Badge variant="default">{hospital.type}</Badge>
        {hasIGD && (
          <Badge variant="success">IGD 24 Jam</Badge>
        )}
      </div>

      <h3 className="font-bold text-lg mb-3 line-clamp-2" style={{ color: '#1E293B' }}>{hospital.name}</h3>
      
      <div className="flex items-start gap-2 text-sm mb-5" style={{ color: '#64748B' }}>
        <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#0D9488' }} />
        <span className="line-clamp-2">{hospital.address}</span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm border-t pt-4 mb-5" style={{ borderColor: '#E2E8F0', color: '#64748B' }}>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ background: 'rgba(13, 148, 136, 0.1)' }}>
            <Bed className="w-4 h-4" style={{ color: '#0D9488' }} />
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1E293B' }}>{hospital.facilities.total_beds}</span>
            <span className="ml-1">Bed</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
            <Users className="w-4 h-4" style={{ color: '#6366F1' }} />
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1E293B' }}>{hospital.staff.total}</span>
            <span className="ml-1">Staff</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
            <Building2 className="w-4 h-4" style={{ color: '#F59E0B' }} />
          </div>
          <div>
            <span className="font-semibold" style={{ color: '#1E293B' }}>{hospital.services.count}</span>
            <span className="ml-1">Layanan</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {hospital.phone && (
          <a
            href={`tel:${hospital.phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-colors"
            style={{ background: '#0D9488', color: 'white' }}
          >
            <Phone className="w-4 h-4" />
            Hubungi
          </a>
        )}
        <Link
          href={`/rs/${hospital.code}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-colors"
          style={{ background: '#F1F5F9', color: '#1E293B' }}
        >
          Detail
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
