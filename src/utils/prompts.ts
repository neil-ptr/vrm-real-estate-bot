import characters from "~/constant/characters";
import { options } from "~/constant/metadata";
import {
  BUYER_PROMPT,
  SELLER_PROMPT,
  TENANT_PROMPT,
  JUDGE_PROMPT,
  CHARACTER_BACKGROUND,
  EMOTION_PROMPT,
  COMMAND_PROMPT,
} from "~/constant/prompts";

export const getPrompt = (role: "buyer" | "seller" | "tenant" | "judge") => {
  if (role === "judge") {
    return JUDGE_PROMPT;
  }

  let rolePrompt = "";
  if (role === "buyer") {
    rolePrompt = BUYER_PROMPT;
  } else if (role === "seller") {
    rolePrompt = SELLER_PROMPT;
  } else if (role === "tenant") {
    rolePrompt = TENANT_PROMPT;
  }

  return `${rolePrompt}${CHARACTER_BACKGROUND}${EMOTION_PROMPT}${COMMAND_PROMPT}`;
};

export const getHumanRole = (aiRole?: "buyer" | "seller" | "tenant") => {
  if (aiRole === "buyer") {
    return "buyer agent";
  } else if (aiRole === "seller") {
    return "seller agent";
  }
  return "property manager";
};

export const getCharacterBackground = (role: "buyer" | "seller" | "tenant") => {
  return Object.entries(characters[role].background)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
};

export const getPlaceMetadata = (
  role: "buyer" | "seller" | "tenant",
  metadataId: string
) => {
  const metadata = options.filter((o) => o.role === role);

  if (!metadata?.length) {
    return {};
  }

  const option = metadata.find((m) => m.id === metadataId);

  return option;
};
