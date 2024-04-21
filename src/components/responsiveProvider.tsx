import { ResponsiveContext } from '@/utils/context';

type Props = {
  value: boolean;
  children: React.ReactNode;
};

export const ResponsiveProvider = ({ value, children }: Props) => {
  return <ResponsiveContext.Provider value={value}>{children}</ResponsiveContext.Provider>;
};
