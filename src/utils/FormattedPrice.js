export const formatRupiah = (number) => {
	if (typeof number !== "number") {
	  throw new Error("Input must be a number");
	}
	return new Intl.NumberFormat("id-ID", {
	  style: "currency",
	  currency: "IDR",
	  minimumFractionDigits: 0,
	}).format(number);
  };

  