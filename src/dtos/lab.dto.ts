// dtos/lab.dto.ts

export interface LabResponseDto {
    id: string;
    name: string;
    alias: string;
  }
  
  export interface CreateLabDto {
    name: string;
    alias: string;
  }
  