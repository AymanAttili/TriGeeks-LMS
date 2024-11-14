import { Button, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { roleNames } from '../Enums/roles';
import { levelNames } from '../Enums/educationLevels';
import { useUsers } from '../features/users/useUsers';
import { useNavigate } from 'react-router-dom';
import { useDialogs } from '@toolpad/core';
import ActionsMenu from '../ui/ActionsMenu';
import { useDispatchUsers } from '../features/users/useDispatchUsers';
import { Add } from '@mui/icons-material';
import { useMemo, useRef, useState } from 'react';
import { filterOperators } from '../Enums/filterOperators';
import AddUserDialog from '../ui/Dialogs/AddUserDialog';
import ShowUserDetails from '../ui/Dialogs/ShowUserDetails';

function Users() {
    const [filters, setFilters] = useState('')
    const [paginationModel, setPaginationModel] = useState({
        filters,
        page: 1,
        pageSize: 10
    })
    const { users, isLoading: fetchingUsers } = useUsers(paginationModel);
    const { usersDispatch, isLoading: dispatchingUser } = useDispatchUsers()
    const navigate = useNavigate()
    const dialogs = useDialogs();

    const rowCountRef = useRef(users?.metadata.totalItems || 0);

    const rowCount = useMemo(() => {
        if (users?.metadata.totalItems !== undefined) {
            rowCountRef.current = users?.metadata.totalItems;
        }
        return rowCountRef.current;
    }, [users?.metadata.totalItems]);

    const columns = [
        {
            field: 'workId',
            headerName: 'Work ID',
            width: 120,
            editable: true,
        },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 120,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 120,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: true,
        },
        {
            field: 'educationalLevel',
            valueGetter: (value) => {
                return levelNames[value]
            },
            headerName: 'Educational level',
            width: 150,
            editable: true,
        },
        {
            field: 'role',
            valueGetter: (value) => {
                return roleNames[value]
            },
            headerName: 'Role',
            width: 100,
            editable: true,
        },
        {
            field: 'department',
            valueGetter: (value) => {
                return value.name
            },
            headerName: 'Department',
            width: 150,
            editable: true,
        },
        {
            field: 'major',
            valueGetter: (value) => {
                return value.name
            },
            headerName: 'Major',
            width: 130,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            cellClassName: 'actions',
            getActions: (value) => {
                return [
                    <ActionsMenu key={value.id}
                        items={[
                            { title: 'Edit', onClick: () => handleEdit(value.row) },
                            { title: 'Delete', onClick: () => handleDelete(value.id) }
                        ]}
                    />
                ];
            },
        }
    ];

    const openUsersDialog = async () => {
        await dialogs.open(AddUserDialog)
    }

    const handleEdit = async (data) => {
        await dialogs.open(AddUserDialog, { user: data })
    }

    const handleDelete = async (id) => {
        const confirmed = await dialogs.confirm('Are you sure to delete this User?', {
            title: 'Delete User ❌',
            okText: 'Yes',
            cancelText: 'No',
        })

        if (confirmed)
            usersDispatch({ action: 'delete', payload: { id } })
    }

    return (
        <Grid component={Paper} container alignSelf={'center'} flexDirection={'column'} height={'90dvh'} spacing={2} sx={{
            padding: 2,
            width: {
                xs: '100dvw',
                sm: '90dvw',
                md: '75dvw',
                lg: '81dvw',
                xl: '84dvw'
            }
        }}
        >
            <Grid container justifyContent={'space-between'} padding={1} sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center'
            }}>
                <Typography variant='h4' color='primary'>
                    Users
                </Typography>
                <Button
                    onClick={openUsersDialog}
                    variant='contained' endIcon={<Add />}>Add user</Button>
            </Grid>
            <DataGrid
                loading={fetchingUsers || dispatchingUser}
                rows={users?.items}
                columns={columns}
                rowCount={rowCount}
                editMode="row"
                disableRowSelectionOnClick
                onRowClick={async (data) => {
                    const confirmed = await dialogs.confirm('Do you want to show full user details?', {
                        okText: 'Yes',
                        cancelText: 'No',
                    })

                    if (confirmed)
                        await dialogs.open(ShowUserDetails, { user: data.row })
                }}
                sx={{
                    width: '100%',
                    overflow: 'auto',
                    '.MuiDataGrid-columnHeader, .MuiDataGrid-filler, .MuiDataGrid-scrollbarFiller': {
                        bgcolor: 'primary.light'
                    }
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                paginationMode='server'
                paginationModel={{
                    ...paginationModel,
                    page: paginationModel.page - 1
                }}
                onPaginationModelChange={(model) => {
                    setPaginationModel({ page: model.page + 1, pageSize: model.pageSize, filters })
                }}
                filterMode='server'
                // filterModel={ }
                onFilterModelChange={
                    (model) => {
                        const item = model.items[0];
                        let newFilters = '';
                        if (item?.value?.length && item.operator === 'isAnyOf') {
                            newFilters = `${item.field}==`
                            for (let i = 0; i < item.value.length; i++) {
                                if (i > 0)
                                    newFilters += '|'
                                newFilters += `${item.value[i]}`;
                            }

                        }
                        else if (item?.value && item.operator !== 'isNotEmpty') {
                            const op = filterOperators[item.operator];
                            newFilters = `${item.field}${op}${item.value}`;
                        }

                        setFilters(newFilters);
                        setPaginationModel((model) => {
                            return {
                                ...model,
                                filters: newFilters,
                                page: 1
                            }
                        })
                    }
                }

                // disableColumnFilter
                disableColumnSorting
            />
        </Grid>
    )
}

export default Users