export const statusLabel = ["ยังไม่ได้ทำ", "กำลังทำ", "เสร็จสิ้น"];
export type Status = 0 | 1 | 2;

export interface Todo {
    id: string | number[];
    group: string;
    title: string;
    description?: string;
    status: Status;
}

export interface Group{
    id: string | number[];
    title: string,
    icon?: string
}