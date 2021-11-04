import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import User from "./entity";

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
  async createUser(@Arg("name") name: string, @Arg("email") email: string) {
    const user = User.create({ name: name, email: email });
    user.save();

    return !!user;
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
