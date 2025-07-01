import { countries } from '@/data/countries';
import { useMemo } from 'react';

type CountryCode = {
  label: string;
  value: string;
};

export const useCountryCodes = () => {
  const countryCodes = useMemo((): CountryCode[] => {
    if (!Array.isArray(countries)) {
      console.error(
        "useCountryCodes: Data source 'countries' is not an array."
      );
      return [];
    }

    return countries.map((country) => ({
      label: `${country.name} (${country.phone_code})`,
      value: country.phone_code,
    }));
  }, []);

  return { countryCodes };
};
