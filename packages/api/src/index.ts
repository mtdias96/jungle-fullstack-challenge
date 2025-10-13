import { Link } from './shared/entities/link.entity';

import { createDataSource } from './shared/database/data-source';
import { CreateLinkDto } from './shared/dto/create-link.dto';
import { UpdateLinkDto } from './shared/dto/update-link.dto';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
  },
  entities: {
    Link,
  },
  database: {
    createDataSource
  }
};
