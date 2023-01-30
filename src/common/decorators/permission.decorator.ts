import { SetMetadata } from '@nestjs/common';

export const Permission = (...tables: string[]) =>
  SetMetadata('tables', tables);
