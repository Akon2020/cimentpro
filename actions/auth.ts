// import { db } from '@/lib/db'
// import { SignupFormSchema, FormState, FormData } from '@/lib/definitions'
// import bcrypt from "bcrypt"

import { FormData } from "@/lib/definitions";

// export async function signup(formData: FormData) {
//   // Validate form fields
//   const validatedFields = SignupFormSchema.safeParse({
//     name: "formData.get('name')",
//     email: "formData.get('email')",
//     password: "formData.get('password')",
//   })
 
//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     }
//   }
 
//   const { name, email, password } = validatedFields.data
//   // e.g. Hash the user's password before storing it
//   const hashedPassword = await bcrypt.hash(password, 10)
 
//   // 3. Insert the user into the database or call an Auth Library's API
//   const data = await db.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       }
//     })
//     // .returning({ id: users.id })
 
//   // const user = data[0]
 
//   // if (!user) {
//   //   return {
//   //     message: 'An error occurred while creating your account.',
//   //   }
//   // }

// }

// export async function dig(formData: FormData) {
//   console.log(formData);  
// }


export function signin(formData: FormData) {
  // console.log(formData)
}

