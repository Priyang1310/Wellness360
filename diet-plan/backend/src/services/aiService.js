import fetch from "node-fetch";

export const getAIResponse = async (content) => {
    content =
        content +
        "generate this response in proper structure and also you can do fomatting and also do pointwise structuring";
    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.3-70b-instruct:free",
                messages: [{ role: "user", content }],
            }),
        }
    );
    console.log(response);
    if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
};
