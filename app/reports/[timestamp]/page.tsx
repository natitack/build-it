'use client';

import Nav from '@/app/components/Nav';
import ZoningTable from '@/app/components/ZoningTable';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function ItemPage() {
    const { timestamp } = useParams();

    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        fetch(`/api/zoning/history/${timestamp}`)
            .then((r) => r.json())
            .then((d) => {
            setData(d);
        });
    }, []);

    return (
        <>
            <Nav />
            {data ? (
                <ZoningTable zoningData={JSON.stringify(data, null, 2)} />
            ) : (
                <LoadingSpinner />
            )}
        </>
  );
}
