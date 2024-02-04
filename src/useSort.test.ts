import { describe, expect, it } from "vitest";
import { sortData } from "./useSort";

describe("sortData", () => {
  it("should sort data", () => {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
      { name: "Doe", age: 40 },
    ];
    expect(
      sortData(data, {
        fields: [
          {
            field: "age",
            direction: "desc",
          },
        ],
      })
    ).toEqual([
      { name: "Doe", age: 40 },
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ]);
  });
});
