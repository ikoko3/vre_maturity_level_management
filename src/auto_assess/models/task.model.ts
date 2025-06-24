import mongoose, { Schema, Document } from 'mongoose';

export interface IVLReference {
  vl_id: string;
  exit_condition_ids: string[]; // Related to this task
}

export interface IExecutionMetadata {
  initiated_at: Date;
  finished_at?: Date;
  triggered_by: string;
  trigger_source?: string;
}

export interface IExecutionResult {
  value: number;
  unit?: string;
  confidence?: number;
  raw_output?: string;
}

export interface IExecutionError {
  error_code?: string;
  message?: string;
  stacktrace?: string;
}

export interface ITask extends Document {
  task_definition_id: string;
  vl_reference: IVLReference;
  status: string;
  execution_parameters: Record<string, any>;
  execution_metadata: IExecutionMetadata;
  result?: IExecutionResult;
  error?: IExecutionError;
}

const VLReferenceSchema = new Schema<IVLReference>({
  vl_id: { type: String, required: true },
  exit_condition_ids: [{ type: String, required: true }],
});

const ExecutionMetadataSchema = new Schema<IExecutionMetadata>({
  initiated_at: { type: Date, required: true },
  finished_at: { type: Date },
  triggered_by: { type: String, required: true },
  trigger_source: { type: String },
});

const ExecutionResultSchema = new Schema<IExecutionResult>({
  value: { type: Number, required: true },
  unit: { type: String },
  confidence: { type: Number },
  raw_output: { type: String },
});

const ExecutionErrorSchema = new Schema<IExecutionError>({
  error_code: { type: String },
  message: { type: String },
  stacktrace: { type: String },
});

const TaskSchema: Schema = new Schema({
  task_definition_id: { type: String, required: true },
  vl_reference: { type: VLReferenceSchema, required: true },
  status: { type: String, enum: ['NEW', 'RUNNING', 'COMPLETED', 'FAILED'], default: 'NEW' },
  execution_parameters: { type: Schema.Types.Mixed },
  execution_metadata: { type: ExecutionMetadataSchema, required: true },
  result: { type: ExecutionResultSchema },
  error: { type: ExecutionErrorSchema },
}, { timestamps: true });

export const Task = mongoose.model<ITask>('Task', TaskSchema);
