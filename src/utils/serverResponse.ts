import { NextResponse } from "next/server";

export const getServerResponse = (
  data: any,
  options?: {
    status?: number;
    headers?: any;
  }
) => {
  const { status, headers } = options || {};

  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
};
