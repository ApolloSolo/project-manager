module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please add a username.";
  }
  if (email.trim() === "") {
    errors.email = "Please add an email.";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Please enter a valid email address.";
    }
  }
  if (password === "") {
    errors.password = "Please enter a valid password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Please add a email.";
  }
  if (password === "") {
    errors.password = "Password must not be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateClientAddition = (managerEmail, name) => {
  const errors = {};
  if (managerEmail.trim() === "") {
    errors.managerEmail = "Please add a manager's email.";
  }
  if (name === "") {
    errors.name = "Client name must not be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateProjectAddition = (
  clientName,
  siteId,
  subContractor
) => {
  const errors = {};
  if (clientName.trim() === "") {
    errors.clientName = "Please add a client's name.";
  }
  if (siteId.trim() === "") {
    errors.siteId = "Please add a site ID.";
  }
  if (subContractor.trim() === "") {
    errors.subContractor = "Please add a sub-contractor.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateAssetAddition = (siteId, asset, volume) => {
  const errors = {};
  if (siteId.trim() === "") {
    errors.siteId = "Please add a site ID.";
  }
  if (asset.trim() === "") {
    errors.asset = "Please add asset name.";
  }
  if (volume === "") {
    errors.volume = "Please add volume quantity.";
  } else if (typeof volume !== 'number') {
    errors.volume = "Please add numeric value for volume quantity.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
