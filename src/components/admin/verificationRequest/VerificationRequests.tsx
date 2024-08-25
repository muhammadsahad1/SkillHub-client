import React, { useEffect, useState } from "react";
import { getVerificationRequests, updateRequestStatus } from "../../../API/admin";

const VerificationRequests = () => {

  const [requests, setRequests] = useState([]);
  // const loadVerificationRequests = async () => {
  //   try {
  //     const result = await getVerificationRequests();
  //     setRequests(result);
  //   } catch (error) {}
  // };

  // // action to verificationRequest
  // useEffect(() => {
  //   loadVerificationRequests();
  // }, []);

  // // for handling the action for reject or accept
  // const handleAction = async(reqId : string , action : string) => {
  //   try {
  //     const status = action === "accept" ? "Approved" : "Rejected"
  //     const result = await updateRequestStatus(reqId,status)
  //     if(result.success){
  //       loadVerificationRequests()
  //     }

  //   } catch (error) {
      
  //   }
  // }

  return (
    <div className="p-4">
      <h1>Verification Requests</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Proof Links</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request : any) => (
            <tr key={request._id}>
              <td className="border px-4 py-2">{request?._id}</td>
              <td className="border px-4 py-2">{request?.name}</td>
              <td className="border px-4 py-2">{request?.email}</td>
              <td className="border px-4 py-2">{request?.status}</td>
              <td className="border px-4 py-2">
                {request?.proofLinks && request?.proofLinks.length > 0
                  ? request.proofLinks.join(", ") // Displaying links as a comma-separated list
                  : "No proof provided"}
              </td>
              <td className="border px-4 py-2">
                {new Date(request?.createdAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {/* <select className="border px-4 py-2"
                onChange={(e)=>handleAction(request._id,e.target.value)}
                defaultValue= ""
                >
                  <option value="" disabled>Select action</option>
                  <option value="accept">Accept</option>
                  <option value="reject">Reject</option>
                </select> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationRequests;
