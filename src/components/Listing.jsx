// import React, { useEffect, useState } from "react";
// import { allRegistedStudent, deleteStudent } from "../apiRequest/apiRequest";
// import { toast, Toaster } from "react-hot-toast";
// import { Link } from "react-router-dom";

// const Listing = () => {
//   const [data, setData] = useState([]);
//   let [change, setChange] = useState(0);

//   useEffect(() => {
//     (async () => {
//       let result = await allRegistedStudent();
//       setData(result);
//     })();
//   }, [change]);

//   const onDelete = async (id) => {
//     let res = await deleteStudent(id);
//     if (res) {
//       toast.success("Delete completed");
//       setChange(new Date().getTime());
//     } else {
//       toast.error("Delete fail");
//     }
//   };

//   if (data.length === 0) {
//     return (
//       <div>
//         <h1>Loading.....</h1>
//       </div>
//     );
//   } else {
//     return (
//       <div className="container mt-5 pt-5">
//         <div className="row">
//           <div className="col-12">
//             <table className="table-responsive w-100   p-5 shadow-lg">
//               <thead className="text-center ">
//                 <tr className="">
//                   <th className="p-2">First Name</th>
//                   <th className="p-2">Last Name</th>
//                   <th className="p-2">Gender</th>
//                   <th className="p-2">DOB</th>
//                   <th className="p-2">Nationality</th>
//                   <th className="p-2">Address</th>
//                   <th className="p-2">Email</th>
//                   <th className="p-2">Phone</th>
//                   <th className="p-2">Admission Date</th>
//                   <th className="p-2"></th>
//                 </tr>
//               </thead>
//               <tbody className="text-center table-bordered">
//                 {data.map((item, i) => {
//                   return (
//                     <tr key={i}>
//                       <td>{item["firstName"]}</td> {/* Corrected typo here */}
//                       <td>{item["lastName"]}</td> {/* Corrected typo here */}
//                       <td>{item["gender"]}</td> {/* Corrected typo here */}
//                       <td>{item["dateOfBirth"]}</td> {/* Corrected typo here */}
//                       <td>{item["nationality"]}</td> {/* Corrected typo here */}
//                       <td>{item["address"]}</td> {/* Corrected typo here */}
//                       <td>{item["email"]}</td> {/* Corrected typo here */}
//                       <td>{item["phone"]}</td> {/* Corrected typo here */}
//                       <td>{item["admissionDate"]}</td>
//                       <td className="p-4">
//                         <button
//                           className="btn btn-danger"
//                           onClick={() => {
//                             onDelete(item["_id"]);
//                           }}
//                         >
//                           Delete
//                         </button>
//                         <Link
//                           className="btn btn-success my-4"
//                           to={"/form?id=" + item["_id"]}
//                         >
//                           Edit
//                         </Link>
//                       </td>{" "}
//                       {/* Corrected typo here */}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//           <Toaster position="bottom-top" />
//         </div>
//       </div>
//     );
//   }
// };

// export default Listing;
