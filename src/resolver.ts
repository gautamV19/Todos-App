import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
  UseMiddleware,
} from "type-graphql";
import User from "./entity";
import CreateUserInput from "./input";
import jwt from "jsonwebtoken";

@ObjectType()
class Task {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string | undefined;

  @Field(() => String)
  time?: string;
}

@ObjectType()
class LoginOutput{
  @Field(()=>User)
  user:User;

  @Field()
  token:string;
}

@Resolver(() => String)
class HelloWord {
  @Mutation(() => Boolean)
  @UseMiddleware()
  async createUser(@Arg("data") createUserInput: CreateUserInput) {
    const user = User.create({
      name: createUserInput.name,
      email: createUserInput.email,
    });
    user.save();

    return !!user;
  }

  @Mutation(()=>LoginOutput)
  async login(@Arg("email") email:string) {
    const user= User.findOne({email:email});
    const token= jwt.sign({email}, "jay swaminarayan");

    return {user, token};
  }

  @Query(() => [User])
  getUser() {
    const users = User.find();
    return users;
  }

  @Query(() => Task)
  getTask() {
    const task = new Task();
    task.title = "jsn";
    task.description = "hihi";
    task.time = "7.13pm";

    return task;
  }

  @Query(() => String)
  greet() {
    return "Jay Swaminarayan";
  }
}

export default HelloWord;
