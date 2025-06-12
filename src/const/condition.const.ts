
//TODO: These should be refined and be categorized
export enum ConditionStatus {
    Unknown = 0,

    //Development
    InProgress = 100,
    Blocked = 101,
    
    //Evaluation
    RequestedEvaluation = 200,
    UnderEvalutaion = 201,

    //Final status
    Verified = 300,
}


//This is a broad categorization enum to specify 
export enum ConditionCategory {
    Undefined = 0,
    LabLevelProgression = 10,
    Intermediary = 20,
    Other = 30,
}


//These are based on the readiness level framework documentation
//https://naavre.net/docs/readiness_levels/L0_initial_proposal/
//TODO: Fill out the rest
export enum ConditionType {
    Undefined = 0,

    // Level 0 - 10XX
    PlanFeasibility = 1000,
    DevelopmentTimeline = 1001,
    CodeBase = 1002,
    TokenDiscretion = 1003,
    LicenseExistence = 1004,
    DescriptiveName = 1005,

    // Level 1 - 11XX

    // Level 2 - 12XX

    // Level 3 - 13XX

    // Level 4 - 14XX

    // Other - 2XXX
  }