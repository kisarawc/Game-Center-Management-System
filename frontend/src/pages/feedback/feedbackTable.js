import { getMenuItemUtilityClass } from "@mui/material";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
const feedbackTable = props => {
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


            </TableBody>
        </Table>
    </TableContainer>

}

export default feedbackTable;