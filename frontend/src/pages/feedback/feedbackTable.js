import { Table } from "@mui/material";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
const feedbackTable = ({ rows }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Game Name</TableCell>
                        <TableCell>Your review</TableCell>
                        <TableCell>upload Pictures</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.length > 0 ? rows.map(row => (
                            <TableRow key={row.GameName} sx={{ '&:last-child td, &:last-child th, &:last-child th, &:last-child th, &:last-child th': { border: 0 } }}>
                                <TableCell component='th' scope="row"  >{row.GameName}</TableCell>
                                <TableCell component='th' scope="row"  >{row.yourReview}</TableCell>
                                <TableCell component='th' scope="row"  >{row.pictures}</TableCell>
                                <TableCell component='th' scope="row"  >{row.Name}</TableCell>
                                <TableCell component='th' scope="row"  >{row.Email}</TableCell>
                                <TableCell>
                                    <button
                                        sx={{ margin: '0px 10px' }}
                                        onClick={() => { }}>
                                        Update

                                    </button>
                                    <button
                                        sx={{ margin: '0px 10px' }}
                                        onClick={() => { }}>
                                        Delete

                                    </button>
                                </TableCell>
                            </TableRow>

                        )) : (
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component='th' scope="row"  >No data</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>

        </TableContainer>
    );

}

export default feedbackTable;