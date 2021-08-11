import Vue from "vue";

Vue.filter("convert_rp", (angka, prefix) => {
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
});

const request = require("request");

exports.currency_rupiah = (angka, prefix) => {
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
/*
Vue.prototype.$convert_rp_proto = (angka, prefix) => {
  try {
    const text_string = angka.toString().replace(/[^-,\d]/g, '')
    const split =
      text_string.split('').includes('-') === false
        ? text_string.split(',')
        : text_string.split('-')
    split[0] === '' ? (split[0] = '-') : split

    // set minus and comma currency
    if (split[0] === '-') {
      const comma = split[1].split(',')
      const sisa = comma[0].length % 3
      let rupiah = comma[0].substring(0, sisa)
      const ribuan = comma[0].substring(sisa).match(/\d{3}/g)
      if (ribuan !== null) {
        const dot = sisa ? '.' : ''
        rupiah += dot + ribuan.join('.')
      }

      rupiah = comma[1] === undefined ? rupiah : rupiah + ',' + comma[1]
      return prefix === undefined
        ? split[0] + rupiah
        : prefix + split[0] + rupiah
    } else {
      const sisa = split[0].length % 3
      let rupiah = split[0].substring(0, sisa)
      const ribuan = split[0].substring(sisa).match(/\d{3}/g)
      if (ribuan !== null) {
        const dot = sisa ? '.' : ''
        rupiah += dot + ribuan.join('.')
      }
      rupiah = split[1] === undefined ? rupiah : rupiah + ',' + split[1]
      return prefix === undefined ? rupiah : prefix + rupiah
    }
  } catch (error) {
    console.log('regex_convert_mata_uang.ts', error)
  }
}
*/

Vue.prototype.$convert_rp_proto = (angka, prefix) => {
  try {
    const text_string = angka.toString().replace(/[^,\d]/g, "");
    const split = text_string.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substring(0, sisa);
    const ribuan = split[0].substring(sisa).match(/\d{3}/g);
    if (ribuan !== null) {
      const dot = sisa ? "." : "";
      rupiah += dot + ribuan.join(".");
    }
    rupiah = split[1] === undefined ? rupiah : rupiah + "," + split[1];
    return prefix === undefined ? rupiah : prefix + rupiah;
  } catch (error) {
    console.log("regex_convert_mata_uang.ts", error);
  }
};
Vue.prototype.$parse_currency_global = (angka, form_data, status) => {
  try {
    const form = {
      nilai_rab: form_data.nilai_rab,
      nilai_kontrak: form_data.nilai_kontrak,
      rencana_invoice: form_data.rencana_invoice,
      percent_check: "",
    };
    let nilai_rab = null;
    let nilai_kontrak = null;
    let precent = 0;

    nilai_rab =
      typeof form.nilai_rab === "string"
        ? form.nilai_rab.replace(/[^-,\d]/g, "")
        : form.nilai_rab;
    nilai_kontrak =
      typeof form.nilai_kontrak === "string"
        ? form.nilai_kontrak.replace(/[^-,\d]/g, "")
        : form.nilai_kontrak;
    if (nilai_rab !== undefined && nilai_kontrak !== undefined) {
      precent =
        (parseFloat(nilai_rab) /
          parseFloat(nilai_kontrak.replace(/[^-,\d]/g, ""))) *
        100;
    }
    switch (status) {
      case "nilai_kontrak":
        {
          form.nilai_kontrak = Vue.prototype.$convert_rp_proto(angka, "Rp ");
          form.percent_check = precent.toFixed(2) + " %";
        }
        break;
      case "nilai_rab":
        {
          form.nilai_rab = Vue.prototype.$convert_rp_proto(angka, "Rp ");
          form.percent_check = precent.toFixed(2) + " %";
        }
        break;
      case "rencana_invoice":
        {
          form.rencana_invoice = Vue.prototype.$convert_rp_proto(angka, "Rp ");
          form.percent_check = precent.toFixed(2) + " %";
        }
        break;
      case "set_percent_get_rab":
        {
          form.percent_check = precent.toFixed(2) + " %";
        }
        break;
    }

    return form;
  } catch (error) {
    console.log("parse currency", error);
  }
};
Vue.prototype.$parse_number = (status, data) => {
  let jumlah = "";
  switch (status) {
    case "dot": {
      jumlah =
        typeof data === "string"
          ? data !== ""
            ? parseFloat(
                data
                  .toString()
                  .replace(/[^-,\d]/g, "")
                  .split(",")
                  .join(".")
              )
            : 0.0
          : parseFloat(data);
      return jumlah;
    }

    case "koma": {
      jumlah =
        typeof data === "number"
          ? data !== ""
            ? data.toFixed(2).toString().split(".").join(",")
            : "0,0"
          : parseFloat(data).toFixed(2).toString().split(".").join(",");
      return jumlah;
    }
  }
};
Vue.filter("parse_number", (data, status) => {
  let jumlah = "";
  switch (status) {
    case "dot": {
      jumlah =
        typeof data === "string"
          ? data !== ""
            ? parseFloat(
                data
                  .toString()
                  .replace(/[^-,\d]/g, "")
                  .split(",")
                  .join(".")
              )
            : 0.0
          : parseFloat(data);
      return jumlah;
    }

    case "koma": {
      jumlah =
        typeof data === "number"
          ? data !== ""
            ? data.toFixed(2).toString().split(".").join(",")
            : "0,0"
          : parseFloat(data).toFixed(2).toString().split(".").join(",");
      return jumlah;
    }
  }
});
Vue.prototype.$terbilang = (number) => {
  let terbilang = "";
  number = number.toString().replace(/[^\d]/g, "");
  number = parseInt(number);
  const penyebut = (number2) => {
    console.log(number2);
    number2 = Math.trunc(number2);
    number2 = Math.abs(number2);
    const angka = [
      "",
      "satu",
      "dua",
      "tiga",
      "empat",
      "lima",
      "enam",
      "tujuh",
      "delapan",
      "sembilan",
      "sepuluh",
      "sebelas",
    ];

    if (number2 < 12) {
      // satu > sebelas
      terbilang = " " + angka[number2];
    } else if (number2 < 20) {
      // dua belas > sembila belas
      terbilang = penyebut(number2 - 10) + " belas";
    } else if (number2 < 100) {
      // dua puluh > sembilan puluh
      terbilang = penyebut(number2 / 10) + " puluh" + penyebut(number2 % 10);
    } else if (number2 < 200) {
      terbilang = " seratus" + penyebut(number2 - 100);
    } else if (number2 < 1000) {
      terbilang = penyebut(number2 / 100) + " ratus" + penyebut(number2 % 100);
    } else if (number2 < 2000) {
      terbilang = " seribu" + penyebut(number2 - 1000);
    } else if (number2 < 1000000) {
      terbilang = penyebut(number2 / 1000) + " ribu" + penyebut(number2 % 1000);
    } else if (number2 < 1000000000) {
      terbilang =
        penyebut(number2 / 1000000) + " juta" + penyebut(number2 % 1000000);
    } else if (number2 < 1000000000000) {
      terbilang =
        penyebut(number2 / 1000000000) +
        " miliar" +
        penyebut(number2 % 1000000000);
    } else if (number2 < 1000000000000000) {
      terbilang =
        penyebut(number2 / 1000000000000) +
        " triliun" +
        penyebut(number2 % 1000000000000);
    }
    return terbilang;
  };
  console.log(penyebut(number), "terbilang test");
  return penyebut(number);
};
// filter comma
//
//
Vue.filter("filter_comma", (d, status) => {
  try {
    let setdata = "";
    let data = d.toString();
    if (data !== undefined) {
      if (data.split("").length > 0) {
        // minus
        if (data.split("").includes("-") === true) {
          let minus = data.split("-");
          minus[0] = "-";
          if (minus[1].split("").includes(",") === true) {
            setdata = minus[0] + minus[1].split(",").splice(0, 1).join("");
          } else if (minus[1].split("").includes(".") === true) {
            setdata = minus[0] + minus[1].split(".").splice(0, 1).join("");
          } else {
            setdata = minus[0] + minus[1];
          }
        } else {
          if (data.split("").includes(",") === true) {
            setdata = data.split(",").splice(0, 1).join("");
          } else if (data.split("").includes(".") === true) {
            setdata = data.split(".").splice(0, 1).join("");
          } else {
            setdata = data;
          }
        }
      }

      return setdata;
    }
  } catch (err) {
    console.log("filter comma", err);
  }
});
Vue.prototype.$filter_comma = (d) => {
  try {
    let setdata = "";
    let data = d.toString();
    if (data !== undefined) {
      if (data.split("").length > 0) {
        // minus
        if (data.split("").includes("-") === true) {
          let minus = data.split("-");
          minus[0] = "-";
          if (minus[1].split("").includes(",") === true) {
            setdata = minus[0] + minus[1].split(",").splice(0, 1).join("");
          } else if (minus[1].split("").includes(".") === true) {
            setdata = minus[0] + minus[1].split(".").splice(0, 1).join("");
          } else {
            setdata = minus[0] + minus[1];
          }
        } else {
          if (data.split("").includes(",") === true) {
            setdata = data.split(",").splice(0, 1).join("");
          } else if (data.split("").includes(".") === true) {
            setdata = data.split(".").splice(0, 1).join("");
          } else {
            setdata = data;
          }
        }
      }

      return setdata;
    }
  } catch (err) {
    console.log("filter comma", err);
  }
};
//
//
//
