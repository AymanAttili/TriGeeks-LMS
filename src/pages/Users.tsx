import { Button, ButtonGroup, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { roleNames } from '../Enums/roles';
import { levelNames } from '../Enums/educationLevels';
import { useUsers } from '../features/users/useUsers';
import { useDialogs } from '@toolpad/core';
import ActionsMenu from '../ui/ActionsMenu';
import { useDispatchUsers } from '../features/users/useDispatchUsers';
import { Add } from '@mui/icons-material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { filterOperators } from '../Enums/filterOperators';
import ShowUserDetails from '../features/users/ShowUserDetails';
import AddUserDialog from '../features/users/AddUserDialog';

function Users() {
    const [filters, setFilters] = useState('')
    const [userStatus, setUserStatus] = useState(true);
    const [paginationModel, setPaginationModel] = useState({
        page: 1,
        pageSize: 10,
        userStatus
    })
    const { users, isLoading: fetchingUsers } = useUsers(paginationModel);
    const { usersDispatch, isLoading: dispatchingUser } = useDispatchUsers()
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
            minWidth: 120,
            editable: true,
        },
        {
            field: 'firstName',
            headerName: 'First name',
            minWidth: 120,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            minWidth: 120,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 200,
            editable: true,
        },
        {
            field: 'educationalLevel',
            valueGetter: (value) => {
                return levelNames[value]
            },
            headerName: 'Educational level',
            minWidth: 150,
            editable: true,
        },
        {
            field: 'role',
            valueGetter: (value) => {
                return roleNames[value]
            },
            headerName: 'Role',
            minWidth: 100,
            editable: true,
        },
        {
            field: 'department',
            valueGetter: (value) => {
                return value?.name
            },
            headerName: 'Department',
            minWidth: 150,
            editable: true,
        },
        {
            field: 'major',
            valueGetter: (value) => {
                return value?.name
            },
            headerName: 'Major',
            minWidth: 130,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 80,
            cellClassName: 'actions',
            getActions: (value) => {
                return [
                    <ActionsMenu key={value.id}
                        items={[
                            { title: 'Edit', onClick: () => handleEdit(value.row) },
                            { title: `${userStatus ? 'Deactivate' : 'Activate'}`, onClick: () => handleDeactivate(value.id) }
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

    const handleDeactivate = async (id) => {
        const confirmed = await dialogs.confirm(`Are you sure to change this User to ${userStatus ? 'inactive' : 'active'}?`, {
            title: `${userStatus ? 'Deactivate user ❌' : 'Activate user ✅'}`,
            okText: 'Yes',
            cancelText: 'No',
        })

        if (confirmed)
            usersDispatch({
                action: 'deactivate', payload: {
                    id,
                    status: !userStatus
                }
            })
    }

    useEffect(() => {
        setPaginationModel({
            page: 1,
            pageSize: 10,
            userStatus
        })
    }, [userStatus, setPaginationModel])

    return (
        <Grid component={Paper} container alignSelf={'center'} flexDirection={'column'}
            spacing={2} sx={{
                height: 'calc(100vh - 85px)',
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
            <Grid container justifyContent={'space-between'} wrap={'wrap'} padding={1} sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center'
            }}>
                <Typography variant='h4' color='primary'>
                    Users
                </Typography>
                <ButtonGroup >
                    <Button variant={userStatus ? 'contained' : 'outlined'} onClick={() => setUserStatus(true)}>Active</Button>
                    <Button variant={!userStatus ? 'contained' : 'outlined'} onClick={() => setUserStatus(false)}>Inactive</Button>
                </ButtonGroup>
                <Button
                    onClick={openUsersDialog}
                    variant='contained' endIcon={<Add />}>Add user</Button>
            </Grid>
            <DataGrid
                loading={fetchingUsers || dispatchingUser}
                rows={users?.items}
                isCellEditable={() => false}
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
                pageSizeOptions={[5, 10, 15, 25, 50]}
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
                        if (model.items.length === 0) {
                            setPaginationModel(
                                {
                                    page: 1,
                                    pageSize: 10,
                                    userStatus
                                }
                            )
                            return;
                        }

                        const item = model.items[0];
                        if (!item.operator.includes('Empty') && item.value === undefined)
                            return;

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
                        else if (item.operator !== 'isEmpty') {
                            newFilters = `${item.field}$$`;
                        }
                        setFilters(newFilters);
                        setPaginationModel((model) => {
                            return {
                                ...model,
                                filters: newFilters,
                                page: 1,
                                userStatus
                            }
                        })
                    }
                }

                disableColumnSorting
            />
        </Grid>
    )
}

export default Users