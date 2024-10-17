import { Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/Form/Input";
import { Label } from "@/Components/Form/Label";
import { Button } from "@/Components/Button";

const LoginPage = () => {
    const { processing, post, errors, setData } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="rounded-xl p-5 bg-white shadow-sm">
            <div className="pb-5 mb-5 border-b border-slate-200 text-center space-y-1.5">
                <h1 className="text-2xl font-medium text-center">Login</h1>
                <p className="text-sm text-slate-400">
                    Enter your account details to login
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={processing} className="disabled:opacity-80">
                    <div className="flex flex-col gap-y-1 mb-3">
                        <Label className="mb-1.5">Email</Label>
                        <Input
                            onChange={(e) => setData("email", e.target.value)}
                            type="email"
                            name="email"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email}
                            </span>
                        )}

                        {/* If user has no role then show this error */}
                        {errors.role && (
                            <span className="text-red-500 text-sm">
                                {errors.role}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-y-1 mb-3">
                        <Label className="mb-1.5">Password</Label>
                        <Input
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            name="password"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <Label className="flex items-center gap-1.5">
                            <input
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                type="checkbox"
                                name="remember"
                                className="size-[18px] focus:ring-0 focus:ring-offset-0 border-slate-200 rounded text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-slate-700 whitespace-nowrap">
                                Remember me
                            </span>
                        </Label>
                        <Link
                            href="/forgot-password"
                            className="text-slate-700 hover:underline whitespace-nowrap"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </fieldset>
            </form>
        </div>
    );
};

export default LoginPage;
