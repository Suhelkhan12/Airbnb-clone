/* eslint-disable @typescript-eslint/no-explicit-any */
export type actionType = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string; status: "success" | "warning" }>;
