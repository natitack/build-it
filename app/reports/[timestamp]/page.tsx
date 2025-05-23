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
            const formatted = d.map((item: any) => {
                const date = new Date(item.timestamp * 1000); // Convert to milliseconds
                return {
                ...item,
                formattedDate: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                };
            });
            setData(formatted);
        });
    }, []);

  return (
    <div>
        Hi
    </div>
  );
}
