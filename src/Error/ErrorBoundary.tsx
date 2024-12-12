import React, { FC, PropsWithChildren, useState } from "react";
import {
    ErrorBoundary as ErrorBoundaryComponent,
    ErrorBoundaryProps as ErrorBoundaryComponentProps,
} from "react-error-boundary";
import UnexpectedError from "../pages/UnexpectedError";
import { useLogout } from "../features/authentication/useLogout";
import { useNavigate } from "react-router-dom";

const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
    const [someKey, setSomeKey] = useState(null);
    const navigate = useNavigate()

    const resetErrorBoundary: ErrorBoundaryComponentProps["onReset"] = () => {
        // logout()
        setSomeKey(null);
        navigate(-1)
    }

    const logErrorToService: ErrorBoundaryComponentProps["onError"] = (
        error,
        info,
    ) => {
        // Use your preferred error logging service
        console.error("Caught an error:", error, info);
    };

    return (
        <ErrorBoundaryComponent
            FallbackComponent={UnexpectedError}
            onError={logErrorToService}
            onReset={resetErrorBoundary} // reset the state of your app here
            resetKeys={[someKey]} //when changed, will trigger a reset of the error boundary.
        >
            {children}
        </ErrorBoundaryComponent>
    );
};

export default ErrorBoundary;