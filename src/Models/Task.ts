import User from "./User";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
class Task extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => String)
  @Column()
  time?: string;

  @ManyToMany(() => User, (user) => user.tasks)
  user: User;
}

export default Task;
