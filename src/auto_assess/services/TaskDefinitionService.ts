import { TaskDefinition, ITaskDefinition } from '../models/task_definition.model';

export class TaskDefinitionService {
  /**
   * Create a new TaskDefinition
   * @param data Partial data for creating the task definition
   * @returns The created task definition document
   */
  static async createTaskDefinition(data: {
    short_description: string;
    description_url?: string;
    version?: string;
    associated_exit_conditions: string[];
  }): Promise<ITaskDefinition> {
    const taskDef = new TaskDefinition({
      ...data,
      version: data.version || '1.0',
    });

    return await taskDef.save();
  }

  /**
   * Retrieve a task definition by ID
   * @param id The MongoDB ObjectId string
   * @returns TaskDefinition document or null if not found
   */
  static async getTaskDefinitionById(id: string): Promise<ITaskDefinition | null> {
    return await TaskDefinition.findById(id).exec();
  }

  /**
   * Get all task definitions, optionally filtered
   * @param filter Optional MongoDB filter
   * @returns Array of task definitions
   */
  static async listTaskDefinitions(filter = {}): Promise<ITaskDefinition[]> {
    return await TaskDefinition.find(filter).exec();
  }
}
