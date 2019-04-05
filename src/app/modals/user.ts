export interface UserModel { 
    UserType: String;
    instituteID: String;
    Department_ID: String;
    Affliated_Institute_ID: String;
    UserName: String;
    emailId: String;
    phoneNumber: String;
    isActivated: Boolean;
    activated: string;
    token?: string;
    status: String;
    _id: Number;
}