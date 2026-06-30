import { useEffect, useState } from 'react';
import { getRestaurantStatus, RESTAURANT_STATUS_REFRESH_MS } from '../utils/openingHours';

export function useRestaurantStatus() {
  const [status, setStatus] = useState(() => getRestaurantStatus());

  useEffect(() => {
    const updateStatus = () => setStatus(getRestaurantStatus());
    const interval = window.setInterval(updateStatus, RESTAURANT_STATUS_REFRESH_MS);
    return () => window.clearInterval(interval);
  }, []);

  return status;
}
