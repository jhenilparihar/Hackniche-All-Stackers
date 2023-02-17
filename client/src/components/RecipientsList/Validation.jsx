export const ValidateName = (name) => {
  if (name.length < 1) {
    return ["name", "Field Required"];
  } else {
    return ["name", ""];
  }
};

export const ValidateSAP = (SAP) => {
  if (SAP.length < 1) {
    return ["SAP", "Field Required"];
  } else if (!isPositiveInteger(SAP)) {
    return ["SAP", "Sap id should be of numbers"];
  } else {
    return ["SAP", ""];
  }
};

export const ValidateCourse = (course) => {
  if (course.length < 1) {
    return ["course", "Field Required"];
  } else {
    return ["course", ""];
  }
};

export const ValidateEmail = (email) => {
  if (email.length < 1) {
    return ["email", "Field Required"];
  } else if (invalidEmail(email)) {
    return ["email", "Invalid Email"];
  } else {
    return ["email", ""];
  }
};

export const ValidatePassoutYear = (passoutYear) => {
  var currentTime = new Date();
  var year = currentTime.getFullYear();
  if (passoutYear.length < 1) {
    return ["passoutYear", "Field Required"];
  } else if (passoutYear.length !== 4) {
    return ["passoutYear", "Invalid Year"];
  } else if (!isPositiveInteger(passoutYear)) {
    return ["passoutYear", "Invalid Year"];
  } else if (Number(passoutYear) > Number(year)) {
    return ["passoutYear", "Passout Year is greater than current year"];
  } else {
    return ["passoutYear", ""];
  }
};

export const ValidatePercentage = (percentage) => {
  if (percentage.length < 1) {
    return ["percentage", "Field Required"];
  } else if (isNaN(percentage)) {
    return ["percentage", "Invalid Percentage"];
  } else if (percentage.slice(0, percentage.indexOf(".")).length > 2) {
    return ["percentage", "Invalid Percentage"];
  } else {
    return ["percentage", ""];
  }
};

export const ValidateContact = (contact) => {
  if (contact.length < 1) {
    return ["contact", "Field Required"];
  } else if (!isPositiveInteger(contact)) {
    return ["contact", "Invalid Phone Number"];
  } else if (contact.length !== 10) {
    return ["contact", "Invalid Phone Number "];
  } else {
    return ["contact", ""];
  }
};

const invalidEmail = (mail) => {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return false;
  }
  return true;
};

const isPositiveInteger = (str) => {
  if (typeof str !== "string") {
    return false;
  }
  const num = Number(str);
  if (Number.isInteger(num) && num > 0) {
    return true;
  }
  return false;
};
