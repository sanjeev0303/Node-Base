import {z} from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(4, "Password is required")
})


export type LoginFormType = z.infer<typeof loginSchema>
