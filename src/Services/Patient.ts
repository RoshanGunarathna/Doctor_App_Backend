// import { AppDataSource } from "../data-source";
// import { Patients } from "../entity/Patient";
// import { Patient } from "../types/types";

// export const addPatient = async (patientData: Patient) => {
//   try {
//     const patient = new Patients();
//     patient.name = patientData.name;
//     patient.email = patientData.email;
//     patient.phoneNumber = patientData.phoneNumber;
//     patient.address = patientData.address;
//     patient.password = patientData.password;
//     patient.token = patientData.token;
//     patient.id = patientData.id;

//     console.log(patientData);

//     await AppDataSource.manager.save(patient);
//     console.log("pit");
//     // return true;
//   } catch (error: any) {
//     return error;
//   }
// };
