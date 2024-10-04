module.exports = (val, friendListCard) => {
  let output = friendListCard.replace(/{%ID%}/g, val.id);
  output = output.replace(/{%FRIENDIMAGE%}/g, val.image);
  output = output.replace("{%FRIENDIMAGE%}", val.image);
  output = output.replace("{%FRIENDNAME%}", val.friendName);
  output = output.replace("{%FRIENDAGE%}", val.age);
  output = output.replace("{%FRIENDNATIONALITY%}", val.nationality);
  if (val.younger) {
    output = output.replace("{%YOUNGER%}", "younger");
  }
  if (!val.younger) {
    output = output.replace("{%YOUNGER%}", "older");
  }

  return output;
};
