import { AppDataSource } from "../data-source";
import { User as UserEntity } from "../entity/User";
import { User, UserInput } from "../types/types";
import { QueryFailedError } from "typeorm";
import bcrypt from "bcryptjs";

export const addUser = async (userData: UserInput) => {
  try {
    const user = new UserEntity();
    user.name = userData.name;
    user.phoneNumber = userData.phoneNumber;
    user.password = userData.password;
    user.nic = userData.nic;

    const userRepository = AppDataSource.getRepository(UserEntity);

    await userRepository.save(user);
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

export const comparePassword = async (
  nic: string,
  password: string
): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  const user = await userRepository.findOne({ where: { nic: nic } });

  return await bcrypt.compare(password, user.password);
};

export const getUserDetails = async (nic: string): Promise<UserEntity> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  return await userRepository.findOne({ where: { nic: nic } });
};

export const getAllUsers = async (): Promise<Array<UserEntity>> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  return await userRepository.find();
};
export const getAllAdmins = async (): Promise<Array<UserEntity>> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  return await userRepository.find({ where: { role: "admin" } });
};
export const getAllDoctors = async (): Promise<Array<UserEntity>> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  return await userRepository.find();
};
