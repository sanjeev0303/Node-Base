import {z} from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(2, "Name length must be greater than 2 digits."),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(4, "Password is required"),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"]
})


export type RegisterFormType = z.infer<typeof RegisterSchema>
