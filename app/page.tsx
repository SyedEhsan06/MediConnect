'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to mobile home by default
    router.push('/mobile');
  }, [router]);

  return null;
}
