const toEnglishCharCode = (string: string) => {
  return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (c: string) =>
    (c.charCodeAt(0) & 0xf).toString()
  );
};

export const digit = (number: string | number, separate: boolean = false) => {
  const numberTranslator = new Intl.NumberFormat("en-US", {
    useGrouping: separate,
  });

  if (typeof number === "string") {
    const englishNumbers = toEnglishCharCode(number);

    if (separate) {
      return numberTranslator.format(parseInt(englishNumbers || "0"));
    }

    const stringArr = englishNumbers.replace(/\D/g, "").split("");

    const newArr = stringArr.map((number) =>
      numberTranslator.format(parseInt(number))
    );

    return newArr.join("");
  }

  return numberTranslator.format(number);
};

export const parseSci = (n: string | number) => {
  n = String(n);
  let [fraction, power] = n.split("e");

  if (!power) return fraction;

  let num_power = Number(power);

  let [integer, float] = fraction.split(".");
  let left = integer + (float ? float : "");
  if (num_power < 0) {
    return "0." + "0".repeat(Math.abs(num_power) - 1) + left;
  } else {
    return left + "0".repeat(num_power - 1);
  }
};

export const floorString = (s: string | number, d: number) => {
  s = String(s);
  if (s.endsWith(".")) return `${s}`;
  let [integer, floating] = s.split(".");
  if (floating && d > 0) {
    floating = floating.substring(0, Math.min(floating.length, d));
    return `${integer}.${floating}`;
  }
  return integer;
};

const _toNumberWithCommas = (n: string | number, f = 8) => {
  if (Number(n) < 100) f = Math.min(f + 6, 8);
  if (String(n).includes("e")) n = parseSci(n);
  n = floorString(n, f);
  let parts = String(n).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const toNumberWithCommas = (n: number, f = 8) => {
  return _toNumberWithCommas(n, f);
};

export const removeZeroTrailings = (n: number, f = 8) => {
  return _toNumberWithCommas(fromNumberWithCommas(_toNumberWithCommas(n, f)));
};

export const fromNumberWithCommas = (n: string) => {
  return Number(String(n).split(",").join(""));
};
