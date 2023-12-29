export const addPeerAction = (peerId, stream) => ({
  type: "ADD_PEER",
  payload: { peerId, stream },
});

export const removePeerAction = (peerId) => ({
  type: "REMOVE_PEER",
  payload: { peerId },
});
