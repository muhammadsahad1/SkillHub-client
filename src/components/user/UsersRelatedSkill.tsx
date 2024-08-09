import React, { useState } from 'react'
import OutlinedCard from '../common/Card'
import { getSkillRelatedUsers } from '../../API/user';
import useGetUser from '../../hook/getUser';


export interface IuserSkillCardProps {
  _id?: string;
  userName?: string;
  profileUrl?: string;
  coverImgUrl?: string;
  country?: string,
  skill?: string;
  bio?: string;
}


const UsersRelatedSkill = () => {
  
  
  const currentUser = useGetUser();
  const currentUserSkill = currentUser.skill;
  const [skillRelatedUsers, setSkillRelatedUsers] = useState<
    IuserSkillCardProps[]
  >([]);
  
  const [isLoading, setLoading] = useState<boolean>(false);
  
  const fetchSkillRelatedUsers = async () => {
    try {
      const result = await getSkillRelatedUsers(currentUserSkill);
      console.log("result==>",result);
      
      if (result.success) {
        setSkillRelatedUsers(result.userDetails);
      }
    } catch (error) {}
  };
  
  
  React.useEffect(() => {
    if (currentUser.skill) {
      fetchSkillRelatedUsers();
    }
  }, []);
  
  
  return (
    <div className='mt-5'>
    <p className='font-poppins font-semibold text-zinc-900'>Your Skill Network</p>
    <OutlinedCard users={skillRelatedUsers}/>
    </div>
  )
}

export default UsersRelatedSkill
