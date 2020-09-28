/* eslint-disable default-case */
function getFormaJuridica(taxId) {
  let abr = ''
  switch (taxId.slice(0,1)) {
    case 'A':
      abr = 'SA'
      break;
    case 'B':
      abr = 'SL';
      break;
    case 'C':
      abr = 'SC';
      break;
    case 'D':
      abr = 'S.COM'
      break;
    case 'E':
      abr = 'C.B.'
      break;
    case 'F':
      abr = 'S.COOP.'
      break;
  }
  return abr
}

export default getFormaJuridica