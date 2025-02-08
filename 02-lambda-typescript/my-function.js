exports.myFirst = async (event) => {
  console.log("event", event);
  const { body } = event;

  const data = JSON.parse(body);
  const name = data.name;
  const lastname = data.lastname;

  return {
    statusCode: 200,
    body: name,
  };
};
