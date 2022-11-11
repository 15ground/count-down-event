import useCountDown from '@hooks/useCountDown';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';

export default function HomePage() {
    const { days, hours, minutes, seconds } = useCountDown();
    return (
        <Grid
            container
            justifyContent="center"
            alignContent="center"
            sx={{
                width: '100%',
                height: '100vh',
                background: 'url(/images/t1.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Typography>{`${days} : ${hours} : ${minutes} : ${seconds}`}</Typography>
            <Stack></Stack>
        </Grid>
    );
}
