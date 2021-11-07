import { Field, InputType } from "type-graphql";

@InputType("createUserInput")
class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

export default CreateUserInput;
