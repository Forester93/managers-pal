function dbContains(arrayCheck, property, valueCheck) {
  workingArr = arrayCheck.filter((item) => item[property] == valueCheck);
  return workingArr.length == true;
}

module.exports = dbContains;
