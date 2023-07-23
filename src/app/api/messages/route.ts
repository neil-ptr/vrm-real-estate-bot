import { NextRequest } from "next/server";

import { getServerResponse } from "~/utils/serverResponse";
import { connectToDatabase } from "~/utils/mongoDb";
import { Message } from "~/models/message";

import qs from "qs";

connectToDatabase();

export async function GET(req: NextRequest) {
  try {
    const rawParams = req.url.split("?")[1];
    const { chatId } = qs.parse(rawParams);

    if (!chatId) {
      throw new Error("Missing params");
    }

    const messages = await Message.find({ chatId }).sort({
      createdAt: "ascending",
    });

    return getServerResponse(messages);
  } catch (error) {
    return getServerResponse(
      { error: (error as any)?.message },
      {
        status: 500,
      }
    );
  }
}
