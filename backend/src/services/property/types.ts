
export interface ReraDetails {
    registrationNumber: string;
    projectAddress: string;
    promoterName: string;
    projectType: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export interface RtoDetails {
    registrationNumber: string;
    ownerName: string;
    vehicleType: string;
    issuingAuthority: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ReraProjectResponse {
    projectNumber: string;
    projectName: string;
    promoterName: string;
    registrationDate: string;
    completionDate: string;
    isRegistered: boolean;
}

export interface RtoVehicleResponse {
    vehicleNumber: string;
    ownerName: string;
    registrationDate: string;
    model: string;
    isFinanced: boolean;
}
