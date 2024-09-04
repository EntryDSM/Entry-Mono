import { useCallback, useState } from 'react';

export const useDropDown = <T extends string[][]>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);
  const onChange = useCallback(
    (index: number[], value: string) => {
      const copy = [...form];
      copy[index[0]][index[1]] = value;
      setForm(copy as T);
    },
    [form],
  );

  return { form, onChange, setForm };
};
