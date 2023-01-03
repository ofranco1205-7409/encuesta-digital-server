function getFilePath(file) {
  //console.log(file.path);
  const filePath = file.path;
  //const fileSplit = filePath.split("/");
  const fileSplit = filePath.split("\\");

  //console.log(fileSplit);

  return `${fileSplit[1]}/${fileSplit[2]}`;
}

module.exports = {
  getFilePath,
};
