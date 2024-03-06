export enum Role {
  Admin = "super-admin",
  Customer = "admin",
  General = "general",
  User = "user",
}

export enum GeneralStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum DriverSchedulerType {
  Driver = "driver",
  Scheduler = "scheduler",
  Both = "both",
}

export enum YesNoOption {
  Yes = "yes",
  No = "no",
}

export enum Branch {
  BW = "Berry Workshop",
  EX = "External Auditor / Consultant",
  HO = "Head Office",
  LO = "Logistics",
  ME = "Medowie",
  WO = "Workshop",
}

export enum SafetyCheckType {
  DRIVER = "driver",
  VEHICLE = "vehicle",
}
