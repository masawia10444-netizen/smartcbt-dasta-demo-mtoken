function parseJsonString(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function unwrapError(error: unknown): unknown {
  if (typeof error === "string") {
    const parsed = parseJsonString(error);
    return parsed ?? error;
  }

  if (error instanceof Error) {
    const parsed = parseJsonString(error.message);
    return parsed ?? error;
  }

  return error;
}

export function extractErrorCode(error: unknown): string | null {
  const value = unwrapError(error);

  if (!value || typeof value !== "object") return null;

  const errors = (value as { errors?: Array<{ extensions?: { code?: string } }> }).errors;
  const code = errors?.[0]?.extensions?.code;

  return typeof code === "string" ? code : null;
}

export function extractErrorMessage(error: unknown, fallback = ""): string {
  const value = unwrapError(error);

  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  if (value instanceof Error) {
    return extractErrorMessage(value.message, fallback);
  }

  if (!value || typeof value !== "object") {
    return fallback;
  }

  const directusErrors = (value as { errors?: Array<{ message?: string }> }).errors;
  if (Array.isArray(directusErrors) && typeof directusErrors[0]?.message === "string") {
    return directusErrors[0].message;
  }

  const message = (value as { message?: unknown }).message;
  if (typeof message === "string") {
    return extractErrorMessage(message, fallback);
  }

  const nestedError = (value as { error?: unknown }).error;
  if (nestedError) {
    return extractErrorMessage(nestedError, fallback);
  }

  return fallback;
}

export function extractAuthErrorMessage(error: unknown, fallback = "เข้าสู่ระบบไม่สำเร็จ"): string {
  const errorCode = extractErrorCode(error);

  if (errorCode === "INVALID_CREDENTIALS") {
    return "อีเมล/เบอร์โทรศัพท์ หรือรหัสผ่านไม่ถูกต้อง";
  }

  return extractErrorMessage(error, fallback);
}
