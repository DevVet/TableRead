export const GET = async () => {
  return Response.json({ name: "John Doe" }, { status: 200 });
};

export const POST = async (req: Request) => {
  const { first, last } = await req.json();
  return Response.json({ name: `${first} ${last}` });
};
