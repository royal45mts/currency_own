export const currency_rupiah = (angka: any, prefix: string) => {
  try {
    const text_string = angka.toString().replace(/[^-,\d]/g, "");
    const split =
      text_string.split("").includes("-") === false
        ? text_string.split(",")
        : text_string.split("-");
    split[0] === "" ? (split[0] = "-") : split;

    // set minus and comma currency
    if (split[0] === "-") {
      const comma = split[1].split(",");
      const sisa = comma[0].length % 3;
      let rupiah = comma[0].substring(0, sisa);
      const ribuan = comma[0].substring(sisa).match(/\d{3}/g);
      if (ribuan !== null) {
        const dot = sisa ? "." : "";
        rupiah += dot + ribuan.join(".");
      }

      rupiah = comma[1] === undefined ? rupiah : rupiah + "," + comma[1];
      return prefix === undefined
        ? split[0] + rupiah
        : prefix + split[0] + rupiah;
    } else {
      const sisa = split[0].length % 3;
      let rupiah = split[0].substring(0, sisa);
      const ribuan = split[0].substring(sisa).match(/\d{3}/g);
      if (ribuan !== null) {
        const dot = sisa ? "." : "";
        rupiah += dot + ribuan.join(".");
      }
      rupiah = split[1] === undefined ? rupiah : rupiah + "," + split[1];
      return prefix === undefined ? rupiah : prefix + rupiah;
    }
  } catch (error) {
    console.log("regex_convert_mata_uang.ts", error);
  }
};
