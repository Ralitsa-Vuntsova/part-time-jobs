import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ContactDto } from '@shared/data-objects';
import { useState } from 'react';
import { makeStyles } from '../../../libs/make-styles';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('name')}</TableCell>
            <TableCell>{t('email')}</TableCell>
            <TableCell>{t('phone-number')}</TableCell>
            <TableCell>{t('address')}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {contacts.map((c, index) => (
            <TableRow key={`${c.name}-${c.email}-${index}`}>
              <TableCell>{c.name}</TableCell>
              <TableCell>
                {showEmail ? (
                  <Typography>{c.email}</Typography>
                ) : (
                  <Button sx={styles.button} onClick={() => setShowEmail(true)}>
                    {t('reveal-email')}
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {showPhoneNumber ? (
                  <Typography>{c.phoneNumber}</Typography>
                ) : (
                  <Button
                    sx={styles.button}
                    onClick={() => setShowPhoneNumber(true)}
                  >
                    {t('reveal-phone-number')}
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
