export interface UserData {
  userId : string | undefined
  name: string;
  email: string;
  phone?: string;
  payment ?: string
}


export interface IEventRegister {
  userId?: string | undefined;
  eventId?: string | undefined;
  name?: string;
  email?: string;
  phone?: string;
  paymentId?: string;
}