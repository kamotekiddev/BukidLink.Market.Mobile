export function formatCurrency(
    amount: number,
    currency: string = "PHP",
    locale: string = "en-US",
    minimumFractionDigits?: number
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits,
    }).format(amount);
}
