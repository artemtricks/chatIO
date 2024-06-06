import { trimText } from "./utils.js";

let users = [];

export const findUser = (user) => {
  const userName = trimText(user.username);
  const room = trimText(user.room);

  return users.find(
    (item) =>
      trimText(item.username) === userName && trimText(item.room) === room
  );
};

export const getRoomUsers = (room) =>
  users.filter((item) => item.room === room);

export const removeUser = (user) => {
  const found = findUser(user);
  if (found) {
    users = users.filter(
      (item) => item.room === found.room && item.username !== found.username
    );
  }
  return found;
};

export const addUser = (user) => {
  const userName = trimText(user.username);
  const room = trimText(user.room);

  const isExist = users.find(
    (item) =>
      trimText(item.username) === userName && trimText(item.room) === room
  );

  !isExist && users.push(user);
  const currentUser = isExist || user;

  return { isExist: !!isExist, user: currentUser };
};
