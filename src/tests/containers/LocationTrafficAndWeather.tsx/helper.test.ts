import {
  updateSearchHistory,
  getRecentSearchesByOthers,
} from "../../../containers/LocationTrafficAndWeather/helper";
import {
  LOCAL_STORAGE_KEYS,
  localStorageHelper,
} from "../../../common/helpers/localStorage";
import { mockTrafficImageLocations } from "../../../tests/mock/traffic";

describe("LocationTrafficAndWeather helper", () => {
  const [location1, location2, location3, location4, location5, location6] =
    mockTrafficImageLocations;

  describe("updateSearchHistory", () => {
    const recentSearches = mockTrafficImageLocations;
    vi.spyOn(localStorageHelper, "setItem");

    it("should save search history to localstorage", () => {
      updateSearchHistory(location1, recentSearches);
      expect(localStorageHelper.setItem).toBeCalled();
    });

    it("should add the newly searched location to the top", () => {
      updateSearchHistory(location6, recentSearches);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...rest } = location6;
      const newHistoryOrder = [
        rest,
        location1,
        location2,
        location3,
        location4,
      ];
      expect(localStorageHelper.setItem).toBeCalledWith(
        LOCAL_STORAGE_KEYS.RECENT_SEARCHES,
        newHistoryOrder
      );
    });

    it("should save unique locations", () => {
      const smallSearches = [location3, location4];
      updateSearchHistory(location5, smallSearches);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...rest } = location5;
      const newHistoryOrder = [rest, location3, location4];
      expect(localStorageHelper.setItem).toBeCalledWith(
        LOCAL_STORAGE_KEYS.RECENT_SEARCHES,
        newHistoryOrder
      );
    });
  });

  describe("getRecentSearchesByOthers", () => {
    const recentSearches = [location1, location2, location3];
    const recentQueryData = [
      location1,
      location2,
      location3,
      location4,
      location5,
    ];

    it("should return empty array if recentSearches is empty", () => {
      const actual = getRecentSearchesByOthers(undefined, recentQueryData);
      expect(actual).toEqual([]);
    });

    it("should return empty array if recentSearches is empty", () => {
      const actual = getRecentSearchesByOthers(recentSearches);
      expect(actual).toEqual([]);
    });

    it("should return return list that does not include my searches", () => {
      const actual = getRecentSearchesByOthers(recentSearches, recentQueryData);
      const expected = [location4, location5];
      expect(actual).toEqual(expected);
    });
  });
});
