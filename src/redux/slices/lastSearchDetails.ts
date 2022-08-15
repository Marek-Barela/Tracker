import { createSlice } from "@reduxjs/toolkit";

interface Language {
  code?: string | null;
  name?: string | null;
  native?: string | null;
}

interface Location {
  geoname_id?: number | null;
  capital?: string | null;
  languages?: Language[] | null;
  country_flag?: string | null;
  country_flag_emoji?: string | null;
  country_flag_emoji_unicode?: string | null;
  calling_code?: string | null;
  is_eu?: boolean | null;
}

export interface LastSearchDetailsTypes {
  ip?: string | null;
  type?: string | null;
  continent_code?: string | null;
  continent_name?: string | null;
  country_code?: string | null;
  country_name?: string | null;
  region_code?: string | null;
  region_name?: string | null;
  city?: string | null;
  zip?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  location?: Location | null;
  zoom?: number | null;
}

const initialState: LastSearchDetailsTypes = {};

const lastSearchDetailsSlice = createSlice({
  name: "lastSearchDetails",
  initialState: initialState,
  reducers: {
    setLastSearchDetails(_, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setLastSearchDetails } = lastSearchDetailsSlice.actions;
export default lastSearchDetailsSlice.reducer;
