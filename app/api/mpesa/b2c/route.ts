import { type NextRequest, NextResponse } from "next/server"
import { createMpesaClient } from "@/lib/mpesa-client"
import { validateApiKey, unauthorizedResponse } from "@/lib/auth-middleware"

export async function POST(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()

    const { transactionReference, customerMSISDN, amount, thirdPartyReference, serviceProviderCode } = body

    // Validate required parameters
    if (!transactionReference || !customerMSISDN || !amount || !thirdPartyReference || !serviceProviderCode) {
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

    const mpesaData = {
      input_TransactionReference: transactionReference,
      input_CustomerMSISDN: customerMSISDN,
      input_Amount: amount,
      input_ThirdPartyReference: thirdPartyReference,
      input_ServiceProviderCode: serviceProviderCode,
    }

    const response = await client.makeRequest("POST", 18345, "/ipg/v1x/b2cPayment/", mpesaData)

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
