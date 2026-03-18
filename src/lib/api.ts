import type { 
  HospitalListResponse, 
  HospitalDetailResponse, 
  FilterOptions,
  TypesResponse,
  ClassesResponse,
  OwnershipResponse
} from '@/types/hospital';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://use.api.co.id';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '8Ap2vvrQceHOTD9s2aYk5rIRLb8EylBZzapHQTJ9LoTTaeefC4';

const headers = {
  'x-api-co-id': API_KEY,
  'Content-Type': 'application/json',
};

const defaultTypes = ['Rumah Sakit Umum', 'Rumah Sakit Khusus', 'Rumah Sakit Jiwa', 'Rumah Sakit Ibu dan Anak'];
const defaultClasses = ['A', 'B', 'C', 'D'];
const defaultOwnership = ['Pemkab', 'Pemkot', 'Pemprov', 'Swasta', 'TNI/Polri'];

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
    { headers }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', response.status, errorText);
    throw new Error(`Failed to fetch hospitals: ${response.status}`);
  }

  return response.json();
}

export async function fetchHospitalByCode(code: string): Promise<HospitalDetailResponse> {
  const response = await fetch(
    `${API_BASE_URL}/hospitals/indonesia/${code}/`,
    { headers }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch hospital details');
  }

  return response.json();
}

export async function fetchHospitalTypes(): Promise<TypesResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/hospitals/indonesia/types`,
      { headers }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('fetchHospitalTypes failed, using fallback:', error);
  }
  
  return {
    is_success: true,
    message: 'Success (fallback)',
    data: {
      types: defaultTypes,
      count: defaultTypes.length
    }
  };
}

export async function fetchHospitalClasses(): Promise<ClassesResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/hospitals/indonesia/classes`,
      { headers }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('fetchHospitalClasses failed, using fallback:', error);
  }
  
  return {
    is_success: true,
    message: 'Success (fallback)',
    data: {
      classes: defaultClasses,
      count: defaultClasses.length
    }
  };
}

export async function fetchHospitalOwnership(): Promise<OwnershipResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/hospitals/indonesia/ownership`,
      { headers }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('fetchHospitalOwnership failed, using fallback:', error);
  }
  
  return {
    is_success: true,
    message: 'Success (fallback)',
    data: {
      ownership: defaultOwnership,
      count: defaultOwnership.length
    }
  };
}
