export enum LabLevel {
    Zero = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
  }

//These are some indications on how the states could be defined
export enum LabLevelState {
    Undefined = 0,
    NotStarted = 10000,
    InProgress = 20000,
    Completed = 30000
}

export enum ConditionType {
  Undefined = 0,
  LabLevelProgression = 10,
  Intermediary = 20,
}