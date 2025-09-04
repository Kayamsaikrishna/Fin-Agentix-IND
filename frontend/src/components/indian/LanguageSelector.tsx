import React from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  const getCurrentLanguageName = () => {
    const currentLang = SUPPORTED_LANGUAGES.find(
      (lang) => lang.code === i18n.language
    );
    return currentLang?.name || 'English';
  };

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<Globe size={20} />}
        color="inherit"
        size="small"
      >
        {getCurrentLanguageName()}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            selected={i18n.language === language.code}
          >
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
}
