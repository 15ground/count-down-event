import useCountDown from '@hooks/useCountDown';
import { Grid, Stack, StackProps, Theme, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { omit } from 'lodash';

const useStyles = makeStyles((theme: Theme) => ({
    baseStyles: {
        width: '100%',
        height: '100vh',
        background: 'url(/images/t1.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}));

interface Time {
    title: string;
    value: string | number;
}

const BaseTime = ({ time, stackProps }: { time: Time; stackProps?: StackProps }) => {
    return (
        <Stack
            alignItems="center"
            sx={{
                py: 2,
                px: 4,
                width: 50,
                borderRadius: 3,
                boxShadow: '0px 0px 10px 0px rgba(234, 189, 104, 0.8)',
                ...stackProps?.sx,
            }}
            {...omit(stackProps, 'sx')}
        >
            <Typography fontSize={38} color="#C62D2F">
                {time.value}
            </Typography>
            <Typography color="GrayText">{time.title}</Typography>
        </Stack>
    );
};

export default function HomePage() {
    const classes = useStyles();
    const { days, hours, minutes, seconds } = useCountDown();
    const remainingTimes: Time[] = [
        { title: 'days', value: days },
        { title: 'hours', value: hours },
        { title: 'minutes', value: minutes },
        { title: 'seconds', value: seconds },
    ];
    return (
        <Grid container justifyContent="center" alignItems="center" className={classes.baseStyles}>
            <Stack justifyContent="center" alignItems="center" spacing={5}>
                <Typography fontSize={46} color="primary">LUNAR NEW YEAR 2023 IS COMING</Typography>
                <Stack direction="row" alignItems="center" spacing={3}>
                    {remainingTimes.map((item, index) => {
                        const isLast = index === remainingTimes.length - 1;
                        return (
                            <>
                                <BaseTime
                                    time={item}
                                    stackProps={{
                                        sx: {
                                            borderLeft: index === 0 ? '2px solid #EABD68' : 'none',
                                            borderBottom: index % 2 === 0 ? '2px solid #EABD68' : 'none',
                                            borderTop: index % 2 !== 0 ? '2px solid #EABD68' : 'none',
                                            borderRight: isLast ? '2px solid #EABD68' : 'none',
                                        },
                                    }}
                                />
                                {!isLast && (
                                    <Typography fontSize={22} color="GrayText">
                                        :
                                    </Typography>
                                )}
                            </>
                        );
                    })}
                </Stack>
            </Stack>
        </Grid>
    );
}
