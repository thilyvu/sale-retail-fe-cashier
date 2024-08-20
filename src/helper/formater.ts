
export function formatCurrency(
    n: any,
    isUnit?: boolean,
    currency?: string,
  ): string |undefined {
    if (n === 0) {
      return `0${isUnit ? "đ" : ""}`;
    }
    if (!n) {
      return "";
    }
    // const c = Math.round(n)
    //   .toString()
    //   .replace(/\D/g, "")
    //   .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // const c = n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    // const c = Number(n?.toString()?.replace(/,/g, ""))
    //   .toFixed(2)
    //   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const c = String(
      Math.round(n?.toString()?.replace(/,/g, "") * 100) / 100,
    ).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  
    const f = c.split(".");
    const next = Number(f[f.length - 1]) > 0 ? c : f.shift();
  
    return currency ? `${next}${currency}` : isUnit ? `${next}đ` : next;
  }
  export function roundPositiveNumber(n: number): number {
    return Math.round(n * 1e2) / 1e2;
  }
  