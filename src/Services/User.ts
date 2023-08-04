import { AppDataSource } from "../data-source";
import { User as UserEntity } from "../entity/User";
import { User, UserInput } from "../types/types";
import { QueryFailedError } from "typeorm";

export const addUser = async (userData: UserInput, token: string) => {
  try {
    const user = new UserEntity();
    user.name = userData.name;
    user.phoneNumber = userData.phoneNumber;
    user.password = userData.password;
    user.nic = userData.nic;
    user.token = token;

    const userRepository = AppDataSource.getRepository(UserEntity);

    await userRepository.save(user);
    console.log("User added successfully!");
    return true;
  } catch (error: any) {
    // Check if the error is a QueryFailedError (constraint violation)
    if (error instanceof QueryFailedError) {
      console.error("Error while adding user:", error);

      // Check for duplicate entry on phonenumber
      if (
        error.message.includes("Duplicate entry") &&
        error.message.includes("phoneNumber_index")
      ) {
        return "User with the same phone number already exists.";
      }
      // Check for duplicate entry on nic
      if (
        error.message.includes("Duplicate entry") &&
        error.message.includes("nic_index")
      ) {
        return "User with the same NIC already exists.";
      }
    }

    // For other errors, you can log the error for debugging purposes
    //  console.error("Error while adding user:", error);
    return "An error occurred while adding the user.";
  }
};

export const checkIfUserExists = async (
  input: string,
  mode: "phone" | "nic"
): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(UserEntity);
  if (mode === "phone") {
    const existingUser = await userRepository.findOne({
      where: { phoneNumber: input },
    });
    return !!existingUser;
  }
  if (mode === "nic") {
    const existingUser = await userRepository.findOne({
      where: { nic: input },
    });
    return !!existingUser;
  }
};
