import { Add } from '@mui/icons-material';
import { Button, Grid2 as Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { useDialogs } from '@toolpad/core';
import ActionsMenu from '../../ui/ActionsMenu';
import { Navigate, useParams } from "react-router-dom"
import { useMajors } from '../majors/useMajors';

import { useDispatchMajors } from '../majors/useDispatchMajors';
import { useDispatchDepartment } from './useDispatchDepartment';
import { useEffect, useState } from 'react';
import SpinnerLoader from '../../ui/SpinnerLoader';
import AddMajorDialog from '../majors/AddMajorDialog';

function Department() {
    const { departmentId } = useParams();
    const [loaded, setLoaded] = useState(false)
    const { department, departmentDispatch, isLoading: fetchingDep } = useDispatchDepartment()
    const { majors, isLoading: fetchingMajors } = useMajors(departmentId)
    const { majorsDispatch, isLoading: dispatchingMajors } = useDispatchMajors();

    const dialogs = useDialogs();

    const openMajorsDialog = async () => {
        await dialogs.open(AddMajorDialog, {
            id: departmentId
        })
    }

    const handleEdit = async (id: number, name: string) => {
        await dialogs.open(AddMajorDialog, {
            id,
            departmentId,
            name
        })
    }
    const handleDelete = async (id: number, name: string) => {
        const confirmed = await dialogs.confirm(<p >Are you sure to delete this Major? <br /> <strong>{name}</strong></p>, {
            title: 'Delete major ❌',
            okText: 'Yes',
            cancelText: 'No',
        })

        if (confirmed)
            majorsDispatch({ action: 'delete', payload: { departmentId, majorId: id } })
    }

    useEffect(() => {
        async function fetchDep() {
            await departmentDispatch({ action: 'get', payload: { id: departmentId } }).finally(() => setLoaded(true))
        }
        fetchDep()
    }, [departmentDispatch, departmentId])


    if (fetchingDep || fetchingMajors || dispatchingMajors)
        return <SpinnerLoader />

    if (loaded && !department)
        return <Navigate to='/404' />

    return (
        <Grid component={Paper} container flexDirection={'column'} size={{ xs: 12 }} padding={2} spacing={5} flex={1}>
            <Grid container justifyContent={'space-between'} padding={1} sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center'
            }}>
                <Typography variant='h4' color='primary'>
                    {department?.name}
                </Typography>
                <Button onClick={openMajorsDialog} variant='contained' endIcon={<Add />}>Add new</Button>
            </Grid>
            <TableContainer sx={{ maxHeight: '65dvh', overflow: 'auto' }}>
                <Table stickyHeader >
                    <TableHead sx={{ bgcolor: 'whiteSmoke' }}>
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
                            majors?.map((major) =>
                                <TableRow key={major.id}>
                                    <TableCell sx={{
                                        fontSize: 16
                                    }}>
                                        {major.id}
                                    </TableCell>
                                    <TableCell sx={{
                                        fontSize: 16,
                                        fontWeight: 600
                                    }}>
                                        <Link underline='none'>
                                            {major.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <ActionsMenu key={major.id}
                                            items={[
                                                { title: 'Edit', onClick: () => handleEdit(major.id, major.name) },
                                                { title: 'Delete', onClick: () => handleDelete(major.id, major.name) }
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

export default Department