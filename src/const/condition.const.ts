
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
    DocumentationMetadata = 1100,                   // Metadata is available outside the virtual lab
    DocumentationMetadataVersionControl = 1101,     // Metadata is tracked via version control

    PersonalTokens = 1102,                           // Personal tokens are not tracked in version control

    VersionsPinned = 1103,                           // Software/library versions are pinned

    DataReadiness = 1104,                            // Data is ready for scientific experiments
    ExternalDataCatalogue = 1105,                    // Read-only data is stored in an external catalogue

    NoErrors = 1106,                                 // Code executes without errors (fresh machine test)
    CodeResponsibility = 1107,                       // Each notebook cell has clear responsibility
    CodingStyleGuide = 1108,                         // Coding style follows a standard (e.g., PEP 8)
    Parallelization = 1109,                          // Parallel processing used where appropriate
    MissingDataErrorHandling = 1110,                 // Clear errors when expected files/objects are missing
    ExternalToolLabeling = 1111,                     // CLI/external tools are clearly labeled

    ContainerizedCells = 1112,                       // Notebook cells can be containerized

    BenchmarkResources = 1113,                       // Benchmark conducted for storage/computing needs
    ResourceAvailability = 1114,                     // Required compute/storage are arranged

    ContainerExecution = 1115,                       // Containerized cells run without modification
    LabDemonstrationPossible = 1116,                 // Demonstration of lab is feasible

    // Level 2 - 12XX

    // Level 3 - 13XX

    // Level 4 - 14XX

    // Other - 2XXX
  }