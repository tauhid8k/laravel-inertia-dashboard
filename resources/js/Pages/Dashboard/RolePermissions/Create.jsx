import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Button } from "@/Components/Button";
import { Input } from "@/Components/Form/Input";
import { Label } from "@/Components/Form/Label";

const CreateRolePermissionsPage = ({ permissions }) => {
    const { setData, processing, errors, post, data } = useForm({
        name: "",
        permissions: [],
    });

    const handleCheckedPermissions = (e) => {
        const name = e.target.value;

        if (e.target.checked) {
            setData("permissions", [...data.permissions, name]);
        } else {
            setData(
                "permissions",
                data.permissions.filter((item) => {
                    return item !== name;
                })
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("rolePermissions.store"), {
            onSuccess: () => toast.success("Role added"),
        });
    };

    return (
        <>
            <Head title="Add role and permissions" />

            <div className="rounded-lg bg-white p-6 border">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <fieldset
                        disabled={processing}
                        className="disabled:opacity-80"
                    >
                        <div className="space-y-1.5 mb-6">
                            <Label>Role Name</Label>
                            <Input
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                type="text"
                                id="name"
                                name="name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {Object.keys(permissions).map((key) => (
                                <div key={key}>
                                    <h2 className="text-xl capitalize mb-2">
                                        {key.split("_").join(" ")}
                                    </h2>
                                    <div className="space-y-2">
                                        {permissions[key].map((permission) => (
                                            <label
                                                key={permission.id}
                                                className="w-fit flex items-center gap-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="permissions[]"
                                                    value={permission.name}
                                                    className="size-[18px] focus:ring-0 focus:ring-offset-0 border-slate-200 rounded text-primary-600 focus:ring-primary-500"
                                                    onChange={
                                                        handleCheckedPermissions
                                                    }
                                                    checked={data.permissions.includes(
                                                        permission.name
                                                    )}
                                                />
                                                <span className="first-letter:uppercase text-slate-500">
                                                    {permission.name
                                                        .split("_")
                                                        .join(" ")}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-span-2 mt-6">
                            <Button type="submit">Save</Button>
                            {errors.permissions && (
                                <p className="text-red-500 text-sm mt-4">
                                    {errors.permissions}
                                </p>
                            )}
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default CreateRolePermissionsPage;
