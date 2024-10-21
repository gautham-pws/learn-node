// __tests__/user.test.js
const User = require("../models/user");
require("../connection");

describe("User Model", () => {
  it("should have a valid email field", async () => {
    const user = new User({
      name: "Test User",
      age: 25,
      email: "testuser2@example.com",
      password: "testpassword",
    });

    // Save the user
    await user.save();

    // Fetch the user back from the database
    const savedUser = await User.findById(user._id);

    // Check if the email is present
    expect(savedUser.email).toBeDefined(); // Check if email is defined
    expect(savedUser.email).toEqual(user.email); // Check if the email matches
  });

  afterEach(async () => {
    // Clean up: delete the user created during the test
    await User.deleteMany({email: "testuser@example.com"});
  });
});
