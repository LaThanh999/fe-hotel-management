const CONSTANTS = {
  TOKEN: {
    ACCESS_TOKEN: "AccessToken",
    REFRESH_TOKEN: "RefreshToken",
  },
  ROOM_TYPE: {
    Superior: 1,
    Deluxe: 2,
    Family: 3,
    Vip: 4,
  },
  ROOM_STATUS: {
    RoomEmpty: 1,
    RoomDirty: 2,
    RoomUnderRepair: 3,
    RoomUse: 4,
    RoomBooked: 5,
  },
  AMOUNT_PEOPLE_OF_ROOM: {
    Superior: 2,
    Deluxe: 2,
    Family: 4,
    Vip: 2,
  },
  ROLE: {
    User: 1,
    Admin: 1000,
  },
};

export default CONSTANTS;
