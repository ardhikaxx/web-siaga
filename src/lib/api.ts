import { API_BASE_URL, API_KEY } from './constants';
import type { 
  HospitalListResponse, 
  HospitalDetailResponse, 
  FilterOptions,
  TypesResponse,
  ClassesResponse,
  OwnershipResponse
} from '@/types/hospital';

const headers = {
  'x-api-co-id': API_KEY,
  'Content-Type': 'application/json',
};

export async function fetchHospitals(options: FilterOptions = {}): Promise<HospitalListResponse> {
  const params = new URLSearchParams();
  
  if (options.name) params.append('name', options.name);
  if (options.type) params.append('type', options.type);
  if (options.class) params.append('class', options.class);
  if (options.ownership) params.append('ownership', options.ownership);
  if (options.province_code) params.append('province_code', options.province_code);
  if (options.regency_code) params.append('regency_code', options.regency_code);
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());

  const response = await fetch(
    `${API_BASE_URL}/hospitals/indonesia/?${params.toString()}`,
    { headers, next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch hospitals');
  }

  return response.json();
}

export async function fetchHospitalByCode(code: string): Promise<HospitalDetailResponse> {
  const response = await fetch(
    `${API_BASE_URL}/hospitals/indonesia/${code}/`,
    { headers, next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch hospital details');
  }

  return response.json();
}

export async function fetchHospitalTypes(): Promise<TypesResponse> {
  const response = await fetch(
    `${API_BASE_URL}/hospitals/indonesia/types`,
    { headers, next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch hospital types');
  }

  return response.json();
}

export async function fetchHospitalClasses(): Promise<ClassesResponse> {
  const response = await fetch(
    `${API_BASE_URL}/hospitals/indonesia/classes`,
    { headers, next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch hospital classes');
  }

  return response.json();
}

export async function fetchHospitalOwnership(): Promise<OwnershipResponse> {
  const response = await fetch(
    `${API_BASE_URL}/hospitals/indonesia/ownership`,
    { headers, next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch ownership types');
  }

  return response.json();
}
