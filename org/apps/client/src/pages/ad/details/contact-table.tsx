import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ContactDto } from '@shared/data-objects';
import { useState } from 'react';
import { makeStyles } from '../../../libs/make-styles';

const styles = makeStyles({
  button: {
    color: (theme) => theme.palette.primary.main,
  },
});

interface Props {
  contacts: ContactDto[];
}

export function ContactTable({ contacts }: Props) {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

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
              <TableCell>
                {showEmail ? (
                  c.email
                ) : (
                  <Button sx={styles.button} onClick={() => setShowEmail(true)}>
                    Reveal Email
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {showPhoneNumber ? (
                  c.phoneNumber
                ) : (
                  <Button
                    sx={styles.button}
                    onClick={() => setShowPhoneNumber(true)}
                  >
                    Reveal Phone Number
                  </Button>
                )}
              </TableCell>
              <TableCell>{c.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
