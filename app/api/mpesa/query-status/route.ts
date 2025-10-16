import { type NextRequest, NextResponse } from "next/server"
import { createMpesaClient } from "@/lib/mpesa-client"
import { validateApiKey, unauthorizedResponse } from "@/lib/auth-middleware"

export async function GET(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const searchParams = request.nextUrl.searchParams

    const thirdPartyReference = searchParams.get("thirdPartyReference")
    const queryReference = searchParams.get("queryReference")
    const serviceProviderCode = searchParams.get("serviceProviderCode")

    // Validate required parameters
    if (!thirdPartyReference || !queryReference || !serviceProviderCode) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INS-20",
            description: "Not All Parameters Provided. Please try again.",
          },
        },
        { status: 400 },
      )
    }

    const client = createMpesaClient()

    const path = `/ipg/v1x/queryTransactionStatus/?input_ThirdPartyReference=${thirdPartyReference}&input_QueryReference=${queryReference}&input_ServiceProviderCode=${serviceProviderCode}`

    const response = await client.makeRequest("GET", 18353, path)

    return NextResponse.json(response, { status: response.statusCode })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INS-1",
          description: "Internal Error",
        },
      },
      { status: 500 },
    )
  }
}
