import { useCallback, useState } from 'react';
import { InputType } from '@/interface/type';

export const useInput = <T>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);
  const onChange = useCallback((e: InputType) => {
    const { name, value } = e.currentTarget;
    if (typeof initialForm === 'object') {
      setForm((form) => ({ ...form, [name]: value }));
    } else {
      setForm(value as T);
    }
  }, []);
  return { form, onChange, setForm };
};
