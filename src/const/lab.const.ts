export enum LabLevel {
    Zero = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
  }


export enum LabLevelState {
    Undefined = 0,

    InDevelopment = 100,

    EvaluationRequested = 200,
    UnderEvaluation = 201,
    ModificationsRequested = 202,
    ReEvaluationRequested = 203,

    Completed = 300,
}
