'use client';

import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function Dashboard() {

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
            <div>
                <Nav />
                {
                    data.map((zoning, i) => 
                        <Card key={i}>
                            <CardActionArea
                                onClick={() => {}}
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
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
}