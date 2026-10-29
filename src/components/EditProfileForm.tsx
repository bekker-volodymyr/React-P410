import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

const editProfileScheme = z.object({
  socials: z.array(
    z.object({
      name: z.string().min(1, "Назва обов'язкова"),
      url: z.url().min(1, "Посилання обов'язкове"),
    }),
  ),
});

type IEditProfileForm = z.infer<typeof editProfileScheme>;

export default function EditProfileFrom() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IEditProfileForm>({
    resolver: zodResolver(editProfileScheme),
    defaultValues: {
      socials: [{ name: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const onSubmit: SubmitHandler<IEditProfileForm> = (data) => {
    console.log("New profile data: ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-blue-500 rounded-sm flex flex-col justify-center gap-4"
    >
      <h2 className="text-white text-2xl font-bold text-center">
        Редагувати профіль
      </h2>

      <h3 className="text-white text-xl font-bold">Соціальні мережі</h3>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col">
            <input
              type="text"
              placeholder="Назва (наприклад, Instagram)"
              className="border border-blue-500 bg-blue-100 rounded-xl"
              {...register(`socials.${index}.name`)}
            />
            <input
              type="text"
              placeholder="Посилання на акаунт"
              className="border border-blue-500 bg-blue-100 rounded-xl"
              {...register(`socials.${index}.url`)}
            />
            {fields.length > 1 && (
              <button onClick={() => remove(index)}>
                <X />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => append({ name: "", url: "" })}
          className="bg-blue-950 px-4 py-2 text-lg text-white rounded-xl hover:scale-[1.1] transition-all"
        >
          Додати
        </button>
      </div>

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
