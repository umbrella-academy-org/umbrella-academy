interface ButtonProps {
    children: React.ReactNode;
    isLoading?: boolean;
}

export function Button({ children, isLoading }: ButtonProps) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="w-fit bg-primary text-text  font-bold py-3 px-15 rounded-full  hover:bg-primary/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {children}
        </button>
    );
}
