import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import api from "../api/client";

const loginSchema = z.object({
  email: z.email("Невірний формат пошти").min(1, "E-mail обов'язковий"),
  password: z
    .string()
    .min(1, "Пароль обов'язковий")
    .min(8, "Пароль має бути не менше 8 символів"),
});

type ILoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const response = await api.post("/api/login", data);

      const user = response.data;
    } catch (error) {
      console.log("Login error", error);
      setError("root", {
        message: "Не вдалось увійти",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-2 border-blue-500 bg-blue-300 w-[60%] h-[80%] flex flex-col justify-center items-center gap-6 rounded-2xl"
    >
      <h2 className="text-xl font-bold text-center text-white">
        Ласкаво просимо!
      </h2>
      <label htmlFor="email" className="text-lg font-bold text-white">
        E-mail:
      </label>
      <input
        type="email"
        id="email"
        className="border border-blue-500 bg-blue-100 rounded-xl"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-rose-700 font-bold">{errors.email.message}</p>
      )}
      <label htmlFor="password" className="text-lg font-bold text-white">
        Пароль:
      </label>
      <input
        type="password"
        id="password"
        className="border border-blue-500 bg-blue-100 rounded-xl"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-rose-700 font-bold">{errors.password.message}</p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="font-bold bg-blue-950 px-4 py-2 text-lg text-white rounded-xl hover:scale-[1.1] transition-all"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Увійти"}
      </button>
    </form>
  );
}
