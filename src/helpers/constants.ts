export const searchMethods = {
  IN_NAME: "in:name",
  IN_DESCRIPTION: "in:description",
  IN_README: "in:readme",
  IN_OWNER_NAME: "in:owner/name",
} as const;
type searchMethodType = typeof searchMethods;
export type SearchMethodValueTypes = searchMethodType[keyof searchMethodType];
