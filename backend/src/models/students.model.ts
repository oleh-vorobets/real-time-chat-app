import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  group: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

  @Column()
  birthday: string;
}
