import { LOCATION_SET } from "../constants";
import { OtherActionResponse } from "./action.type";
import { Dictionary } from "../types";
import { Location } from "../reducers/location";

export type SetLocationActionResponse = {
    type: LOCATION_SET;
    location: Location;
};

export type LocationActionResponse = SetLocationActionResponse | OtherActionResponse;

export type SetLocationAction = (location: Location) => SetLocationActionResponse;

export const setLocation: SetLocationAction = (location: Location) => ({
    type: LOCATION_SET,
    location: location,
});

export default setLocation;
