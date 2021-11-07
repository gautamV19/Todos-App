import { Resolver, Query } from "type-graphql";

@Resolver(() => String)
class TaskResolver {
  @Query(() => String)
  greet() {
    return "Jay Swaminarayan";
  }
}

export default TaskResolver;
