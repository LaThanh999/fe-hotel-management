import { ROOM_STATUS } from "./index";

const MAPPING = {
  ROOM_STATUS_MAPPING: {
    [ROOM_STATUS.RoomEmpty]: "Empty Room",
    [ROOM_STATUS.RoomDirty]: "Dirty Room",
    [ROOM_STATUS.RoomUnderRepair]: "Under Repair Room",
    [ROOM_STATUS.RoomUse]: "Use Room",
    [ROOM_STATUS.RoomBooked]: "Booked Room",
  },
};

export default MAPPING;
