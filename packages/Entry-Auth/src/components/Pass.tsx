import { getQueryValues } from '@/utils/getQueryValues';
import { useEffect } from 'react';

export const Pass = () => {
  const moduleToken = getQueryValues().get('mdl_tkn');
  function request() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    document.form1.submit();
  }

  useEffect(() => {
    if (moduleToken) request();
    else {
      window.close();
    }
  }, [moduleToken]);

  const blockReload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', blockReload);
    return () => window.removeEventListener('beforeunload', blockReload);
  }, []);

  if (!moduleToken) return null;
  return (
    <form
      name="form1"
      action="https://safe.ok-name.co.kr/CommonSvl"
      method="post"
    >
      <input
        type="hidden"
        name="tc"
        value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"
      />
      <input type="hidden" name="cp_cd" value="V61290000000" />
      <input type="hidden" name="mdl_tkn" value={moduleToken} />
      <input type="hidden" name="target_id" value="" />
    </form>
  );
};
