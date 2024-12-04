import { Add } from '@mui/icons-material';
import { Button, Grid2 as Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'

import { useDepartments } from '../features/departments/useDepartments';
import { useDialogs } from '@toolpad/core';
import AddDepartmentDialog from '../ui/Dialogs/AddDepartmentDialog';
import ActionsMenu from '../ui/ActionsMenu';
import SpinnerLoader from '../ui/SpinnerLoader';
import { useDispatchDepartment } from '../features/departments/useDispatchDepartment';
function Departments() {
    const { departments, isLoading: fetchingDeps } = useDepartments();
    const { departmentDispatch, isLoading: dispatchingDeps } = useDispatchDepartment()
    const dialogs = useDialogs();

    const openDepartmentDialog = async () => {
        await dialogs.open(AddDepartmentDialog)
    }

    const handleEdit = async (id: number, name: string) => {
        await dialogs.open(AddDepartmentDialog, {
            id,
            name
        })
    }
    const handleDelete = async (id: number, name: string) => {
        const confirmed = await dialogs.confirm(<p >Are you sure to delete this Department? <br /> <strong>{name}</strong></p>, {
            title: 'Delete department ❌',
            okText: 'Yes',
            cancelText: 'No',
        })

        if (confirmed)
            await departmentDispatch({ action: 'delete', payload: { id } })
    }

    if (fetchingDeps || dispatchingDeps)
        return <SpinnerLoader />

    return (
        <Grid component={Paper} container flexDirection={'column'} size={{ xs: 12 }} padding={2} spacing={5} flex={1}>
            <Grid container justifyContent={'space-between'} padding={1} sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center'
            }}>
                <Typography variant='h4' color='primary'>
                    Departments
                </Typography>
                <Button onClick={openDepartmentDialog} variant='contained' endIcon={<Add />}>Add new</Button>
            </Grid>
            <TableContainer sx={{ maxHeight: '65dvh', overflow: 'auto' }}>
                <Table stickyHeader >
                    <TableHead>
                        <TableRow >
                            <TableCell width={80} sx={{
                                fontSize: 18,
                                bgcolor: 'primary.light'
                            }}>
                                ID
                            </TableCell>
                            <TableCell sx={{
                                fontSize: 18,
                                bgcolor: 'primary.light'
                            }}>
                                Name
                            </TableCell>
                            <TableCell width={40} sx={{
                                fontSize: 18,
                                bgcolor: 'primary.light'
                            }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            departments?.map((dep) =>
                                <TableRow key={dep.id}>
                                    <TableCell sx={{
                                        fontSize: 16
                                    }}>
                                        {dep.id}
                                    </TableCell>
                                    <TableCell sx={{
                                        fontSize: 16,
                                        fontWeight: 600
                                    }}>
                                        <Tooltip title="Manage Department">
                                            <Link component={RouterLink} to={`${dep.id}`} underline='none'>
                                                {dep.name}
                                            </Link>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <ActionsMenu key={dep.id}
                                            items={[
                                                { title: 'Edit', onClick: () => handleEdit(dep.id, dep.name) },
                                                { title: 'Delete', onClick: () => handleDelete(dep.id, dep.name) }
                                            ]}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid >
    )
}

export default Departments