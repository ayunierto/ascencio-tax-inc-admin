import { useQuery } from '@tanstack/react-query';

export interface IPAPIResponse {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: null;
  latitude: number;
  longitude: number;
  msa: null;
  dma: null;
  radius: string;
  ip_routing_type: string;
  connection_type: string;
  location: Location;
}

export interface Location {
  geoname_id: number;
  capital: string;
  languages: Language[];
  country_flag: string;
  country_flag_emoji: string;
  country_flag_emoji_unicode: string;
  calling_code: string;
  is_eu: boolean;
}

export interface Language {
  code: string;
  name: string;
  native: string;
}

export interface BadResponse {
  success: boolean;
  error: Error;
}

export interface Error {
  code: number;
  type: string;
  info: string;
}

const useIPGeolocation = () => {
  const IP_API_KEY = import.meta.env.VITE_IP_API_KEY;
  if (!IP_API_KEY) {
    throw new Error('IP_API_KEY is not defined in environment variables');
  }

  const getLocaleAction = async () => {
    const response = await fetch(
      `https://api.ipapi.com/check?access_key=${IP_API_KEY}`
    );
    const data: IPAPIResponse | BadResponse = await response.json();
    return data;
  };

  const {
    data: location,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['location'],
    queryFn: getLocaleAction,
    staleTime: 1000 * 60 * 60 * 24, // 1 day to execute the consultation again
  });


  return {
    location,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
};

export default useIPGeolocation;
