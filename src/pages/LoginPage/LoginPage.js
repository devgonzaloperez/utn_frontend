import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterLoginFormContainerLayout } from "../../layouts/RegisterLoginFormLayout/RegisterLoginFormContainerLayout";
import { RegisterLoginPageLayout } from "../../layouts/RegisterLoginPageLayout/RegisterLoginPageLayout";

export const LoginPage = () => {
    return (
        <RegisterLoginPageLayout>
            <RegisterLoginFormContainerLayout>
                <LoginForm/>
            </RegisterLoginFormContainerLayout>
        </RegisterLoginPageLayout>
    )
};