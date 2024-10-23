import * as yup from "yup";
import { FastField, Formik, ErrorMessage, Field } from "formik";
import {
    Check,
    CheckCheck,
    ChevronsLeft,
    ChevronsRight,
    FilePlus2,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/Form/Select";
import { Input } from "@/Components/Form/Input";
import { Button } from "@/Components/Button";
import { Label } from "@/Components/Form/Label";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { TextArea } from "@/Components/Form/TextArea";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper method to calculate progress percentage
const calculateStepProgress = (data, fields) => {
    const filledFields = fields.filter((field) => data[field] !== "");
    return (filledFields.length / fields.length) * 100;
};

const IntakeCreatePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState([0, 0, 0]);
    const [data, setData] = useState({
        lead: "",
        name: "",
        company: "",
        website: "",
        email: "",
        phone: "",
        status: "",
        type: "",
        agent: "",
        plan: "",
        lead_note: "",
        card_holder_name: "",
        street: "",
        street_two: "",
        city: "",
        state: "",
        postal: "",
        lead_profile_note: "",
        billing_note: "",
        final_proposal: "",
        pre_sale_email_history: "",
        cc_authorization: "",
    });

    const handleNextStep = (newData, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));

        if (final) {
            // Post request on final step
            return;
        }

        setCurrentStep((prev) => prev + 1);
    };

    const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
        setCurrentStep((prev) => prev - 1);
    };

    // Use useCallback to memoize the function and prevent unnecessary re-renders
    const setStepProgress = useCallback((index, value) => {
        setProgress((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[index] = isNaN(value) ? 0 : value;
            return newProgress;
        });
    }, []);

    // Define animation variants for steps
    const stepVariants = {
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 5 },
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    };

    // All Steps
    const steps = [
        {
            title: "Lead",
            component: (
                <StepOne
                    next={handleNextStep}
                    data={data}
                    setProgress={(progress) => setStepProgress(0, progress)}
                />
            ),
        },
        {
            title: "Billing",
            component: (
                <StepTow
                    next={handleNextStep}
                    prev={handlePrevStep}
                    data={data}
                    setProgress={(progress) => setStepProgress(1, progress)}
                />
            ),
        },
        {
            title: "Finish",
            component: (
                <StepFinish
                    next={handleNextStep}
                    prev={handlePrevStep}
                    data={data}
                    setProgress={(progress) => setStepProgress(2, progress)}
                />
            ),
        },
    ];

    return (
        <>
            <div className="rounded-lg bg-white border">
                <h1 className="px-6 py-4 text-xl font-medium border-b">
                    Create Intake
                </h1>

                <div className="p-6">
                    {/* Timeline */}
                    <div className="max-w-xl flex items-center justify-between my-6 mx-auto">
                        {steps.map((step, index) => {
                            const isFinalStep = index === steps.length - 1;
                            const isCurrentStep = index === currentStep;
                            const progressValue = isFinalStep
                                ? isCurrentStep
                                    ? 100
                                    : 0
                                : progress[index] || 0;
                            const progressAngle = (progressValue / 100) * 360;

                            return (
                                <div
                                    key={index}
                                    className={`flex-1 flex flex-col gap-2 ${
                                        index < steps.length - 1 ? "pr-4" : ""
                                    }`}
                                >
                                    <div className="flex items-center">
                                        {/* Step Circle & Title */}
                                        <div
                                            className="relative size-20 flex items-center justify-center rounded-full after:absolute after:content-[''] after:size-[70px] after:rounded-full after:bg-white"
                                            style={{
                                                background: `conic-gradient(${
                                                    isFinalStep &&
                                                    !isCurrentStep
                                                        ? "#e5e7eb"
                                                        : "#22c55e"
                                                } ${progressAngle}deg, #e5e7eb 0deg)`,
                                            }}
                                        >
                                            {isFinalStep ? (
                                                isCurrentStep ? (
                                                    <CheckCheck className="z-10 text-green-500 size-8" />
                                                ) : (
                                                    <CheckCheck className="z-10 text-slate-400 size-8" />
                                                )
                                            ) : (
                                                <span className="z-10 text-slate-500 text-xl font-medium">
                                                    {`${Math.round(
                                                        progressValue
                                                    )}%`}
                                                </span>
                                            )}
                                        </div>
                                        {/* Line between steps */}
                                        {index < steps.length - 1 && (
                                            <div className="flex-grow border-t-2 border-slate-300 ml-4"></div>
                                        )}
                                    </div>
                                    <p className="w-20 text-center">
                                        {step.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Forms */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {steps[currentStep].component}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

// Step 1
const StepOne = ({ data, next, setProgress }) => {
    const stepOneFields = [
        "lead",
        "name",
        "company",
        "website",
        "email",
        "phone",
        "status",
        "type",
        "agent",
        "plan",
        "lead_note",
    ];

    return (
        <Formik
            initialValues={data}
            validateOnBlur={false}
            validationSchema={yup.object({
                lead: yup.string().required("Lead is required"),
                name: yup.string().required("Name is required"),
                company: yup.string().optional(),
                website: yup.string().optional(),
                email: yup.string().email().required("Email is required"),
                phone: yup.string().required("Phone number is required"),
                status: yup.string().required("Status is required"),
                type: yup.string().required("Type is required"),
                agent: yup.string().required("Agent is required"),
                plan: yup.string().required("Plan is required"),
                lead_note: yup.string().optional(),
            })}
            onSubmit={(values, { setSubmitting }) => {
                next(values);
                setSubmitting(false);
            }}
        >
            {({ handleSubmit, isSubmitting, values }) => {
                useEffect(() => {
                    const progress = calculateStepProgress(
                        values,
                        stepOneFields
                    );
                    setProgress(progress);
                }, [values]);

                return (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <fieldset
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            disabled={isSubmitting}
                        >
                            <FastField name="lead">
                                {({ field, form }) => (
                                    <div className="space-y-1.5 col-span-3">
                                        <Label>Lead</Label>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                );
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Lead" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="lead_1">
                                                    Lead 1
                                                </SelectItem>
                                                <SelectItem value="lead_2">
                                                    Lead 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <ErrorMessage
                                            component="p"
                                            name="lead"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="name">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Name</Label>
                                        <Input
                                            placeholder="Full Name"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="name"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="company">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Company</Label>
                                        <Input
                                            placeholder="Company Name"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="company"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="website">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Website</Label>
                                        <Input
                                            placeholder="Website Link"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="website"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="email">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Email</Label>
                                        <Input placeholder="Email" {...field} />
                                        <ErrorMessage
                                            component="p"
                                            name="email"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="phone">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Phone Number</Label>
                                        <Input
                                            placeholder="Phone number"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="phone"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="status">
                                {({ field, form }) => (
                                    <div className="space-y-1.5">
                                        <Label>Status</Label>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                );
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    Inactive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <ErrorMessage
                                            component="p"
                                            name="status"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="type">
                                {({ field, form }) => (
                                    <div className="space-y-1.5">
                                        <Label>Type</Label>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                );
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Type 1
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    Type 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <ErrorMessage
                                            component="p"
                                            name="type"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="agent">
                                {({ field, form }) => (
                                    <div className="space-y-1.5">
                                        <Label>Agent</Label>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                );
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Agent" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Agent 1
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    Agent 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <ErrorMessage
                                            component="p"
                                            name="agent"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="plan">
                                {({ field, form }) => (
                                    <div className="space-y-1.5">
                                        <Label>Plan</Label>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    value
                                                );
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Plan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="plan_1">
                                                    Plan 1
                                                </SelectItem>
                                                <SelectItem value="plan_2">
                                                    Plan 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <ErrorMessage
                                            component="p"
                                            name="plan"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <FastField name="lead_note">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Note</Label>
                                        <TextArea
                                            placeholder="Note"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="lead_note"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>
                            <div className="col-span-3 text-right">
                                <Button type="submit">
                                    <span>Next Step</span>
                                    <ChevronsRight className="size-5" />
                                </Button>
                            </div>
                        </fieldset>
                    </form>
                );
            }}
        </Formik>
    );
};

// Step 2
const StepTow = ({ data, next, prev, setProgress }) => {
    const stepTwoFields = [
        "card_holder_name",
        "street",
        "street_two",
        "city",
        "state",
        "postal",
        "lead_profile_note",
        "billing_note",
        "final_proposal",
        "pre_sale_email_history",
        "cc_authorization",
    ];

    return (
        <Formik
            initialValues={data}
            validateOnBlur={false}
            validationSchema={yup.object({
                card_holder_name: yup
                    .string()
                    .required()
                    .label("Card holder name"),
                street: yup.string().required(),
                street_two: yup.string().optional(),
                city: yup.string().required(),
                state: yup.string().required(),
                postal: yup.string().required(),
                lead_profile_note: yup
                    .string()
                    .optional()
                    .label("Lead profile note"),
                note: yup.string().optional(),
                final_proposal: yup.string().optional().label("Final proposal"),
                pre_sale_email_history: yup
                    .string()
                    .optional()
                    .label("Pre-Sale email history"),
                cc_authorization: yup
                    .string()
                    .optional()
                    .label("CC Authorization"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                next(values);
                setSubmitting(false);
            }}
        >
            {({ handleSubmit, isSubmitting, values }) => {
                useEffect(() => {
                    const progress = calculateStepProgress(
                        values,
                        stepTwoFields
                    );
                    setProgress(progress);
                }, [values]);

                return (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <fieldset
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            disabled={isSubmitting}
                        >
                            <FastField name="card_holder_name">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Card Holder Name</Label>
                                        <Input
                                            placeholder="Card Holder Name"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="card_holder_name"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>

                            <FastField name="street">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Street</Label>
                                        <Input
                                            placeholder="Street"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="street"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>

                            <FastField name="street_two">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Street 2</Label>
                                        <Input
                                            placeholder="Street 2"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="street_two"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>

                            <FastField name="city">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>City</Label>
                                        <Input placeholder="City" {...field} />
                                        <ErrorMessage
                                            component="p"
                                            name="city"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>

                            <FastField name="state">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>State</Label>
                                        <Input placeholder="State" {...field} />
                                        <ErrorMessage
                                            component="p"
                                            name="state"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>

                            <FastField name="postal">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Postal</Label>
                                        <Input
                                            placeholder="Postal Code"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="postal"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>

                            <FastField name="lead_profile_note">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Lead Profile Note</Label>
                                        <TextArea
                                            placeholder="Lead Profile Note"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="lead_profile_note"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>

                            <FastField name="billing_note">
                                {({ field }) => (
                                    <div className="space-y-1.5">
                                        <Label>Note</Label>
                                        <TextArea
                                            placeholder="note"
                                            {...field}
                                        />
                                        <ErrorMessage
                                            component="p"
                                            name="billing_note"
                                            className="block text-sm text-red-500"
                                        />
                                    </div>
                                )}
                            </FastField>

                            <div className="col-span-3 space-y-4">
                                <FastField name="final_proposal">
                                    {({ field }) => (
                                        <div className="flex gap-4 items-center">
                                            <Label className="whitespace-nowrap">
                                                Final Proposal
                                            </Label>
                                            <label className="flex items-center justify-center border border-dashed h-10 w-36 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 group">
                                                <input
                                                    type="file"
                                                    {...field}
                                                    className="hidden"
                                                />
                                                <div className="flex items-center gap-1 text-slate-500">
                                                    <FilePlus2 className="size-5 stroke-[1.5]" />
                                                    <span>Add file</span>
                                                </div>
                                            </label>
                                            <ErrorMessage
                                                component="p"
                                                name="final_proposal"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>

                                <FastField name="pre_sale_email_history">
                                    {({ field }) => (
                                        <div className="flex gap-4 items-center">
                                            <Label className="whitespace-nowrap">
                                                Pre-Sale Email History
                                            </Label>
                                            <label className="flex items-center justify-center border border-dashed h-10 w-36 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 group">
                                                <input
                                                    type="file"
                                                    {...field}
                                                    className="hidden"
                                                />
                                                <div className="flex items-center gap-1 text-slate-500">
                                                    <FilePlus2 className="size-5 stroke-[1.5]" />
                                                    <span>Add file</span>
                                                </div>
                                            </label>
                                            <ErrorMessage
                                                component="p"
                                                name="pre_sale_email_history"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>

                                <FastField name="cc_authorization">
                                    {({ field }) => (
                                        <div className="flex gap-4 items-center">
                                            <Label className="whitespace-nowrap">
                                                CC Authorization
                                            </Label>
                                            <label className="flex items-center justify-center border border-dashed h-10 w-36 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 group">
                                                <input
                                                    type="file"
                                                    {...field}
                                                    className="hidden"
                                                />
                                                <div className="flex items-center gap-1 text-slate-500">
                                                    <FilePlus2 className="size-5 stroke-[1.5]" />
                                                    <span>Add file</span>
                                                </div>
                                            </label>
                                            <ErrorMessage
                                                component="p"
                                                name="cc_authorization"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                            </div>

                            <div className="col-span-3 flex items-center gap-3 justify-end">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => prev(values)}
                                >
                                    <ChevronsLeft className="size-5" />
                                    <span>Previous Step</span>
                                </Button>
                                <Button type="submit">
                                    <span>Next Step</span>
                                    <ChevronsRight className="size-5" />
                                </Button>
                            </div>
                        </fieldset>
                    </form>
                );
            }}
        </Formik>
    );
};

// Step Finish
const StepFinish = ({ data, next, prev }) => {
    return (
        <div className="grid place-items-center gap-8">
            <div className="flex items-center gap-3 min-h-72">
                <div className="flex items-center justify-center bg-emerald-500 size-14 rounded-full text-white">
                    <Check className="size-10" />
                </div>
                <p className="text-4xl text-slate-700">You are done</p>
            </div>
            <div className="flex items-center justify-center gap-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        prev(data);
                        next(data, true);
                    }}
                >
                    <ChevronsLeft className="size-5" />
                    <span>Previous Step</span>
                </Button>
                <Button type="submit">
                    <CheckCheck className="size-5" />
                    <span>Finish</span>
                </Button>
            </div>
        </div>
    );
};

export default IntakeCreatePage;
