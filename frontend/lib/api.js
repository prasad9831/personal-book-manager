const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  console.log("=================================");
  console.log("API REQUEST:", url);
  console.log("OPTIONS:", options);
  console.log("=================================");

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  console.log("STATUS:", response.status);
  console.log(
    "CONTENT-TYPE:",
    response.headers.get("content-type")
  );

  // Get response as text first
  const text = await response.text();

  // console.log("SERVER RESPONSE:", text);

  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    console.error(
      "Server returned non-JSON response:",
      text
    );

    throw new Error(
      `Server returned HTML/text instead of JSON. Status: ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};