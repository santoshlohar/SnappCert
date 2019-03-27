export interface User { 
    UserType: String;
    instituteId: String;
    departmentId: String;
    affInstituteId: String;
    username: String;
    emailId: String;
    phone: String;
    isActivated: Boolean;
    activated: string;
    token?: string;
    _id: Number;
}