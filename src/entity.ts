import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("User")
@ObjectType("User")
class User extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @PrimaryColumn()
  @Field()
  email: string;
}

export default User;
