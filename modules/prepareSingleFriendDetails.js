module.exports = (friendDetail, htmlFriendDetail) => {
  let output = htmlFriendDetail.replace(/{%FRIENDIMAGE%}/g, friendDetail.image);
  output = output.replace(/{%FRIENDNAME%}/g, friendDetail.friendName);
  output = output.replace(/{%FRIENDDESCRIPTION%}/g, friendDetail.description);
  output = output.replace(/{%FRIENDMERITS%}/g, friendDetail.merits);
  output = output.replace(/{%FRIENDDEMERITS%}/g, friendDetail.demerits);

  return output;
};
