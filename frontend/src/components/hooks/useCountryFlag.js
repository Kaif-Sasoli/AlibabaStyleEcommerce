import { useEffect, useState } from 'react';

// Custom Hook
export function useCountryFlag(location) {
  const [flagUrl, setFlagUrl] = useState(null);

  useEffect(() => {
    if (!location) return;

    const countryName = location?.split(',')[0]?.trim();

    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then(res => res.json())
      .then(data => {
        const matched = data.find(
          country => country.name.common.toLowerCase() === countryName.toLowerCase()
        );
        if (matched?.flags?.png) {
          setFlagUrl(matched.flags.png);
        } else {
          setFlagUrl(null);
        }
      })
      .catch(() => setFlagUrl(null));
  }, [location]);

  return flagUrl;
}
