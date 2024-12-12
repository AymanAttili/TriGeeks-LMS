import CertificateGenerator from '../features/certificates/CertificateTemplate';
function Certificates() {
    return (
        <CertificateGenerator userDetails={{
            name: 'John Doe',
            course: 'ReactJS Development',
            date: '2024-11-16',
        }} />
    )
}

export default Certificates