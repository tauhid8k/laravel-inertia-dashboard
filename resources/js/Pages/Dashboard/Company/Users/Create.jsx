import { FastField, Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { Input } from "@/Components/Form/Input";
import { Button } from "@/Components/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/Form/Select";
import { Label } from "@/Components/Form/Label";
import { useState } from "react";
import { Pencil, Trash, UserRound } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const CompanyCreateUserPage = () => {
    const [preview, setPreview] = useState(null);

    return (
        <div className="rounded-lg bg-white border">
            <h1 className="px-6 py-4 text-xl font-medium border-b">
                Create User
            </h1>
            <div className="p-6">
                <Formik
                    initialValues={{
                        profile_img: null,
                        role: "",
                        first_name: "",
                        last_name: "",
                        job_title: "",
                        phone: "",
                        password: "",
                        email: "",
                        secondary_email: "",
                        username: "",
                        address_line: "",
                        address_line_two: "",
                        city: "",
                        state: "",
                        postal_code: "",
                        country: "",
                        gender: "",
                        birthday: "",
                        skype: "",
                        color_profile: "",
                    }}
                    validationSchema={yup.object({
                        profile_img: yup.mixed().nullable(),
                        role: yup.string().required("Role is required"),
                        first_name: yup
                            .string()
                            .required("First name is required"),
                        last_name: yup
                            .string()
                            .required("Last name is required"),
                        username: yup.string().required("Username is required"),
                        password: yup
                            .string()
                            .min(8)
                            .required("Password is required"),
                        email: yup
                            .string()
                            .email("Email is invalid")
                            .required("Email is required"),
                        secondary_email: yup
                            .string()
                            .email("Email is invalid")
                            .optional(),
                        phone: yup
                            .string()
                            .required("Phone number is required"),
                        job_title: yup
                            .string()
                            .required("Job title is required"),
                        address_line: yup
                            .string()
                            .required("Address line 1 is required"),
                        address_line_two: yup.string().optional(),
                        city: yup.string().required("City is required"),
                        state: yup.string().required("State is required"),
                        postal_code: yup
                            .string()
                            .required("Postal code is required"),
                        country: yup.string().required("Country is required"),
                        gender: yup
                            .string()
                            .required("Gender is required")
                            .oneOf(["male", "female", "other"]),
                        birthday: yup.date().required("Birth date is required"),
                        skype: yup.string().optional(),
                        color_profile: yup
                            .string()
                            .required("Preferred color is required"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                console.log(values);
                                resolve();
                                setSubmitting(false);
                            }, 3000);
                        });
                    }}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <fieldset
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                disabled={isSubmitting}
                            >
                                <Field name="profile_img">
                                    {({ field, form }) => (
                                        <div className="space-y-1.5 col-span-3">
                                            <div className="flex flex-col items-center mx-auto gap-3 relative w-fit select-none">
                                                <Label className="flex items-center justify-center size-36 bg-slate-100 rounded-full overflow-hidden border group ring-2 ring-offset-2">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        name="profile_img"
                                                        onChange={(event) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                event.target
                                                                    .files[0]
                                                            );
                                                            const reader =
                                                                new FileReader();
                                                            reader.readAsDataURL(
                                                                event.target
                                                                    .files[0]
                                                            );
                                                            reader.onload = (
                                                                e
                                                            ) => {
                                                                setPreview(
                                                                    e.target
                                                                        .result
                                                                );
                                                            };
                                                        }}
                                                        className="hidden"
                                                    />
                                                    <UserRound className="size-20 stroke-1 text-slate-400" />
                                                    {preview && (
                                                        <img
                                                            src={preview}
                                                            alt="profile avatar"
                                                        />
                                                    )}
                                                </Label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (preview) {
                                                            form.setFieldValue(
                                                                "profile_img",
                                                                null
                                                            );
                                                            setPreview(null);
                                                        }
                                                    }}
                                                    className={cn(
                                                        "absolute right-0 bottom-[10px] z-10 rounded-full p-2 flex items-center justify-center text-white",
                                                        {
                                                            "bg-red-500":
                                                                preview,
                                                            "bg-blue-400 pointer-events-none":
                                                                !preview,
                                                        }
                                                    )}
                                                >
                                                    {preview ? (
                                                        <Trash className="size-4" />
                                                    ) : (
                                                        <Pencil className="size-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <ErrorMessage
                                                component="p"
                                                name="profile_img"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </Field>
                                <FastField name="role">
                                    {({ field, form }) => (
                                        <div className="space-y-1.5">
                                            <Label>Role</Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        value
                                                    );
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="admin">
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value="user">
                                                        User
                                                    </SelectItem>
                                                    <SelectItem value="staff">
                                                        Staff
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <ErrorMessage
                                                component="p"
                                                name="role"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>

                                <FastField name="first_name">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>First Name</Label>
                                            <Input
                                                placeholder="First name"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="first_name"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="last_name">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Last Name</Label>
                                            <Input
                                                placeholder="Last name"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="last_name"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="email">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Email</Label>
                                            <Input
                                                placeholder="Email"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="email"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="secondary_email">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Email (Other)</Label>
                                            <Input
                                                placeholder="Email (Other)"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="secondary_email"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="username">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Username</Label>
                                            <Input
                                                placeholder="Username"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="username"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="password">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Password</Label>
                                            <Input
                                                placeholder="Password"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="password"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="address_line">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Address line 1</Label>
                                            <Input
                                                placeholder="Address line 1"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="address_line"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="address_line_two">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Address line 2</Label>
                                            <Input
                                                placeholder="Address line 2"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="address_line_two"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="city">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>City</Label>
                                            <Input
                                                placeholder="City"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="State"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="state"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="postal_code">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Postal Code</Label>
                                            <Input
                                                placeholder="Postal code"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="postal_code"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="country">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Country</Label>
                                            <Input
                                                placeholder="country"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="country"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="gender">
                                    {({ field, form }) => (
                                        <div className="space-y-1.5">
                                            <Label>Gender</Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        value
                                                    );
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem value="female">
                                                        Female
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <ErrorMessage
                                                component="p"
                                                name="gender"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="birthday">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Birth Date</Label>
                                            <Input
                                                type="date"
                                                placeholder="Birth Date"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="birthday"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="skype">
                                    {({ field }) => (
                                        <div className="space-y-1.5">
                                            <Label>Skype</Label>
                                            <Input
                                                placeholder="Skype"
                                                {...field}
                                            />
                                            <ErrorMessage
                                                component="p"
                                                name="skype"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <FastField name="color_profile">
                                    {({ field, form }) => (
                                        <div className="space-y-1.5 col-span-3">
                                            <Label>Color Profile</Label>
                                            <RadioGroup.Root
                                                onValueChange={(value) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        value
                                                    )
                                                }
                                                className="relative flex gap-3 items-center"
                                            >
                                                <RadioGroup.Item
                                                    value="black"
                                                    className="aspect-square size-9 rounded-full ring-2 ring-transparent ring-offset-2 bg-black data-[state=checked]:ring-black"
                                                />
                                                <RadioGroup.Item
                                                    value="orange"
                                                    className="aspect-square size-9 rounded-full ring-2 ring-transparent ring-offset-2 bg-orange-500 data-[state=checked]:ring-orange-500"
                                                />
                                                <RadioGroup.Item
                                                    value="blue"
                                                    className="aspect-square size-9 rounded-full ring-2 ring-transparent ring-offset-2 bg-blue-500 data-[state=checked]:ring-blue-500"
                                                />
                                                <RadioGroup.Item
                                                    value="emerald"
                                                    className="aspect-square size-9 rounded-full ring-2 ring-transparent ring-offset-2 bg-emerald-500 data-[state=checked]:ring-emerald-500"
                                                />
                                                <RadioGroup.Item
                                                    value="cyan"
                                                    className="aspect-square size-9 rounded-full ring-2 ring-transparent ring-offset-2 bg-cyan-500 data-[state=checked]:ring-cyan-500"
                                                />
                                                <RadioGroup.Item
                                                    value="yellow"
                                                    className="aspect-square size-9 rounded-full ring-2 ring-transparent ring-offset-2 bg-yellow-500 data-[state=checked]:ring-yellow-500"
                                                />
                                                <RadioGroup.Item
                                                    value="violet"
                                                    className="aspect-square size-9 rounded-full ring-2 ring-transparent ring-offset-2 bg-violet-500 data-[state=checked]:ring-violet-500"
                                                />
                                            </RadioGroup.Root>
                                            <ErrorMessage
                                                component="p"
                                                name="color_profile"
                                                className="block text-sm text-red-500"
                                            />
                                        </div>
                                    )}
                                </FastField>
                                <div className="col-span-3 text-right">
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Saving..."
                                            : "Save User"}
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CompanyCreateUserPage;
