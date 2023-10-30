/* eslint-disable prettier/prettier */
export interface BaseFactoryInterface<T> {
  modelEntity: { new (doc?: any): T };
  modelName: string;
}
