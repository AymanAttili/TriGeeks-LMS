import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, Grid2 as Grid, Paper, Typography } from '@mui/material';
import logo from '../../images/logo.jpg'

const CertificateGenerator = ({ userDetails }) => {
    const certificateRef = useRef();

    const generatePDF = async () => {
        const element = certificateRef.current;
        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${userDetails.name}_certificate.pdf`);
    };

    return (
        <Grid container flexDirection={'column-reverse'} alignItems={'center'} padding={2}>
            {/* Certificate Template */}
            <Grid container component={Paper} flexDirection={'column'} position={'absolute'} top={-10000}
                alignItems='center'
                justifyContent={'center'}
                ref={certificateRef}
                gap={8}
                style={{
                    padding: '20px',
                    textAlign: 'center',
                    width: '297mm',
                    height: '210mm',
                }}>
                <img src={logo} width={160} style={{
                    borderRadius: 500
                }} />

                <Typography variant='h3' color='primary' fontWeight={'600'}>Certificate of Achievement</Typography>
                <Grid container flexDirection={'column'} gap={2}>
                    <Typography variant='h6' >This certifies that: </Typography>
                    <Typography variant='h3' fontWeight={'600'} fontFamily={'Faculty Glyphic'}>{userDetails.name}</Typography>
                </Grid>
                <Grid container flexDirection={'column'} gap={2}>
                    <Typography variant='h6'>has successfully completed</Typography>
                    <Typography variant='h4' color='primary'>{userDetails.course}</Typography>
                </Grid>
                <Typography>on:  <span style={{ fontWeight: '600', fontSize: 20 }}>{new Date(userDetails.date).toLocaleDateString('en-GB')}</span></Typography>
            </Grid>

            {/* Generate PDF Button */}
            <Button variant='contained' onClick={generatePDF}>Try Certificate</Button>
        </Grid>
    );
};

export default CertificateGenerator;