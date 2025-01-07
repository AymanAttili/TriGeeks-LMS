import { AudioFile, Description, FolderZip, Image, VideoFile } from '@mui/icons-material'

function FileIcon({ type }) {
    const [tp, ext] = type.split('/');

    if (tp === 'image')
        return <Image fontSize={'large'} sx={{ color: 'darksalmon' }} />
    if (tp === 'video')
        return <VideoFile fontSize={'large'} sx={{ color: 'brown' }} />
    if (tp === 'audio')
        return <AudioFile fontSize={'large'} />
    if (tp === 'application' && ext !== 'pdf')
        return <FolderZip fontSize={'large'} sx={{ color: '#383a9a' }} />
    return (
        <Description fontSize={'large'} sx={{ color: "#FFA726" }} />
    )
}

export default FileIcon