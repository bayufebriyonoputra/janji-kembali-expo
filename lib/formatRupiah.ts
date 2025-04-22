export const formatRupiah = (value: number | string): string => {
    const num = typeof value === 'string' ? parseInt(value) : value;

    const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        currencyDisplay: 'symbol'
    }).format(num);

    return formatted.replace('Rp', 'Rp.');

}