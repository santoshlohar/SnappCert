export interface InstituteCourse {
    instituteId: string;
    departmentId: string;
    type: string;
    code: string;
    name: string;
    specialization: string;
    certificateGenerate: string;
    certificatePrint: string;
    gpaCalculated: string;
    subjectCredits: string;
    duration: string;
    durationUnit: string;
    termType: string;
    noOfTerms: Number;
    status: string;
    isActive: Boolean;
    _id: Number;
}