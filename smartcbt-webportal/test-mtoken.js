// Test mToken login directly
const appId = "fd69ea74-590e-442f-ac8c-a71a93a42d0a";
const mToken = "26fcfdd749444a4dbc67297de74349b6";
const appCode = "PORTAL";

async function testMToken() {
  try {
    const response = await fetch("http://localhost:3000/th/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appId,
        mToken,
        appCode,
      }),
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testMToken();
