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

const steps = [
  { label: "Store Details", description: "Set up your store information" },
  { label: "Product Information", description: "Add your first product" },
  { label: "Payment Setup", description: "Configure payment methods" },
];

export default function OnlineStoreSetup() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        <Step {...steps[0]}>
          <StoreDetailsForm />
        </Step>
        <Step {...steps[1]}>
          <ProductInformationForm />
        </Step>
        <Step {...steps[2]}>
          <PaymentSetupForm />
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
  storeDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
});

function StoreDetailsForm() {
  const { nextStep } = useStepper();
  const form = useForm<z.infer<typeof StoreDetailsSchema>>({
    resolver: zodResolver(StoreDetailsSchema),
    defaultValues: { storeName: "", storeDescription: "" },
  });

  function onSubmit(data: z.infer<typeof StoreDetailsSchema>) {
    nextStep();
    toast({ title: "Store details saved!" });
  }

  return (
    <Form {...form}>
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

const ProductInformationSchema = z.object({
  productName: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  productPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
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

const PaymentSetupSchema = z.object({
  paymentMethod: z
    .string()
    .min(1, { message: "Please select a payment method." }),
});

function PaymentSetupForm() {
  const { nextStep } = useStepper();
  const form = useForm<z.infer<typeof PaymentSetupSchema>>({
    resolver: zodResolver(PaymentSetupSchema),
    defaultValues: { paymentMethod: "" },
  });

  function onSubmit(data: z.infer<typeof PaymentSetupSchema>) {
    nextStep();
    toast({ title: "Payment setup complete!" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose your preferred payment processor.
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

function StepperFormActions() {
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
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="secondary"
          >
            Back
          </Button>
          <Button size="sm" type="submit">
            {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
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
