import constants from "./index";

const { ROOM_STATUS, ROOM_TYPE } = constants;

const MAPPING = {
  ROOM_STATUS_MAPPING: {
    [ROOM_STATUS.RoomEmpty]: "Empty Room",
    [ROOM_STATUS.RoomDirty]: "Dirty Room",
    [ROOM_STATUS.RoomUnderRepair]: "Under Repair Room",
    [ROOM_STATUS.RoomUse]: "Use Room",
    [ROOM_STATUS.RoomBooked]: "Booked Room",
  },
  ROOM_TYPE_MAPPING: {
    [ROOM_TYPE.Superior]: "Superior",
    [ROOM_TYPE.Deluxe]: "Deluxe",
    [ROOM_TYPE.Family]: "Family",
    [ROOM_TYPE.Vip]: "Vip",
  },
  ROLE_MAPPING: {
    1: "User",
    1000: "Admin",
  },
};

export default MAPPING;
