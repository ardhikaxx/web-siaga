import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, User, Bed, Users, Building2, Stethoscope } from 'lucide-react';
import { fetchHospitalByCode } from '@/lib/api';
import { Badge, getClassBadgeVariant } from '@/components/ui/Badge';

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function HospitalDetailPage({ params }: PageProps) {
  const { code } = await params;
  
  try {
    const response = await fetchHospitalByCode(code);
    
    if (!response.is_success || !response.data) {
      notFound();
    }

    const hospital = response.data;
    const hasIGD = hospital.services.list.some(
      (service) => service.toLowerCase().includes('gawat darurat') || service.toLowerCase().includes('igd')
    );

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <div className="bg-red-600 text-white p-2 rounded-lg font-bold text-xl">
                  S
                </div>
                <span className="font-display text-xl font-bold text-gray-900">SIAGA</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={getClassBadgeVariant(hospital.class)}>
                Kelas {hospital.class}
              </Badge>
              <Badge variant="default">{hospital.type}</Badge>
              {hasIGD && (
                <Badge variant="success">IGD 24 Jam</Badge>
              )}
              <Badge variant={hospital.blu_status === 'BLUD' ? 'success' : 'default'}>
                {hospital.blu_status}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {hospital.name}
            </h1>

            <div className="flex items-start gap-3 text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{hospital.address}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              {hospital.phone && (
                <a
                  href={`tel:${hospital.phone}`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {hospital.phone}
                </a>
              )}
              <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                <MapPin className="w-5 h-5" />
                Buka di Maps
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Facilities */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Fasilitas
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {hospital.facilities.total_beds}
                    </div>
                    <div className="text-gray-600 text-sm">Total Tempat Tidur</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {hospital.beds.icu_with_ventilator}
                    </div>
                    <div className="text-gray-600 text-sm">ICU dengan Ventilator</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {hospital.beds.hcu}
                    </div>
                    <div className="text-gray-600 text-sm">HCU</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {hospital.beds.perinatology}
                    </div>
                    <div className="text-gray-600 text-sm">Perinatologi</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {hospital.facilities.land_area}
                    </div>
                    <div className="text-gray-600 text-sm">Luas Tanah</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {hospital.facilities.building_area}
                    </div>
                    <div className="text-gray-600 text-sm">Luas Bangunan</div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Layanan ({hospital.services.count})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {hospital.services.list.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Director */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Direktur
                </h2>
                <p className="text-gray-700">{hospital.director}</p>
              </div>

              {/* Staff */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Sumber Daya Manusia
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Staff</span>
                    <span className="font-semibold">{hospital.staff.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dokter Umum</span>
                    <span className="font-semibold">{hospital.staff.general_practitioner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spesialis Dasar</span>
                    <span className="font-semibold">{hospital.staff.basic_specialist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spesialis Lain</span>
                    <span className="font-semibold">{hospital.staff.other_specialist}</span>
                  </div>
                </div>
              </div>

              {/* Bed Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bed className="w-5 h-5" />
                  Detail Tempat Tidur
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kelas I</span>
                    <span className="font-semibold">{hospital.beds.class_i}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kelas II</span>
                    <span className="font-semibold">{hospital.beds.class_ii}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kelas III</span>
                    <span className="font-semibold">{hospital.beds.class_iii}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Informasi</h3>
                <p className="text-blue-800 text-sm">
                  Data ini bersumber dari SIRS Kementerian Kesehatan RI. 
                  Kapasitas tempat tidur bersifat statis dan tidak real-time.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching hospital:', error);
    notFound();
  }
}
