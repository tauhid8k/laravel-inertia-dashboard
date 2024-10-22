import * as yup from "yup";
import { FastField, Formik, ErrorMessage, Field } from "formik";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/Dialog";
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
import { TextArea } from "../../../../Components/Form/TextArea";

const SalesLeadPage = () => {
    return (
        <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl">Leads</h2>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="size-5" />
                        <span>Create New</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Lead Form</DialogTitle>
                        <DialogDescription>
                            Capture potential customer details for follow-up and
                            lead qualification.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Formik
                            initialValues={{
                                name: "",
                                company: "",
                                website: "",
                                email: "",
                                phone: "",
                                status: "",
                                type: "",
                                agent: "",
                                note: "",
                            }}
                            validateOnBlur={false}
                            validationSchema={yup.object({
                                name: yup.string().required("Name is required"),
                                company: yup.string().optional(),
                                website: yup.string().optional(),
                                email: yup
                                    .string()
                                    .email()
                                    .required("Email is required"),
                                phone: yup
                                    .string()
                                    .required("Phone number is required"),
                                status: yup
                                    .string()
                                    .required("Status is required"),
                                type: yup.string().required("Type is required"),
                                agent: yup
                                    .string()
                                    .required("Agent is required"),
                                note: yup.string().optional(),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                            }}
                        >
                            {({ handleSubmit, isSubmitting }) => {
                                return (
                                    <form
                                        onSubmit={handleSubmit}
                                        autoComplete="off"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
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
                                            <FastField name="phone">
                                                {({ field }) => (
                                                    <div className="space-y-1.5">
                                                        <Label>
                                                            Phone Number
                                                        </Label>
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
                                                            onValueChange={(
                                                                value
                                                            ) => {
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
                                                            onValueChange={(
                                                                value
                                                            ) => {
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
                                                            onValueChange={(
                                                                value
                                                            ) => {
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
                                            <FastField name="note">
                                                {({ field }) => (
                                                    <div className="space-y-1.5 col-span-2">
                                                        <Label>Note</Label>
                                                        <TextArea
                                                            placeholder="Note"
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
                                            <div className="col-span-2 text-right">
                                                <Button
                                                    type="submit"
                                                    isLoading={isSubmitting}
                                                >
                                                    {isSubmitting
                                                        ? "Saving..."
                                                        : "Save"}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SalesLeadPage;
