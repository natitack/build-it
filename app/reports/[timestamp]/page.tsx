import ZoningTable from '@/app/components/ZoningTable';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ItemPage() {
    const router = useRouter();
    const { timestamp } = router.query;

    const [data, setData] = useState<any | null>();

    useEffect(() => {
        fetch(`/api/zoning/history/${timestamp}`)
            .then((r) => r.json())
            .then((d) => {
            setData(d);
        });
    }, []);

  return (
    <div>
        {data ? <ZoningTable zoningData={data} /> : <div>Loading</div>}
    </div>
  );
}
