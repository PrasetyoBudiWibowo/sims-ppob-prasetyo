export const formatRupiah = (
  amount: number
) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatInputRupiah = (
  value: string
) => {
  const numberString = value.replace(
    /[^,\d]/g,
    ""
  );

  const split = numberString.split(",");

  const sisa = split[0].length % 3;

  let rupiah = split[0].substr(0, sisa);

  const ribuan = split[0]
    .substr(sisa)
    .match(/\d{3}/gi);

  if (ribuan) {
    const separator =
      sisa ? "." : "";

    rupiah +=
      separator + ribuan.join(".");
  }

  return rupiah;
};

export const parseRupiah = (
  value: string
) => {
  return value.replace(/\./g, "");
};