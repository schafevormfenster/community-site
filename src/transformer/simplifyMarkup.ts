export const simplifyMarkup = (inputMarkup: string): string => {
  let simlifiedMarkup: string = inputMarkup;
  simlifiedMarkup = simlifiedMarkup?.replace(/(<html-blob>)+/g, '');
  simlifiedMarkup = simlifiedMarkup?.replace(/(<\/html-blob>)+/g, '');
  simlifiedMarkup = simlifiedMarkup?.replace('/</html-blob>/', '');
  simlifiedMarkup = simlifiedMarkup?.replace('<br> ', '<br>');
  simlifiedMarkup = simlifiedMarkup?.replace(' <br>', '<br>');
  simlifiedMarkup = simlifiedMarkup?.replace('\n', '<br>');
  simlifiedMarkup = simlifiedMarkup?.replace(/^(<br>)*(.*?)( |<br>)*$/, '$2');
  simlifiedMarkup = simlifiedMarkup?.replace(/(<br>)+/g, '<br>');
  simlifiedMarkup = simlifiedMarkup
    ?.split('<br>')
    .map(p => {
      return `<p>${p}</p>`;
    })
    .join('');

  return simlifiedMarkup;
};
