export interface UserModel { 
    reference: {
        role: String
    };
    instituteId: String;
    departmentId: String;
    affiliateId: String;
    institute: {
        code: String;
    };
    department: {
        code: String;
    };
    affiliate: {
        code: String;
    };
    firstName: String;
    email: String;
    phoneNumber: String;
    isActive: String;
    token?: string;
    status: String;
    _id: Number;
}