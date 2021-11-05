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

  @Mutation(()=>User)
  async login(@Arg("email") email:string) {
    const user= User.findOne({email:email});
    const token= jwt.sign({email}, process.env.jwtsecret)
    return user;
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
