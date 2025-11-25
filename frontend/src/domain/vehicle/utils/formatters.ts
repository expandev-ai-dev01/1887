export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const formatKilometers = (km: number): string => {
  return new Intl.NumberFormat('pt-BR').format(km) + ' km';
};

export const formatYear = (year: number): string => {
  return `Ano: ${year}`;
};
