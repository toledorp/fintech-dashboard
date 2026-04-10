import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate } from "../format";

describe("format utils", () => {
  it("should format currency correctly", () => {
    const value = 1000;
    const result = formatCurrency(value);

    expect(result).toContain("R$");
  });

  it("should format date correctly", () => {
    const date = "2024-01-01";
    const result = formatDate(date);

    expect(result).toBeTruthy();
  });
});