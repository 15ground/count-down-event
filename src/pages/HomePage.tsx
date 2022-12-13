import useCountDown from '@hooks/useCountDown';
import { GitHub } from '@mui/icons-material';
import { Box, Grid, Stack, StackProps, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion, useAnimation, useInView } from 'framer-motion';
import { omit } from 'lodash';
import { useEffect, useRef } from 'react';
import ReactConfetti from 'react-confetti';
import { BsFacebook } from 'react-icons/bs';

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
                width: 70,
                borderRadius: 3,
                boxShadow: '0px 0px 10px 0px rgba(234, 189, 104, 0.8)',
                cursor: 'pointer',
                ...stackProps?.sx,
            }}
            {...omit(stackProps, 'sx')}
        >
            <Typography fontSize={52} color="#C62D2F" fontWeight={700}>
                {time.value}
            </Typography>
            <Typography color="GrayText">{time.title}</Typography>
        </Stack>
    );
};

export default function HomePage() {
    const theme = useTheme();
    const classes = useStyles();
    const { days, hours, minutes, seconds } = useCountDown();
    const { innerWidth: width, innerHeight: height } = window;
    const remainingTimes: Time[] = [
        { title: 'days', value: days },
        { title: 'hours', value: hours },
        { title: 'minutes', value: minutes },
        { title: 'seconds', value: seconds },
    ];
    const isExpired = days === '00' && hours === '00' && minutes === '00' && seconds === '00';

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const control = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref);
    console.log('🚀 ~ file: HomePage.tsx:69 ~ useEffect ~ isInView', isInView);
    useEffect(() => {
        if (isInView) {
            control.start('animate');
        }else{
            control.start('initial')
        }
    }, [control, isInView]);
    const variants = {
        initial: {
            x: -1000,
            opacity: 0.5,
        },
        animate: {
            x: 0,
            opacity: 1,
            rotate: [0, 10, 0],
            transition: {
                staggerChildren: 0.5,
                duration: 1,
            },
        },
    };
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" className={classes.baseStyles}>
                {isExpired && <ReactConfetti width={width} height={height - 1} />}
                <Stack justifyContent="center" alignItems="center" spacing={5}>
                    <Box
                        component={motion.p}
                        initial={{ x: '100vw', opacity: 0.5, rotateZ: 180 }}
                        animate={{ x: 0, opacity: 1, rotateZ: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                    >
                        <Typography
                            fontSize={32}
                            color="primary"
                            fontWeight={550}
                            sx={{ textShadow: '0 0 5px rgba(198, 45, 47, 1)' }}
                            align="center"
                        >
                            {!isExpired ? 'WAITING FOR LUNAR NEW YEAR 2023' : 'HAPPY LUNAR NEW YEAR 2023'}
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ flexWrap: { sm: 'nowrap', xs: 'wrap' } }}
                        gap={3}
                    >
                        {remainingTimes.map((item, index) => {
                            const isLast = index === remainingTimes.length - 1;
                            return (
                                <>
                                    <Box
                                        component={motion.div}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index + 0.5, duration: index + 0.5 }}
                                    >
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
                                    </Box>
                                    {!isLast && !isMobile && (
                                        <Box
                                            component={motion.div}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index + 1, duration: index + 1 }}
                                        >
                                            <Typography fontSize={22} color="GrayText">
                                                :
                                            </Typography>
                                        </Box>
                                    )}
                                </>
                            );
                        })}
                    </Stack>
                </Stack>
                <Stack position="fixed" direction="row" spacing={1.5} sx={{ bottom: 20, cursor: 'pointer' }}>
                    <Box
                        component={motion.div}
                        initial={{ x: '-100vw', rotateZ: -180 }}
                        animate={{ x: 0, rotateZ: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                    >
                        <a href="https://www.facebook.com/v1ethung" target="blank">
                            <BsFacebook style={{ fontSize: 22, fill: theme.palette.info.main }} />
                        </a>
                    </Box>
                    <Box
                        component={motion.div}
                        initial={{ x: '100vw', rotateZ: 180 }}
                        animate={{ x: 0, rotateZ: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                    >
                        <a href="https://github.com/15ground" target="blank" style={{ color: 'inherit' }}>
                            <GitHub />
                        </a>
                    </Box>
                </Stack>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" className={classes.baseStyles}>
                {isExpired && <ReactConfetti width={width} height={height - 1} />}
                <Stack justifyContent="center" alignItems="center" spacing={5}>
                    <Box component={motion.p} ref={ref} initial="hidden" animate={control} variants={variants}>
                        <Typography
                            fontSize={32}
                            color="primary"
                            fontWeight={550}
                            sx={{ textShadow: '0 0 5px rgba(198, 45, 47, 1)' }}
                            align="center"
                        >
                            {!isExpired ? 'WAITING FOR LUNAR NEW YEAR 2023' : 'HAPPY LUNAR NEW YEAR 2023'}
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ flexWrap: { sm: 'nowrap', xs: 'wrap' } }}
                        gap={3}
                    >
                        {remainingTimes.map((item, index) => {
                            const isLast = index === remainingTimes.length - 1;
                            return (
                                <>
                                    <Box
                                        component={motion.div}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index + 0.5, duration: index + 0.5 }}
                                    >
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
                                    </Box>
                                    {!isLast && !isMobile && (
                                        <Box
                                            component={motion.div}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index + 1, duration: index + 1 }}
                                        >
                                            <Typography fontSize={22} color="GrayText">
                                                :
                                            </Typography>
                                        </Box>
                                    )}
                                </>
                            );
                        })}
                    </Stack>
                </Stack>
                <Stack position="fixed" direction="row" spacing={1.5} sx={{ bottom: 20, cursor: 'pointer' }}>
                    <Box
                        component={motion.div}
                        initial={{ x: '-100vw', rotateZ: -180 }}
                        animate={{ x: 0, rotateZ: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                    >
                        <a href="https://www.facebook.com/v1ethung" target="blank">
                            <BsFacebook style={{ fontSize: 22, fill: theme.palette.info.main }} />
                        </a>
                    </Box>
                    <Box
                        component={motion.div}
                        initial={{ x: '100vw', rotateZ: 180 }}
                        animate={{ x: 0, rotateZ: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                    >
                        <a href="https://github.com/15ground" target="blank" style={{ color: 'inherit' }}>
                            <GitHub />
                        </a>
                    </Box>
                </Stack>
            </Grid>
        </>
    );
}
