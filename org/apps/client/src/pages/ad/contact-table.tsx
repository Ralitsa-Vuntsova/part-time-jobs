import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ContactDto } from '@shared/data-objects';

interface Props {
  contacts: ContactDto[];
}

export function ContactTable({ contacts }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {contacts.map((c, index) => (
            <TableRow key={`${c.name}-${c.email}-${index}`}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.phoneNumber}</TableCell>
              <TableCell>{c.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
