async function extractTaskDetails(text) {
  const today = new Date().toISOString().split("T")[0];

  const prompt = `
You are an AI assistant for a Smart Task Management System.

Today's date is ${today}.

The user will speak naturally.

Extract task information.

Return ONLY valid JSON.

{
  "title":"",
  "description":"",
  "category":"",
  "priority":"",
  "dueDate":"",
  "time":""
}

Rules:

1. title should be concise (3-8 words).

2. description should contain the complete task in natural language.

3. Categories allowed:
- Work
- Personal
- Health

If not obvious, choose the closest category.

4. Priority:
- Low
- Medium
- High

If not mentioned use Medium.

5. Convert all dates into YYYY-MM-DD.

Examples:

Tomorrow
Next Monday
Friday
Today

must become

2026-08-08

or any correct date.

6. Convert time into 24-hour format.

Examples

7 PM -> 19:00

5:30 pm -> 17:30

tomorrow morning -> 09:00

tomorrow evening -> 18:00

7. Never leave description empty.

8. If user speaks only a short sentence,
copy the complete sentence into description.

Return ONLY JSON.

User Input:

${text}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(data.error.message);
  }

  let output =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  output = output
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let task = JSON.parse(output);

  // -------- SMART FALLBACKS --------

  if (!task.title || task.title.trim() === "") {
    task.title = text;
  }

  if (!task.description || task.description.trim() === "") {
    task.description = text;
  }

  if (!task.category) {
    task.category = "Personal";
  }

  if (!task.priority) {
    task.priority = "Medium";
  }

  if (!task.time) {
    task.time = "";
  }

  return task;
}

module.exports = {
  extractTaskDetails,
};