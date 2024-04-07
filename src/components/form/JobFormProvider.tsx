import React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

type JobFormProviderProps<T extends FieldValues> = {
  children: React.ReactNode;
  onSubmit: () => void;
  methods: UseFormReturn<T>;
  display?: string;
};

function JobFormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  display,
}: JobFormProviderProps<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} style={{ display: display }}>
        {children}
      </form>
    </FormProvider>
  );
}

export default JobFormProvider;
