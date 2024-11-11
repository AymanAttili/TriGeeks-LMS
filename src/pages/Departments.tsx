import { Add } from '@mui/icons-material';
import { Box, Button, Grid2 as Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { useDepartments } from '../features/departments/useDepartments';
import { useDialogs } from '@toolpad/core';
import AddDepartmentDialog from '../ui/Dialogs/AddDepartmentDialog';
import ActionsMenu from '../ui/ActionsMenu';
import { useDispatchDepartment } from '../features/departments/useDispatchDepartment';
function Departments() {
    const { departments } = useDepartments();
    const { departmentDispatch } = useDispatchDepartment()
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
            departmentDispatch({ action: 'delete', payload: { id } })
    }
    return (
        <Grid component={Paper} container flexDirection={'column'} size={{ xs: 12 }} padding={2} m={2} spacing={5}>
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
                    <TableHead sx={{ bgcolor: 'whiteSmoke' }}>
                        <TableRow >
                            <TableCell width={80} sx={{
                                fontSize: 18
                            }}>
                                ID
                            </TableCell>
                            <TableCell sx={{
                                fontSize: 18
                            }}>
                                Name
                            </TableCell>
                            <TableCell width={40} sx={{
                                fontSize: 18
                            }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments.map((dep) =>
                            <TableRow key={dep.id}>
                                <TableCell sx={{
                                    fontSize: 16
                                }}>
                                    {dep.id}
                                </TableCell>
                                <TableCell sx={{
                                    fontSize: 16
                                }}>
                                    {dep.name}
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