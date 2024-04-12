import { ChangeEvent, useContext } from 'react';
import { Stack, Switch } from '@mui/material';
import { styleComponents } from '@/utils/styleComponents';
import { DarkModeContext } from '@/utils/context';

type Props = {
  handleDarkMode: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const DarkModeButton = ({ handleDarkMode }: Props) => {
  const isDarkMode = useContext(DarkModeContext);
  const { TitleStyle } = styleComponents(isDarkMode);

  return (
    <Stack spacing={1}>
      <TitleStyle>ダークモード</TitleStyle>
      <Switch checked={isDarkMode} onChange={handleDarkMode} inputProps={{ 'aria-label': 'dark-mode' }} />
    </Stack>
  );
};
