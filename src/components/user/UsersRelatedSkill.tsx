import React from 'react'
import OutlinedCard from '../common/Card'
import { IuserSkillCardProps } from '../../page/user/Home';

interface UsersRelatedSkillProps {
  users: IuserSkillCardProps[];
}


const UsersRelatedSkill : React.FC<UsersRelatedSkillProps> = ({users}) => {
  
  return (
    <div>
    <OutlinedCard users={users}/>
    </div>
  )
}

export default UsersRelatedSkill
