import { DarkModeContext } from '@/utils/context';

type Props = {
  value: boolean;
  children: React.ReactNode;
};

export const DarkModeProvider = ({ value, children }: Props) => {
  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
};
