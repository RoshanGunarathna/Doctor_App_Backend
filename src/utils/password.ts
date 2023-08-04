import bcrypt from "bcryptjs";

// Function to generate a hash of the password using bcryptjs
export const hashPassword = async (password: string): Promise<string> => {
  // Generate a salt to hash the password
  const saltRounds = 15;

  try {
    // Use bcrypt to generate the hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    // Handle any errors
    throw new Error("Password hashing failed");
  }
};

export const validatePassword = (password: string): string | true => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const missingChecks = [];
  if (!/(?=.*[a-z])/.test(password)) missingChecks.push("lowercase letter");
  if (!/(?=.*[A-Z])/.test(password)) missingChecks.push("uppercase letter");
  if (!/(?=.*\d)/.test(password)) missingChecks.push("digit");
  if (!/(?=.*[@$!%*?&])/.test(password))
    missingChecks.push("special character");

  if (password.length < 8 || missingChecks.length > 0) {
    return `Password should contain: ${missingChecks.join(
      ", "
    )}. Password should contain at least 8 characters.`;
  }

  if (!passwordRegex.test(password)) {
    return "Invalid password format.";
  }

  return true;
};
