export const urlToFile = async (url: string, filename?: string) => {
  const response = await fetch(url);
  const blob = await response.blob();

  let fileType = response.headers.get('Content-Type') || '';

  return new File([blob], filename || 'file', { type: fileType });
};
