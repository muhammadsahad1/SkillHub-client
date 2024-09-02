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

//  =============================================>  Event validation ]
export const eventValidation = (
  title: string,
  description: string,
  date: string,
  time: string,
  duration: string,
  speaker: string,
  bannerFile: File | null,
  price: number,
  currency: string,
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  const today = new Date().toISOString().split("T")[0];

  const nameRegex = /^[A-Za-z\s\-']+$/;
  const wordCountRegex = /\b\w+\b/g;
  const currencyRegex = /^[A-Z]{3}$/; // Basic check for currency code format (e.g., USD, EUR)

  // Title validation
  if (
    !title ||
    !nameRegex.test(title) ||
    title.length < 3 ||
    title.length > 100
  ) {
    errors.title =
      "Title must be 3-100 characters long and contain only letters, spaces, hyphens, or apostrophes.";
  }

  // Description validation
  const wordCount = (description.match(wordCountRegex) || []).length;
  if (!description || wordCount < 20) {
    errors.description =
      "Description must contain at least 20 words and should not include HTML or script tags.";
  }

  // Speaker validation
  if (
    !speaker ||
    !nameRegex.test(speaker) ||
    speaker.length < 3 ||
    speaker.length > 100
  ) {
    errors.speaker =
      "Speaker name must be 3-100 characters long and contain only letters, spaces, hyphens, or apostrophes.";
  }

  // Date validation
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

  // Price validation
  if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0 || Number(price) > 10000) {
    errors.price = "Price must be a number between 0 and 10,000.";
  }

  // Currency validation
  if (!currency || !currencyRegex.test(currency)) {
    errors.currency = "Currency must be a valid 3-letter currency code (e.g., USD, EUR).";
  }

  // Banner file validation (Optional)
  if (bannerFile) {
    const allowTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowTypes.includes(bannerFile.type)) {
      errors.banner = "Banner file must be an image (JPEG, PNG, GIF).";
    }
  }

  return errors;
};

