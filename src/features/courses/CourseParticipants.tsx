import { useState } from "react";
import { useCourseParticipants } from "./useCourseParticipants";
import { useParams } from "react-router-dom";
import { Box, Chip, Grid2 as Grid, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import SpinnerLoader from "../../ui/SpinnerLoader";
import { courseStatuses, statuses } from "../../Enums/courseStatuses";
import { useDialogs } from "@toolpad/core";
import { usePokeUser } from "./usePokeUser";
import { convertDate } from "../../utils/helpers";

function CourseParticipants() {
    const { courseId } = useParams();
    const dialogs = useDialogs();
    const { pokeUser, isLoading: pokingUser } = usePokeUser();
    const [filter, setFilter] = useState(0);
    const [page, setPage] = useState(1);
    const [clickedUser, setClickedUser] = useState(0);
    const { participants, isLoading } = useCourseParticipants({ courseId, page, filter });

    const handlePokeUser = async (userId) => {
        setClickedUser(userId)
        const confirm = await dialogs.confirm('When you click Yes, an email will be sent to the user to notify him about course status.', {
            title: 'Poke user👉',
            okText: 'Yes',
        })
        if (confirm) {
            await pokeUser({ courseId, userId })
        }
    }

    const handleStatusChange = (e) => {
        setFilter(e.target.value)
    }

    if (isLoading)
        return <SpinnerLoader />

    return (
        <Grid container flexDirection={'column'} spacing={2} padding={1}>
            <TableContainer sx={{ height: '65dvh' }}>
                <Grid container justifyContent={'space-between'} alignItems={'center'} paddingX={1}>
                    <Box width={150}></Box>
                    <Pagination count={participants?.metadata.totalPages} disabled={isLoading} page={page} onChange={(e, val) => setPage(val)} variant="outlined" color="primary" />
                    <TextField select label="Status" margin='normal' disabled={isLoading}
                        onChange={handleStatusChange}
                        sx={{ minWidth: 150 }}
                        value={filter}
                    >
                        <MenuItem key={0} value={0}>
                            All
                        </MenuItem>
                        {statuses.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ bgcolor: 'primary.light' }}>
                                User name
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'primary.light' }}>
                                Started at
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'primary.light' }}>
                                Finished at
                            </TableCell>
                            <TableCell sx={{ bgcolor: 'primary.light' }}>
                                Status
                            </TableCell>
                            <TableCell width={100} sx={{ textAlign: 'center', bgcolor: 'primary.light' }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            participants?.items.map((user) =>
                                <TableRow key={user.userId}>
                                    <TableCell>
                                        {user.userName}
                                    </TableCell>
                                    <TableCell>
                                        {convertDate(user.startedAtUtc)}
                                    </TableCell>
                                    <TableCell>
                                        {convertDate(user.finishedAtUtc)}

                                    </TableCell>
                                    <TableCell>
                                        {
                                            courseStatuses[user.status]
                                        }
                                    </TableCell>
                                    <TableCell width={100} sx={{ textAlign: 'center' }}>
                                        <Chip label={(clickedUser === user.userId && pokingUser) ? 'Poking...' : 'Poke'} disabled={clickedUser === user.userId && pokingUser} clickable onClick={() => handlePokeUser(user.userId)} />
                                    </TableCell>
                                </TableRow>
                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default CourseParticipants