const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen py-4 grid place-items-center bg-slate-100">
            <main className="w-full max-w-sm">{children}</main>
        </div>
    );
};

export default AuthLayout;
