console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
const API_URL = `${import.meta.env.VITE_API_URL}/ai`;
export const aiService = {
  extractTask: async (text) => {
    const response = await fetch(`${API_URL}/extract-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("AI request failed");
    }

    return response.json();
  },
};
