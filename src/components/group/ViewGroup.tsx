import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSelectedGroup } from "../../API/group";
import { IGroup } from "../../@types/groupType";
import { showToastError } from "../common/utilies/toast";

const ViewGroup : React.FC = () => {
  const { groupId } = useParams();
  const [group,setGroup] = useState<IGroup | []>([])

  const fetchGroup = async (groupId : string) => {
    try {
      const result = await fetchSelectedGroup(groupId);
      if(result.success){
        setGroup(result)
      }
    } catch (error : any) {
      showToastError(error.message || "error in api request")
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId);
    }
  }, [groupId]);

  return <div className=""></div>;
};

export default ViewGroup;
