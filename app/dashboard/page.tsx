'use client';

import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {

    const router = useRouter();
    
    const [data, setData] = useState<any | undefined>();

    useEffect(() => {
        fetch("/api/zoning/history")
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

    if (data) {
        return (
            <>
            <Nav />
            <div style={{
                maxWidth: 1000,
                margin: '2.5rem auto',
                padding: '2.5rem 2rem',
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                fontFamily: 'Stratum2, Open Sans, system-ui, sans-serif',
            }}>
                
                <h1 style={{
                    marginBottom: '2rem',
                    fontSize: '2rem',
                    textAlign: 'center',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                }}>Previous searches</h1>
                {
                    data.map((zoning, i) => 
                        <Card key={i} sx={{ marginBottom: 2 }}>
                            <CardActionArea
                                onClick={() => router.push(`/reports/${zoning.timestamp}`)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#95f098'
                                    }
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {zoning.address}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {zoning.formattedDate}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                }
                
            </div>
            </>
        )
    } else {
        return (
            <LoadingSpinner />
        )
    }
    
}