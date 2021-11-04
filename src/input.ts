import { isEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType("createUser")
class CreateUser {
  @Field()
  name: string;

  @Field()
  @isEmail()
  email: string;
}
