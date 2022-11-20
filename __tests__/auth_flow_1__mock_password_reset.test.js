const axios = require("axios");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

const API_HOST = `http://localhost:3001`;

describe("Auth flow 1 w/ mock password reset", () => {
  var verificationToken;
  var resetPasswordToken;

  test("Sign Up", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
      password: "123",
      name: "tad",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/signUp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Sign In Before Verification Should Fail", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
      password: "123",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/signIn`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
      validateStatus: false,
    };

    const response = await client(config);

    expect(response.status).toBe(404);
  });

  test("Check If Authenticated", async () => {
    let config = {
      method: "get",
      url: `${API_HOST}/auth-api/isAuthed`,
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(401);
  });

  test("Mock Receive Verification Token", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/mockReceiveVerificationToken`,
      validateStatus: false,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    let response = await client(config);

    verificationToken = response.data;

    expect(response.status).toBe(200);
  });

  test("Verify Account", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
      verificationToken: verificationToken,
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/verifyAccount`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Verify Account With Same Token Should Fail", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
      verificationToken: verificationToken,
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/verifyAccount`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(404);
  });

  test("Sign In After Verification", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
      password: "123",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/signIn`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Check If Authenticated", async () => {
    let config = {
      method: "get",
      url: `${API_HOST}/auth-api/isAuthed`,
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Sign Out", async () => {
    let config = {
      method: "delete",
      url: `${API_HOST}/auth-api/signOut`,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Mock Request Password Reset", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/mockRequestPasswordReset`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let response = await client(config);

    expect(response.status).toBe(200);

    resetPasswordToken = response.data.resetToken;
  });

  test("Reset Password", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
      resetPasswordToken: resetPasswordToken,
      newPassword: "abc",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/resetPassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Reset Password Should Fail", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
      resetPasswordToken: resetPasswordToken,
      newPassword: "abc",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/resetPassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(404);
  });

  test("Sign Out Should Fail", async () => {
    let config = {
      method: "delete",
      url: `${API_HOST}/auth-api/signOut`,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(401);
  });

  test("Sign In Again", async () => {
    var data = JSON.stringify({
      email: "t@t.com",
      password: "abc",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/signIn`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Sign Out", async () => {
    let config = {
      method: "delete",
      url: `${API_HOST}/auth-api/signOut`,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Check If Authenticated Should Fail", async () => {
    let config = {
      method: "get",
      url: `${API_HOST}/auth-api/isAuthed`,
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(401);
  });

  test("Sign In Again After Signing Out", async () => {
    let data = JSON.stringify({
      email: "t@t.com",
      password: "abc",
    });

    let config = {
      method: "post",
      url: `${API_HOST}/auth-api/signIn`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Delete Account", async () => {
    let config = {
      method: "delete",
      url: `${API_HOST}/auth-api/deleteAccount`,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(200);
  });

  test("Check If Authenticated Should Fail", async () => {
    let config = {
      method: "get",
      url: `${API_HOST}/auth-api/isAuthed`,
      validateStatus: false,
    };

    let response = await client(config);

    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    var config = {
      method: "delete",
      url: `${API_HOST}/auth-api/accounts`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await client(config);
  });
});
