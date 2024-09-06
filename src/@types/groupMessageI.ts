  export interface GroupMessages {
    createdAt : string
    media ? : string,
    message : string,
    readBy: string[]; 
    sender : {
      _id : string ,name : string,userProfile : string
    },
    _id : string,

  }
