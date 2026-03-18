export interface Hospital {
  code: string;
  name: string;
  address: string;
  phone: string | null;
  type: string;
  class: 'A' | 'B' | 'C' | 'D';
  blu_status: string;
  ownership: string;
  director: string;
  facilities: {
    land_area: string;
    building_area: string;
    total_beds: number;
  };
  beds: {
    class_i: number;
    class_ii: number;
    class_iii: number;
    hcu: number;
    perinatology: number;
    icu_with_ventilator: number;
  };
  services: {
    count: number;
    list: string[];
  };
  staff: {
    total: number;
    general_practitioner: number;
    basic_specialist: number;
    other_specialist: number;
  };
  province_code: string;
  regency_code: string;
  scraped_at: string;
}

export interface HospitalListResponse {
  is_success: boolean;
  message: string;
  data: Hospital[];
  paging: {
    page: number;
    size: number;
    total_item: number;
    total_page: number;
  };
}

export interface HospitalDetailResponse {
  is_success: boolean;
  message: string;
  data: Hospital;
}

export interface FilterOptions {
  name?: string;
  type?: string;
  class?: string;
  ownership?: string;
  province_code?: string;
  regency_code?: string;
  page?: number;
  size?: number;
}

export interface TypesResponse {
  is_success: boolean;
  message: string;
  data: {
    types: string[];
    count: number;
  };
}

export interface ClassesResponse {
  is_success: boolean;
  message: string;
  data: {
    classes: string[];
    count: number;
  };
}

export interface OwnershipResponse {
  is_success: boolean;
  message: string;
  data: {
    ownership: string[];
    count: number;
  };
}
