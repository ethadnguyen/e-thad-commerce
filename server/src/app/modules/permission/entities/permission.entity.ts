import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('permission', { schema: 'public' })
export class Permission {
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;
}
