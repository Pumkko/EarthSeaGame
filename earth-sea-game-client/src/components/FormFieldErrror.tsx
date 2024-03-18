import { ValidationError } from "@tanstack/solid-form";

interface FormFieldErrorProps {
    error: ValidationError;
}

export default function FormFieldError(props: FormFieldErrorProps) {
    return (
        <em class="text-red-400" role="alert">
            {props.error}
        </em>
    );
}
