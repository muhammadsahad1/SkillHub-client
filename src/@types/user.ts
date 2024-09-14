export interface userFormData {
  name : string,
  email : string,
  password? : string,
  confirm_password? : string
}

export interface FollowParams {
  toFollowingId: string | undefined;
  fromFollowerId: string | undefined;
}