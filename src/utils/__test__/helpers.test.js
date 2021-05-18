import { calculateMedian, getPercentageDiff } from "../helpers";

describe("Helpers functions", () => {
  it("should calculate median", function () {
    const data = [1, 2, 3, 4, 6, 5, 4, 2, 5, 7];

    const median = calculateMedian(data);

    expect(median).toEqual(4);
  });

  it("should return number when calculate percentage difference ", function () {
    const diff = getPercentageDiff(100, 50);

    expect(diff).not.toBeNaN();
  });
});
