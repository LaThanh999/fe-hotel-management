import axios from "../../http/axios";

export default {
  bookRoom(_, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/orders", payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  bookRoomByNewCustomer({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const {
        name,
        phoneNumber,
        identityCard,
        checkInDate,
        checkOutDate,
        roomId,
        notes,
        amountPeople,
      } = payload;
      axios
        .post("/api/v1/customers", {
          name,
          phoneNumber,
          identityCard,
          type: 1,
          notes: "",
        })
        .then((response) => {
          const { id } = response.data.customer;
          dispatch("bookRoom", {
            customerId: id,
            checkInDate,
            checkOutDate,
            roomId,
            amountPeople,
            notes,
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error.response);
            });
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};
