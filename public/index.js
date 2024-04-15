const URL = "http://localhost:8000/tasks";
const POST = "POST";
const HEADERS = new Headers({
  "Content-Type": "application/json",
});
const publishTask = async () => {
  const writePromise = await fetch(URL, {
    method: POST,
    headers: HEADERS,
    body: JSON.stringify({
      description: document.getElementById("task").value,
    }),
  });
  const response = await writePromise.json();
  console.log(response);
};
