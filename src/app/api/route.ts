export function GET() {
  return new Response(
    JSON.stringify({
      hello: "world",
    })
  );
}

export function POST() {}
