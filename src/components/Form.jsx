// import React, { useEffect, useState } from "react";
// import { Toaster, toast } from "react-hot-toast";
// import { createStudentRegistration, getById, updateStudenInformation } from "../apiRequest/apiRequest";
// import { useNavigate } from "react-router-dom";

// const Form = () => {
//   let navigate = useNavigate();
//   const [FormValue, setFormValue] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     dateOfBirth: "",
//     nationality: "",
//     address: " ",
//     email: "",
//     phone: "",
//     admissionDate: "",
//     courses: "",
//   });
//   const [updateId, setUpdateId] = useState(null);

//   const InputOnChange = (name, value) => {
//     setFormValue((FormValue) => ({
//       ...FormValue,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     (async () => {
//       let urlParams = new URLSearchParams(window.location.search);
//       const id = urlParams.get('id');
//       setUpdateId(id);
//       if (id !== null) {
//         await fillFrom(id);
//       }
//     })();
//   }, []);

//   const fillFrom = async (id) => {
//     let res = await getById(id);
//     setFormValue({
//       firstName: res['firstName'],
//       lastName: res['lastName'],
//       gender: res['gender'],
//       dateOfBirth: res['null'],
//       nationality: res['nationality'],
//       address: res['address'],
//       email: res['email'],
//       phone: res['phone'],
//       admissionDate: res['null'],
//       courses: res['courses']
//     })
//   };

//   const save = async () => {
//     if (FormValue.email.length === 0) {
//       toast.error("Email is required");
//     } else if (FormValue.phone.length === 0) {
//       toast.error("Phone is required");
//     } else if (FormValue.firstName.length === 0) {
//       toast.error("First Name is required");
//     } else if (FormValue.address.length === 0) {
//       toast.error("address is required");
//     } else if (FormValue.courses.length === 0) {
//       toast.error("courses Name is required");
//     } else {
//       if (updateId==null) {
//           let res = await createStudentRegistration(FormValue);
//           if (res) {
//             toast.success("Create Request Completed");
//             navigate("/");
//           } else {
//             toast.error("Create Request Fail");
          
//           }
//       } else {
//         let res = await updateStudenInformation(FormValue, updateId);
//         if (res) {
//           toast.success("Update Request Completed");
//           navigate("/");
//         } else {
//           toast.error("Update Request Fail");
//         }
//       }
//     }
//   };

//   return (
//     <div className="container mt-5 pt-5">
//       <div className="row">
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your First Name</label>
//           <input
//             value={FormValue.firstName}
//             onChange={(e) => InputOnChange("firstName", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Last Name</label>
//           <input
//             value={FormValue.lastName}
//             onChange={(e) => InputOnChange("lastName", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Gender</label>
//           <select
//             name="gender"
//             value={FormValue.gender}
//             onChange={(e) => InputOnChange("gender", e.target.value)}
//             className="form-select"
//           >
//             <option value="" disabled>
//               Select Gender
//             </option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Date Of Birth</label>
//           <input
//             value={FormValue.dateOfBirth}
//             onChange={(e) => InputOnChange("dateOfBirth", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Nationality</label>
//           <input
//             value={FormValue.nationality}
//             onChange={(e) => InputOnChange("nationality", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Address</label>
//           <input
//             value={FormValue.address}
//             onChange={(e) => InputOnChange("address", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Email</label>
//           <input
//             value={FormValue.email}
//             onChange={(e) => InputOnChange("email", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Phone</label>
//           <input
//             value={FormValue.phone}
//             onChange={(e) => InputOnChange("phone", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Admission Date</label>
//           <input
//             value={FormValue.admissionDate}
//             onChange={(e) => InputOnChange("admissionDate", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>
//         <div className="col-md-4 p-2">
//           <label className="form-label">Your Course</label>
//           <input
//             value={FormValue.courses}
//             onChange={(e) => InputOnChange("courses", e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder=""
//           />
//         </div>

//         <div className="col-md-4 p-2">
//           <label className="form-label">Save Change</label>
//           <br />
//           <button onClick={save} className="btn w-100 btn-success">
//             Submit
//           </button>
//         </div>
//       </div>
//       <Toaster position="bottom-center" />
//     </div>
//   );
// };

// export default Form;
