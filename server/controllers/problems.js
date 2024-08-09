const db = require("../db");

const problemsolved = async (req, res) => {
  try {
    const user = req.user.username;
    const url = req.body.url;
    // Add the problem to the problems table
    await db("problems").insert({
      user,
      url,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res
      .status(200)
      .json({ message: "Problem marked as solved.", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

const getsolvedproblems = async (req, res) => {
  try {
    const user = req.user.username;
    // Get all solved problems
    const problems = await db("problems").where({ user });

    res.status(200).json({ problems, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

const isproblemsolved = async (req, res) => {
  try {
    const user = req.user.username;
    const url = req.body.url;
    // Check if the problem is solved
    const problem = await db("problems").where({ user, url }).first();

    res.status(200).json({ solved: !!problem, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

const removeproblemsolved = async (req, res) => {
  try {
    const user = req.user.username;
    const url = req.body.url;
    // Remove the problem from the problems table
    await db("problems").where({ user, url }).delete();

    res
      .status(200)
      .json({ message: "Problem removed from solved.", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

const suggestproblem = async (req, res) => {
  try {
    const suggested_by = req.user.username;
    const problem = req.body.url;
    // suggest the problem to all friends of user
    const friends = await db("friends")
      .where({ user: suggested_by, accepted: true })
      .orWhere({ friend: suggested_by, accepted: true });
    const suggested = friends.map((friend) => {
      return {
        suggested_by,
        suggested_to:
          friend.user === suggested_by ? friend.friend : friend.user,
        problem,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });
    if (suggested.length === 0) {
      throw new Error("You don't have any friends to suggest the problem to.");
    }

    res
      .status(200)
      .json({ message: "Problem suggested.", suggested, success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

const getsuggestedproblems = async (req, res) => {
  try {
    const suggested_to = req.user.username;
    const page = req.query.page || 1;

    // Optimized query: retrieve suggested problems and check if they are solved in a single query
    const problems = await db("suggetions")
      .where({ suggested_to })
      .join("problems", "suggetions.problem", "problems.url")
      .leftJoin("problems as solved_problems", function () {
        this.on("suggetions.problem", "=", "solved_problems.url").andOn(
          "solved_problems.user",
          "=",
          db.raw("?", [suggested_to])
        );
      })
      .select(
        "problems.url",
        "problems.created_at",
        "problems.updated_at",
        db.raw(
          "CASE WHEN solved_problems.url IS NOT NULL THEN true ELSE false END as solved"
        )
      )
      .limit(10)
      .offset((page - 1) * 10);

    res.status(200).json({ problems, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || error.detail || error, success: false });
  }
};

module.exports = {
  problemsolved,
  getsolvedproblems,
  isproblemsolved,
  removeproblemsolved,
  suggestproblem,
  getsuggestedproblems,
};

/*

const getproblemsuggested = async (req, res) => {
  try {
    const suggested_to = req.user.username;
    const page = req.query.page || 1;

    // Optimized query: retrieve suggested problems and check if they are solved in a single query
    const problems = await db("suggetions")
      .where({ suggested_to })
      .join("problems", "suggetions.problem", "problems.url")
      .leftJoin("problems as solved_problems", function() {
        this.on("suggetions.problem", "=", "solved_problems.url")
          .andOn("solved_problems.user", "=", db.raw("?", [suggested_to]));
      })
      .select(
        "problems.url", 
        "problems.created_at", 
        "problems.updated_at",
        db.raw("CASE WHEN solved_problems.url IS NOT NULL THEN true ELSE false END as solved")
      )
      .limit(10)
      .offset((page - 1) * 10);

    res.status(200).json({ problems, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message || error.detail || error, success: false });
  }
};
Explanation of the Optimized Code:
Single Query for Fetching and Checking Solved Status:

This code uses a single SQL query to fetch both the suggested problems and the information about whether each problem is solved.
We use a LEFT JOIN to join the problems table with itself (aliased as solved_problems) based on the problem URL and the current user.
The CASE statement is used to determine if the problem is solved by checking if a corresponding entry exists in the solved_problems join.
Avoids Loading All Solved Problems into Memory:

Instead of loading all solved problems into memory and creating a map, the LEFT JOIN directly checks if the problem is solved during the query, which reduces the space complexity and avoids iterating through potentially large arrays in JavaScript.
Efficient Pagination:

The pagination logic remains efficient by using the LIMIT and OFFSET clauses directly in the SQL query, ensuring that only the relevant page of results is fetched from the database.
Benefits:
Time Complexity: This approach reduces the time complexity to O(1) for each page request, as it avoids the need to iterate over all solved problems.
Space Complexity: The space complexity is reduced since we're not storing all solved problems in memory, only the results of the current page are held.
This optimized approach leverages the database's capabilities to perform the heavy lifting, which is generally more efficient than handling large datasets in application code.
*/
