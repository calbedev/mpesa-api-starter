import { type NextRequest, NextResponse } from "next/server"

export function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key")
  const expectedKey = process.env.API_SECRET_KEY

  if (!apiKey || !expectedKey) {
    return false
  }

  return apiKey === expectedKey
}

export function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "AUTH-001",
        message: "Unauthorized. Invalid or missing API key.",
      },
    },
    { status: 401 },
  )
}
