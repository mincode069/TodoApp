export interface Work {
  id: number;
  name: string;
  intended: number;
  status: StatusEnum;
  deadline: Date;
}

export enum StatusEnum {
  pending = '0',
  working = '1',
  expired = '2',
  done = '3',
}
