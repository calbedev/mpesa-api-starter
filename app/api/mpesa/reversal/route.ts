import { type NextRequest, NextResponse } from "next/server"
import { createMpesaClient } from "@/lib/mpesa-client"
import { validateApiKey, unauthorizedResponse } from "@/lib/auth-middleware"

export async function PUT(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return unauthorizedResponse()
  }

  try {
    const body = await request.json()

    const {
      transactionID,
      securityCredential,
      initiatorIdentifier,
      thirdPartyReference,
      serviceProviderCode,
      reversalAmount,
    } = body

    // Validate required parameters
    if (!transactionID || !securityCredential || !initiatorIdentifier || !thirdPartyReference || !serviceProviderCode) {
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

    const mpesaData: any = {
      input_TransactionID: transactionID,
      input_SecurityCredential: securityCredential,
      input_InitiatorIdentifier: initiatorIdentifier,
      input_ThirdPartyReference: thirdPartyReference,
      input_ServiceProviderCode: serviceProviderCode,
    }

    // Optional parameter
    if (reversalAmount) {
      mpesaData.input_ReversalAmount = reversalAmount
    }

    const response = await client.makeRequest("PUT", 18354, "/ipg/v1x/reversal/", mpesaData)

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
