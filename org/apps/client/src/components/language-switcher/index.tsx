import { MenuItem, Select, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '../../libs/make-styles';
import { t } from 'i18next';
import { Language, languageToTranslateKey } from '@shared/enums';
import { useUserPreferences } from '../../hooks/use-user-preferences';

const styles = makeStyles({
  root: {
    color: (theme) => theme.palette.primary.contrastText,
    boxShadow: 'none',
    '.MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
    svg: {
      color: (theme) => theme.palette.primary.contrastText,
    },
  },
});

interface Props {
  sx?: SxProps<Theme>;
}

export function LanguageSwitcher({ sx }: Props) {
  const { i18n } = useTranslation();

  const { language, setPreferences } = useUserPreferences();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const rootStyles = { ...styles.root, ...sx };

  return (
    <Select
      label="Language"
      defaultValue={language}
      value={language}
      sx={rootStyles}
      onChange={(e) => {
        const languageOption = String(e.target.value);

        // Create a mapping if other languages are to be added in future
        if (languageOption === Language.English) {
          changeLanguage('en');
          setPreferences({ language: Language.English });
        } else {
          changeLanguage('bg');
          setPreferences({ language: Language.Bulgarian });
        }
      }}
    >
      {Object.values(Language).map((value) => (
        <MenuItem key={value} value={value}>
          {t(languageToTranslateKey[value])}
        </MenuItem>
      ))}
    </Select>
  );
}
