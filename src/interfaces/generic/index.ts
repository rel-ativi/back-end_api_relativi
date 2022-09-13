export class INameOnly {
  name: string;
}

export class INameNumber {
  name: string;
  number: number;
}

export class IScheduleRequest {
  activityId: string;
  userId: string;
  date: string;
  hour: string;
}

export class ISchedule {
  activityId: string;
  userId: string;
  date: string;
  hour: string;
  id: string;
}

export class IIdOnly {
  id: string;
}
