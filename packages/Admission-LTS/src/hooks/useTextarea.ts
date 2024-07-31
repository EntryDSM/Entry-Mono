import { useCallback, useState } from 'react';

export const useTextArea = <T>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);
  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, maxLength } = e.currentTarget;
    if (value.length >= maxLength) {
      return setForm((prev) => ({ ...prev, [name]: value.slice(0, maxLength) }));
    }
    return setForm((prev) => ({ ...prev, [name]: value }));
  }, []);
  return { form, onChange, setForm };
};
