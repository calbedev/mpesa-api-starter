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

    const customerMSISDN = searchParams.get("customerMSISDN")
    const thirdPartyReference = searchParams.get("thirdPartyReference")
    const serviceProviderCode = searchParams.get("serviceProviderCode")

    // Validate required parameters
    if (!customerMSISDN || !thirdPartyReference || !serviceProviderCode) {
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

    const path = `/ipg/v1x/queryCustomerName/?input_CustomerMSISDN=${customerMSISDN}&input_ThirdPartyReference=${thirdPartyReference}&input_ServiceProviderCode=${serviceProviderCode}`

    const response = await client.makeRequest("GET", 19323, path)

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
