// validation user SignUp & login

export const validateUsername = (username: string) => {
  const minLength = 3;
  const usernameRegex = /^[A-Za-z]+$/;

  if (!username) {
    return "Username is required";
  }

  if (username.length < minLength) {
    return `Username should have at least ${minLength}`;
  }

  if (!usernameRegex.test(username)) {
    return "Username should only contain letter";
  }

  if (/\s/.test(username)) {
    return "Username should not contain space";
  }
  return true;
};

export const validateEmail = (email: string) => {
  const regexValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regexValidEmail.test(email) ? true : "Invalid email format";
};

export const validatePassword = (password: string) => {
  if (typeof password !== "string") return false;

  const validations = [
    {
      condition: password.length >= 6,
      message: "Password should be at least 6 characters long.",
    },
    {
      condition: /\d/.test(password),
      message: "Password should be contain at least one digit",
    },
    {
      condition: /[a-z]/.test(password),
      message: "Password should be contain at least one alphabet",
    },
    {
      condition: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      message: "Password should contain at least one special character",
    },
    {
      condition: !/\s/.test(password),
      message: "Password should not contain spaces",
    },
  ];
  const failedValidation = validations.find(
    (validation) => !validation.condition
  );
  return failedValidation ? failedValidation.message : true;
};

//  =============================================>       Event validation ]
export const eventValidation = (
  title: string,
  description: string,
  date: string,
  time: string,
  duration: string,
  speaker: string,
  registrationLink: string,
  accessLink: string,
  bannerFile: File | null
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  const today = new Date().toISOString().split("T")[0];

  const nameRegex = /^[A-Za-z\s\-']+$/;
  const urlRegex = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/i;
  const wordCountRegex = /\b\w+\b/g;

  // title validation
  if (
    !title ||
    !nameRegex.test(title) ||
    title.length < 3 ||
    title.length > 100
  ) {
    errors.title =
      "Title must be 3-100 characters long and contain only letters, spaces, hyphens, or apostrophes.";
  }

  // description validation
  const wordCount = (description.match(wordCountRegex) || []).length;
  if (!description || wordCount < 20) {
    errors.description =
      "Description must contain at least 20 words and should not include HTML or script tags.";
  }

  //speaker validation
  if (
    !speaker ||
    !nameRegex.test(speaker) ||
    speaker.length < 3 ||
    speaker.length > 100
  ) {
    errors.speaker =
      "Speaker name must be 3-100 characters long and contain only letters, spaces, hyphens, or apostrophes.";
  }

  // date validation
  if (!date || new Date(date).toISOString().split("T")[0] < today) {
    errors.date = "Date must be today or in the future.";
  }

  // Time validation
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!time || !timeRegex.test(time)) {
    errors.time = "Time must be a valid 24-hour time format (HH:mm).";
  }

  // Duration Validation
  if (
    !duration ||
    isNaN(Number(duration)) ||
    Number(duration) <= 0 ||
    Number(duration) > 1440
  ) {
    errors.duration =
      "Duration must be a positive number and should not exceed 1440 minutes.";
  }

  //duration validation
  if (
    !duration ||
    isNaN(Number(duration)) ||
    Number(duration) <= 0 ||
    Number(duration) > 1440
  ) {
    errors.duration =
      "Duration must be a positive number and should not exceed 1440 minutes.";
  }

  // URL Validation
  if (registrationLink && !urlRegex.test(registrationLink)) {
    errors.registrationLink = "Registration Link must be a valid URL.";
  }

  //access link validation
  if (!accessLink && !urlRegex.test(accessLink)) {
    errors.accessLink = "Access Link must be a valid URL.";
  }

  if (bannerFile) {
    const allowTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowTypes.includes(bannerFile.type)) {
      errors.bannerFile = "Banner file must be an image (JPEG, PNG, GIF).";
    }
  } else {
    errors.bannerFile = "Banner file is required.";
  }

  return errors;
};
