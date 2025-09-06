
export interface AadhaarVerificationResponse {
    isValid: boolean;
    details?: {
        name: string;
        dob: string;
        address: string;
    };
}

export interface DigilockerVerificationResponse {
    isVerified: boolean;
    documents?: {
        documentType: string;
        issuer: string;
        issuedDate: string;
    }[];
}

export interface PanVerificationResponse {
    isValid: boolean;
    details?: {
        name: string;
        panNumber: string;
    };
}

export interface VoterIdVerificationResponse {
    isValid: boolean;
    details?: {
        name: string;
        epicNumber: string;
        pollingStation: string;
    };
}
