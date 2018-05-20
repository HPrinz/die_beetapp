
import { OtherActionResponse } from '../actions/action.type';
import { LOCATION_SET } from '../constants';
import { Dictionary } from '../types';
import { LocationActionResponse, SetLocationActionResponse } from '../actions/setLocation';

export type Location = {
    query?: Dictionary<string>;
    pathname?: string;
    search?: string;
};

export type LocationState = {
    location: Location;
};

const defaultState: LocationState = {
    location: {},
};

export default (
    state: LocationState = defaultState,
    action: LocationActionResponse = OtherActionResponse,
) => {
    switch (action.type) {
        case LOCATION_SET:
            return (action as SetLocationActionResponse);
        default:
            return state;
    }
};
