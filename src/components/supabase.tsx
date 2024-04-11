import { Button, Stack } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

type Sapmle = {
  id: number;
  name: string;
};

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const db = 'sample';

export default function SupabaseComponent({ history }: { history: HistoryType[] }) {
  const [foo, setFoo] = useState<Sapmle[]>([]);
  // undefindが許容されているので、末尾に!を付けて許容しないようにする

  // const output = () => {
  //   const array = foo[3].name as unknown as string[];
  //   console.log(array);
  // };

  const getSapmle = async () => {
    const { data: sample } = await supabase.from(db).select();
    setFoo(sample as Sapmle[]);
  };

  const insertSapmle = async () => {
    const { error } = await supabase.from(db).insert({ id: 5, name: 'Denmark' });
  };

  const updateSapmle = async () => {
    const { error } = await supabase.from(db).update({ name: '西村さん' }).eq('id', 6);
  };

  const upsertSapmle = async () => {
    const { error } = await supabase.from(db).upsert({ id: 2, name: 'アップさーと' }).select();
  };

  const deleteSapmle = async () => {
    const { error } = await supabase.from(db).delete().eq('id', 3);
  };
  useEffect(() => {
    getSapmle();
  }, []);

  return (
    <>
      <Stack>
        <Button onClick={insertSapmle}>インサート</Button>
        <Button onClick={updateSapmle}>アップデート</Button>
        <Button onClick={upsertSapmle}>アップサート</Button>
        <Button onClick={deleteSapmle}>デリート</Button>
        {/* <Button onClick={output}>アウトプット</Button> */}
      </Stack>
      <ul>
        {foo.map((country) => (
          <li key={country.name}>
            {country.id}:{country.name}
          </li>
        ))}
      </ul>
    </>
  );
}
