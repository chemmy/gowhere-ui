import {
  LOCAL_STORAGE_KEYS,
  localStorageHelper,
} from "@common/helpers/localStorage";

export const HISTORY_LIST_MAX = 5;

export const updateSearchHistory = (
  location: TrafficImageType,
  recentSearches: Array<TrafficImageType>
) => {
  const searches =
    recentSearches?.filter((item) => item.id != location.id) || [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { image, ...rest } = location;
  const updatedHistory = [rest, ...searches].slice(0, HISTORY_LIST_MAX);

  localStorageHelper.setItem(
    LOCAL_STORAGE_KEYS.RECENT_SEARCHES,
    updatedHistory
  );
};

export const getRecentSearchesByOthers = (
  recentSearches?: Array<RecentSearchesType>,
  recentQueryData?: Array<RecentSearchesType>
): Array<RecentSearchesType> => {
  if (!recentQueryData?.length) return [];

  const mostRecentSearches = recentSearches?.slice(0, HISTORY_LIST_MAX) || [];

  const notMySearches = recentQueryData.filter((othersSearch) => {
    return !mostRecentSearches.find(
      (mySearches) => othersSearch.name === mySearches.name
    );
  });

  return notMySearches.slice(0, HISTORY_LIST_MAX);
};
