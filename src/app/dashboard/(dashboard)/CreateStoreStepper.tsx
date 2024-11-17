"use client";

import { Step, Stepper, useStepper } from "@/components/custom/stepper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "@/stores/user-store";
import { useCreateStoreStore } from "@/stores/create-store.store";
import { useMutation } from "@tanstack/react-query";
import { useCreateStore } from "@/hooks/mutations/create-store.mutation";

const steps = [
  { label: "Store Details", description: "Set up your store information" },
  { label: "Store slug", description: "Unique slug for each store" },
  { label: "Product Information", description: "Add your first product" },
];

export default function CreateStoreStepper() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        <Step {...steps[0]}>
          <StoreDetailsForm />
        </Step>
        <Step {...steps[1]}>
          <ConfirmStoreSlugForm />
        </Step>
        <Step {...steps[2]}>
          <ProductInformationForm />
        </Step>
        <SetupComplete />
      </Stepper>
    </div>
  );
}

const StoreDetailsSchema = z.object({
  storeName: z
    .string()
    .min(2, { message: "Store name must be at least 2 characters." }),
  storeDescription: z.string().optional(),
});

function StoreDetailsForm() {
  // create a random color with a nice fitting random accent to use in pattren
  const { setStoreName, setStoreDescription, store } = useCreateStoreStore();

  const { nextStep } = useStepper();
  const form = useForm<z.infer<typeof StoreDetailsSchema>>({
    resolver: zodResolver(StoreDetailsSchema),
    defaultValues: {
      storeName: store.name,
      storeDescription: store.description || "",
    },
  });

  function onSubmit(data: z.infer<typeof StoreDetailsSchema>) {
    nextStep();
    setStoreName(data.storeName);
    setStoreDescription(data.storeDescription);
    toast({ title: "Store details saved!" });
  }

  return (
    <Form {...form}>
      <div className="h-72 w-full heropattern-topography-green-700"></div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Store" {...field} />
              </FormControl>
              <FormDescription>
                This is your store's display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your store..." {...field} />
              </FormControl>
              <FormDescription>
                Briefly describe what your store offers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

const confirmStoreSlugSchema = z.object({
  storeSlug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be only lowercase letters, numbers, and dashes.",
    }),
});

type ConfirmStoreSlugInput = z.infer<typeof confirmStoreSlugSchema>;

function ConfirmStoreSlugForm() {
  const { nextStep } = useStepper();
  const { store } = useCreateStoreStore();

  const form = useForm<ConfirmStoreSlugInput>({
    resolver: zodResolver(confirmStoreSlugSchema),
    defaultValues: { storeSlug: "" },
  });

  const {
    isPending: isSubmitting,
    mutate: createStore,
    error,
  } = useCreateStore({
    onSuccess: () => {
      nextStep();
      toast({ title: "Store slug saved!" });
    },
    onError: () => {
      form.setError("storeSlug", {
        message: `The slug "${form.getValues(
          "storeSlug"
        )}" is already taken. Please choose another one.`,
      });
    },
  });

  async function onSubmit(data: ConfirmStoreSlugInput) {
    try {
      await createStore({
        description: store.description,
        name: store.name,
        slug: data.storeSlug,
      });
    } catch (error) {
      toast({ title: "Error saving store slug" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="storeSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Slug</FormLabel>
              <FormControl>
                <Input placeholder="my-awesome-store" {...field} />
              </FormControl>
              <FormDescription>
                This will be used in your store's URL. Only lowercase letters,
                numbers, and dashes are allowed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions loading={isSubmitting} />
      </form>
    </Form>
  );
}

const ProductInformationSchema = z.object({
  productName: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  productPrice: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Must be a valid number",
  }),
  productCategory: z.string().min(1, { message: "Please select a category." }),
});

function ProductInformationForm() {
  const { nextStep } = useStepper();
  const form = useForm<z.infer<typeof ProductInformationSchema>>({
    resolver: zodResolver(ProductInformationSchema),
    defaultValues: { productName: "", productPrice: "", productCategory: "" },
  });

  function onSubmit(data: z.infer<typeof ProductInformationSchema>) {
    nextStep();
    toast({ title: "Product information saved!" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Awesome Product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="9.99" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

function StepperFormActions({ loading }: { loading?: boolean }) {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();

  return (
    <div className="w-full flex justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" onClick={resetSteps} disabled={loading}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep || loading}
            onClick={prevStep}
            size="sm"
            variant="secondary"
          >
            Back
          </Button>
          <Button size="sm" type="submit" disabled={loading}>
            {loading ? (
              <div>
                <Loader2 className="animate-spin" size={16} />
              </div>
            ) : isLastStep ? (
              "Finish"
            ) : isOptionalStep ? (
              "Skip"
            ) : (
              "Next"
            )}
          </Button>
        </>
      )}
    </div>
  );
}

function SetupComplete() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Congratulations!</h2>
      <p>Your online store is now set up and ready to go.</p>
      <Button onClick={resetSteps}>Set Up Another Store</Button>
    </div>
  );
}
